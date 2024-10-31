// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { findUpUntil } from '@cloudscape-design/component-toolkit/dom';
import { getAnalyticsMetadataAttribute } from '@cloudscape-design/component-toolkit/internal/analytics-metadata';
import ScreenreaderOnly from '../internal/components/screenreader-only';
import { fireNonCancelableEvent } from '../internal/events';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { TableHeaderCell } from './header-cell';
import { TableThElement } from './header-cell/th-element';
import { Divider } from './resizer';
import { focusMarkers, SelectionControl } from './selection';
import { getTableHeaderRowRoleProps } from './table-role';
import { useColumnWidths } from './use-column-widths';
import { getColumnKey } from './utils';
import headerCellStyles from './header-cell/styles.css.js';
import styles from './styles.css.js';
const Thead = React.forwardRef(({ selectionType, getSelectAllProps, columnDefinitions, sortingColumn, sortingDisabled, sortingDescending, resizableColumns, variant, wrapLines, onFocusMove, onSortingChange, onResizeFinish, singleSelectionHeaderAriaLabel, stripedRows, sticky = false, hidden = false, stuck = false, stickyState, selectionColumnId, focusedComponent, onFocusedComponentChange, tableRole, resizerRoleDescription, isExpandable, setLastUserAction, }, outerRef) => {
    const isVisualRefresh = useVisualRefresh();
    const headerCellClass = clsx(headerCellStyles['header-cell'], headerCellStyles[`header-cell-variant-${variant}`], sticky && headerCellStyles['header-cell-sticky'], stuck && headerCellStyles['header-cell-stuck'], stripedRows && headerCellStyles['has-striped-rows'], isVisualRefresh && headerCellStyles['is-visual-refresh']);
    const selectionCellClass = clsx(styles['selection-control'], styles['selection-control-header'], isVisualRefresh && styles['is-visual-refresh']);
    const { getColumnStyles, columnWidths, updateColumn, setCell } = useColumnWidths();
    return (React.createElement("thead", { className: clsx(!hidden && styles['thead-active']) },
        React.createElement("tr", Object.assign({}, focusMarkers.all, { ref: outerRef, "aria-rowindex": 1 }, getTableHeaderRowRoleProps({ tableRole }), { onFocus: event => {
                var _a;
                const focusControlElement = findUpUntil(event.target, element => !!element.getAttribute('data-focus-id'));
                const focusId = (_a = focusControlElement === null || focusControlElement === void 0 ? void 0 : focusControlElement.getAttribute('data-focus-id')) !== null && _a !== void 0 ? _a : null;
                onFocusedComponentChange === null || onFocusedComponentChange === void 0 ? void 0 : onFocusedComponentChange(focusId);
            }, onBlur: () => onFocusedComponentChange === null || onFocusedComponentChange === void 0 ? void 0 : onFocusedComponentChange(null) }),
            selectionType ? (React.createElement(TableThElement, Object.assign({ className: clsx(headerCellClass, selectionCellClass, hidden && headerCellStyles['header-cell-hidden']), hidden: hidden, tableRole: tableRole, colIndex: 0, focusedComponent: focusedComponent, columnId: selectionColumnId, stickyState: stickyState }, getAnalyticsMetadataAttribute({
                action: 'selectAll',
            })),
                getSelectAllProps ? (React.createElement(SelectionControl, Object.assign({ onFocusDown: event => {
                        onFocusMove(event.target, -1, +1);
                    }, focusedComponent: focusedComponent }, getSelectAllProps(), (sticky ? { tabIndex: -1 } : {})))) : (React.createElement(ScreenreaderOnly, null, singleSelectionHeaderAriaLabel)),
                React.createElement(Divider, { className: styles['resize-divider'] }))) : null,
            columnDefinitions.map((column, colIndex) => {
                const columnId = getColumnKey(column, colIndex);
                return (React.createElement(TableHeaderCell, { key: columnId, style: getColumnStyles(sticky, columnId), className: headerCellClass, tabIndex: sticky ? -1 : 0, focusedComponent: focusedComponent, column: column, activeSortingColumn: sortingColumn, sortingDescending: sortingDescending, sortingDisabled: sortingDisabled, wrapLines: wrapLines, hidden: hidden, colIndex: selectionType ? colIndex + 1 : colIndex, columnId: columnId, updateColumn: updateColumn, onResizeFinish: () => onResizeFinish(columnWidths), resizableColumns: resizableColumns, onClick: detail => {
                        setLastUserAction('sorting');
                        fireNonCancelableEvent(onSortingChange, detail);
                    }, isEditable: !!column.editConfig, stickyState: stickyState, cellRef: node => setCell(sticky, columnId, node), tableRole: tableRole, resizerRoleDescription: resizerRoleDescription, 
                    // Expandable option is only applicable to the first data column of the table.
                    // When present, the header content receives extra padding to match the first offset in the data cells.
                    isExpandable: colIndex === 0 && isExpandable, hasDynamicContent: hidden && !resizableColumns && column.hasDynamicContent }));
            }))));
});
export default Thead;
//# sourceMappingURL=thead.js.map