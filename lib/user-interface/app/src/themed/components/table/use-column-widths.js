// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useResizeObserver, useStableCallback } from '@cloudscape-design/component-toolkit/internal';
import { getLogicalBoundingClientRect } from '@cloudscape-design/component-toolkit/internal';
import { setElementWidths } from './column-widths-utils';
export const DEFAULT_COLUMN_WIDTH = 120;
function readWidths(getCell, visibleColumns) {
    const result = new Map();
    for (let index = 0; index < visibleColumns.length; index++) {
        const column = visibleColumns[index];
        let width = column.width || 0;
        const minWidth = column.minWidth || width || DEFAULT_COLUMN_WIDTH;
        if (!width && // read width from the DOM if it is missing in the config
            index !== visibleColumns.length - 1 // skip reading for the last column, because it expands to fully fit the container
        ) {
            const colEl = getCell(column.id);
            width = colEl ? getLogicalBoundingClientRect(colEl).inlineSize : DEFAULT_COLUMN_WIDTH;
        }
        result.set(column.id, Math.max(width, minWidth));
    }
    return result;
}
function updateWidths(visibleColumns, oldWidths, newWidth, columnId) {
    const column = visibleColumns.find(column => column.id === columnId);
    let minWidth = DEFAULT_COLUMN_WIDTH;
    if (typeof (column === null || column === void 0 ? void 0 : column.width) === 'number' && column.width < DEFAULT_COLUMN_WIDTH) {
        minWidth = column === null || column === void 0 ? void 0 : column.width;
    }
    if (typeof (column === null || column === void 0 ? void 0 : column.minWidth) === 'number') {
        minWidth = column === null || column === void 0 ? void 0 : column.minWidth;
    }
    newWidth = Math.max(newWidth, minWidth);
    if (oldWidths.get(columnId) === newWidth) {
        return oldWidths;
    }
    const newWidths = new Map(oldWidths);
    newWidths.set(columnId, newWidth);
    return newWidths;
}
const WidthsContext = createContext({
    getColumnStyles: () => ({}),
    columnWidths: new Map(),
    updateColumn: () => { },
    setCell: () => { },
});
export function ColumnWidthsProvider({ visibleColumns, resizableColumns, containerRef, children }) {
    const visibleColumnsRef = useRef(null);
    const containerWidthRef = useRef(0);
    const [columnWidths, setColumnWidths] = useState(null);
    const cellsRef = useRef(new Map());
    const stickyCellsRef = useRef(new Map());
    const getCell = (columnId) => { var _a; return (_a = cellsRef.current.get(columnId)) !== null && _a !== void 0 ? _a : null; };
    const setCell = (sticky, columnId, node) => {
        const ref = sticky ? stickyCellsRef : cellsRef;
        if (node) {
            ref.current.set(columnId, node);
        }
        else {
            ref.current.delete(columnId);
        }
    };
    const getColumnStyles = (sticky, columnId) => {
        var _a, _b, _c;
        const column = visibleColumns.find(column => column.id === columnId);
        if (!column) {
            return {};
        }
        if (sticky) {
            return {
                width: ((_a = cellsRef.current.get(column.id)) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) ||
                    ((_b = columnWidths === null || columnWidths === void 0 ? void 0 : columnWidths.get(column.id)) !== null && _b !== void 0 ? _b : column.width),
            };
        }
        if (resizableColumns && columnWidths) {
            const isLastColumn = column.id === ((_c = visibleColumns[visibleColumns.length - 1]) === null || _c === void 0 ? void 0 : _c.id);
            const totalWidth = visibleColumns.reduce((sum, { id }) => sum + (columnWidths.get(id) || DEFAULT_COLUMN_WIDTH), 0);
            if (isLastColumn && containerWidthRef.current > totalWidth) {
                return { width: 'auto', minWidth: column === null || column === void 0 ? void 0 : column.minWidth };
            }
            else {
                return { width: columnWidths.get(column.id), minWidth: column === null || column === void 0 ? void 0 : column.minWidth };
            }
        }
        return {
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: !resizableColumns ? column.maxWidth : undefined,
        };
    };
    // Imperatively sets width style for a cell avoiding React state.
    // This allows setting the style as soon container's size change is observed.
    const updateColumnWidths = useStableCallback(() => {
        for (const { id } of visibleColumns) {
            const element = cellsRef.current.get(id);
            if (element) {
                setElementWidths(element, getColumnStyles(false, id));
            }
        }
        // Sticky column widths must be synchronized once all real column widths are assigned.
        for (const { id } of visibleColumns) {
            const element = stickyCellsRef.current.get(id);
            if (element) {
                setElementWidths(element, getColumnStyles(true, id));
            }
        }
    });
    // Observes container size and requests an update to the last cell width as it depends on the container's width.
    useResizeObserver(containerRef, ({ contentBoxWidth: containerWidth }) => {
        containerWidthRef.current = containerWidth;
        requestAnimationFrame(() => updateColumnWidths());
    });
    // The widths of the dynamically added columns (after the first render) if not set explicitly
    // will default to the DEFAULT_COLUMN_WIDTH.
    useEffect(() => {
        updateColumnWidths();
        if (!resizableColumns) {
            return;
        }
        let updated = false;
        const newColumnWidths = new Map(columnWidths);
        const lastVisible = visibleColumnsRef.current;
        if (lastVisible) {
            for (let index = 0; index < visibleColumns.length; index++) {
                const column = visibleColumns[index];
                if (!(columnWidths === null || columnWidths === void 0 ? void 0 : columnWidths.get(column.id)) && lastVisible.indexOf(column.id) === -1) {
                    updated = true;
                    newColumnWidths.set(column.id, column.width || DEFAULT_COLUMN_WIDTH);
                }
            }
            if (updated) {
                setColumnWidths(newColumnWidths);
            }
        }
        visibleColumnsRef.current = visibleColumns.map(column => column.id);
    }, [columnWidths, resizableColumns, visibleColumns, updateColumnWidths]);
    // Read the actual column widths after the first render to employ the browser defaults for
    // those columns without explicit width.
    useEffect(() => {
        if (!resizableColumns) {
            return;
        }
        setColumnWidths(() => readWidths(getCell, visibleColumns));
        // This code is intended to run only at the first render and should not re-run when table props change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function updateColumn(columnId, newWidth) {
        setColumnWidths(columnWidths => updateWidths(visibleColumns, columnWidths !== null && columnWidths !== void 0 ? columnWidths : new Map(), newWidth, columnId));
    }
    return (React.createElement(WidthsContext.Provider, { value: { getColumnStyles, columnWidths: columnWidths !== null && columnWidths !== void 0 ? columnWidths : new Map(), updateColumn, setCell } }, children));
}
export function useColumnWidths() {
    return useContext(WidthsContext);
}
//# sourceMappingURL=use-column-widths.js.map