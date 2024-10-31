import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useImperativeHandle, useRef } from 'react';
import clsx from 'clsx';
import { useContainerQuery } from '@cloudscape-design/component-toolkit';
import { warnOnce } from '@cloudscape-design/component-toolkit/internal';
import { getAnalyticsMetadataAttribute, } from '@cloudscape-design/component-toolkit/internal/analytics-metadata';
import InternalContainer from '../container/internal';
import { useFunnelSubStep } from '../internal/analytics/hooks/use-funnel';
import { getAnalyticsMetadataProps, getBaseProps } from '../internal/base-component';
import { getVisualContextClassname } from '../internal/components/visual-context';
import { CollectionLabelContext } from '../internal/context/collection-label-context';
import { LinkDefaultVariantContext } from '../internal/context/link-default-variant-context';
import { TableComponentsContext } from '../internal/context/table-component-context';
import { fireNonCancelableEvent } from '../internal/events';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useMobile } from '../internal/hooks/use-mobile';
import useMouseDownTarget from '../internal/hooks/use-mouse-down-target';
import { usePerformanceMarks } from '../internal/hooks/use-performance-marks';
import { usePrevious } from '../internal/hooks/use-previous';
import { useScrollSync } from '../internal/hooks/use-scroll-sync';
import { useTableInteractionMetrics } from '../internal/hooks/use-table-interaction-metrics';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { isDevelopment } from '../internal/is-development';
import InternalLiveRegion from '../live-region/internal';
import { TableBodyCell } from './body-cell';
import { TableTdElement } from './body-cell/td-element';
import { checkColumnWidths } from './column-widths-utils';
import { useExpandableTableProps } from './expandable-rows/expandable-rows-utils';
import { NoDataCell } from './no-data-cell';
import { ItemsLoader } from './progressive-loading/items-loader';
import { useProgressiveLoadingProps } from './progressive-loading/progressive-loading-utils';
import { ResizeTracker } from './resizer';
import { focusMarkers, SelectionControl, useSelection, useSelectionFocusMove } from './selection';
import { useStickyColumns } from './sticky-columns';
import StickyHeader from './sticky-header';
import { StickyScrollbar } from './sticky-scrollbar';
import { getTableRoleProps, getTableRowRoleProps, getTableWrapperRoleProps, GridNavigationProvider, } from './table-role';
import Thead from './thead';
import ToolsHeader from './tools-header';
import { useCellEditing } from './use-cell-editing';
import { ColumnWidthsProvider, DEFAULT_COLUMN_WIDTH } from './use-column-widths';
import { useRowEvents } from './use-row-events';
import useTableFocusNavigation from './use-table-focus-navigation';
import { checkSortingState, getColumnKey, getItemKey, getVisibleColumnDefinitions, toContainerVariant } from './utils';
import buttonStyles from '../button/styles.css.js';
import headerStyles from '../header/styles.css.js';
import styles from './styles.css.js';
const GRID_NAVIGATION_PAGE_SIZE = 10;
const SELECTION_COLUMN_WIDTH = 54;
const selectionColumnId = Symbol('selection-column-id');
export const InternalTableAsSubstep = React.forwardRef((props, ref) => {
    const { funnelSubStepProps } = useFunnelSubStep();
    const tableProps = Object.assign(Object.assign({}, props), { __funnelSubStepProps: funnelSubStepProps });
    return React.createElement(InternalTable, Object.assign({}, tableProps, { ref: ref }));
});
const InternalTable = React.forwardRef((_a, ref) => {
    var _b, _c, _d;
    var { header, footer, empty, filter, pagination, preferences, items, columnDefinitions, trackBy, loading, loadingText, selectionType, selectedItems, isItemDisabled, ariaLabels, onSelectionChange, onSortingChange, sortingColumn, sortingDescending, sortingDisabled, visibleColumns, stickyHeader, stickyHeaderVerticalOffset, onRowClick, onRowContextMenu, wrapLines, stripedRows, contentDensity, submitEdit, onEditCancel, resizableColumns, onColumnWidthsChange, variant, __internalRootRef, totalItemsCount, firstIndex, renderAriaLive, stickyColumns, columnDisplay, enableKeyboardNavigation, expandableRows, getLoadingStatus, renderLoaderPending, renderLoaderLoading, renderLoaderError, __funnelSubStepProps } = _a, rest = __rest(_a, ["header", "footer", "empty", "filter", "pagination", "preferences", "items", "columnDefinitions", "trackBy", "loading", "loadingText", "selectionType", "selectedItems", "isItemDisabled", "ariaLabels", "onSelectionChange", "onSortingChange", "sortingColumn", "sortingDescending", "sortingDisabled", "visibleColumns", "stickyHeader", "stickyHeaderVerticalOffset", "onRowClick", "onRowContextMenu", "wrapLines", "stripedRows", "contentDensity", "submitEdit", "onEditCancel", "resizableColumns", "onColumnWidthsChange", "variant", "__internalRootRef", "totalItemsCount", "firstIndex", "renderAriaLive", "stickyColumns", "columnDisplay", "enableKeyboardNavigation", "expandableRows", "getLoadingStatus", "renderLoaderPending", "renderLoaderLoading", "renderLoaderError", "__funnelSubStepProps"]);
    // Keyboard navigation defaults to `true` for tables with expandable rows.
    if (expandableRows && enableKeyboardNavigation === undefined) {
        enableKeyboardNavigation = true;
    }
    const baseProps = getBaseProps(rest);
    const prevStickyHeader = usePrevious(stickyHeader);
    if (prevStickyHeader !== undefined && !!stickyHeader !== !!prevStickyHeader) {
        warnOnce('Table', `\`stickyHeader\` has changed from "${prevStickyHeader}" to "${stickyHeader}". It is not recommended to change the value of this property during the component lifecycle. Please set it to either "true" or "false" unconditionally.`);
    }
    const isMobile = useMobile();
    const { isExpandable, allItems, getExpandableItemProps } = useExpandableTableProps({
        items,
        expandableRows,
        trackBy,
        ariaLabels,
    });
    const { allRows } = useProgressiveLoadingProps({
        items: allItems,
        getLoadingStatus,
        getExpandableItemProps,
    });
    const [containerWidth, wrapperMeasureRef] = useContainerQuery(rect => rect.contentBoxWidth);
    const wrapperMeasureRefObject = useRef(null);
    const wrapperMeasureMergedRef = useMergeRefs(wrapperMeasureRef, wrapperMeasureRefObject);
    const [tableWidth, tableMeasureRef] = useContainerQuery(rect => rect.contentBoxWidth);
    const tableRefObject = useRef(null);
    const secondaryWrapperRef = React.useRef(null);
    const theadRef = useRef(null);
    const stickyHeaderRef = React.useRef(null);
    const scrollbarRef = React.useRef(null);
    const _e = useCellEditing({ onCancel: onEditCancel, onSubmit: submitEdit }), { cancelEdit } = _e, cellEditing = __rest(_e, ["cancelEdit"]);
    const paginationRef = useRef({});
    const filterRef = useRef({});
    /* istanbul ignore next: performance marks do not work in JSDOM */
    const getHeaderText = () => {
        var _a, _b, _c, _d;
        return (_c = (_b = (_a = toolsHeaderPerformanceMarkRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(`.${headerStyles['heading-text']}`)) === null || _b === void 0 ? void 0 : _b.innerText) !== null && _c !== void 0 ? _c : (_d = toolsHeaderPerformanceMarkRef.current) === null || _d === void 0 ? void 0 : _d.innerText;
    };
    const getPatternIdentifier = () => {
        var _a;
        const hasActions = !!((_a = toolsHeaderPerformanceMarkRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(`.${headerStyles.actions} .${buttonStyles.button}`));
        if (hasActions) {
            return 'table-with-actions';
        }
        return '';
    };
    const performanceMarkAttributes = usePerformanceMarks('table', true, tableRefObject, () => ({
        loading: loading !== null && loading !== void 0 ? loading : false,
        header: getHeaderText(),
    }), [loading]);
    const analyticsMetadata = getAnalyticsMetadataProps(rest);
    const interactionMetadata = () => {
        const filterData = filterRef.current;
        const paginationData = paginationRef.current;
        return JSON.stringify({
            filterData,
            paginationData,
            sortingColumn: sortingColumn === null || sortingColumn === void 0 ? void 0 : sortingColumn.sortingField,
            sortingOrder: sortingColumn ? (sortingDescending ? 'Descending' : 'Ascending') : undefined,
        });
    };
    const getComponentConfiguration = () => {
        var _a;
        const filterData = filterRef.current;
        const paginationData = paginationRef.current;
        return {
            variant,
            flowType: (_a = rest.analyticsMetadata) === null || _a === void 0 ? void 0 : _a.flowType,
            instanceIdentifier: analyticsMetadata === null || analyticsMetadata === void 0 ? void 0 : analyticsMetadata.instanceIdentifier,
            taskName: getHeaderText(),
            patternIdentifier: getPatternIdentifier(),
            sortedBy: {
                columnId: sortingColumn === null || sortingColumn === void 0 ? void 0 : sortingColumn.sortingField,
                sortingOrder: sortingColumn ? (sortingDescending ? 'desc' : 'asc') : undefined,
            },
            filtered: Boolean(filterData === null || filterData === void 0 ? void 0 : filterData.filterText),
            currentPageIndex: paginationData.currentPageIndex,
            totalNumberOfResources: paginationData.totalPageCount,
            resourcesPerPage: (allRows === null || allRows === void 0 ? void 0 : allRows.length) || 0,
            resourcesSelected: (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) > 0,
        };
    };
    const { setLastUserAction, tableInteractionAttributes } = useTableInteractionMetrics({
        elementRef: tableRefObject,
        loading,
        instanceIdentifier: analyticsMetadata === null || analyticsMetadata === void 0 ? void 0 : analyticsMetadata.instanceIdentifier,
        itemCount: items.length,
        getComponentIdentifier: getHeaderText,
        getComponentConfiguration,
        interactionMetadata,
    });
    useImperativeHandle(ref, () => {
        var _a;
        return ({
            scrollToTop: ((_a = stickyHeaderRef.current) === null || _a === void 0 ? void 0 : _a.scrollToTop) || (() => undefined),
            cancelEdit,
        });
    }, [cancelEdit]);
    const wrapperRefObject = useRef(null);
    const handleScroll = useScrollSync([wrapperRefObject, scrollbarRef, secondaryWrapperRef]);
    const { moveFocusDown, moveFocusUp, moveFocus } = useSelectionFocusMove(selectionType, allItems.length);
    const { onRowClickHandler, onRowContextMenuHandler } = useRowEvents({ onRowClick, onRowContextMenu });
    const visibleColumnDefinitions = getVisibleColumnDefinitions({
        columnDefinitions,
        columnDisplay,
        visibleColumns,
    });
    const { isItemSelected, getSelectAllProps, getItemSelectionProps } = useSelection({
        items: allItems,
        trackBy,
        selectedItems,
        selectionType,
        isItemDisabled,
        onSelectionChange,
        ariaLabels,
        loading,
    });
    const isRowSelected = (row) => row.type === 'data' && isItemSelected(row.item);
    if (isDevelopment) {
        if (resizableColumns) {
            checkColumnWidths(columnDefinitions);
        }
        if (sortingColumn === null || sortingColumn === void 0 ? void 0 : sortingColumn.sortingComparator) {
            checkSortingState(columnDefinitions, sortingColumn.sortingComparator);
        }
    }
    const isVisualRefresh = useVisualRefresh();
    const computedVariant = isVisualRefresh
        ? variant
        : ['embedded', 'full-page'].indexOf(variant) > -1
            ? 'container'
            : variant;
    const hasHeader = !!(header || filter || pagination || preferences);
    const hasSelection = !!selectionType;
    const hasFooterPagination = isMobile && variant === 'full-page' && !!pagination;
    const hasFooter = !!footer || hasFooterPagination;
    const headerIdRef = useRef(undefined);
    const isLabelledByHeader = !(ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.tableLabel) && !!header;
    const ariaLabelledby = isLabelledByHeader && headerIdRef.current ? headerIdRef.current : undefined;
    const setHeaderRef = useCallback((id) => {
        headerIdRef.current = id;
    }, []);
    const visibleColumnWidthsWithSelection = [];
    const visibleColumnIdsWithSelection = [];
    if (hasSelection) {
        visibleColumnWidthsWithSelection.push({ id: selectionColumnId, width: SELECTION_COLUMN_WIDTH });
        visibleColumnIdsWithSelection.push(selectionColumnId);
    }
    for (let columnIndex = 0; columnIndex < visibleColumnDefinitions.length; columnIndex++) {
        const columnId = getColumnKey(visibleColumnDefinitions[columnIndex], columnIndex);
        visibleColumnWidthsWithSelection.push(Object.assign(Object.assign({}, visibleColumnDefinitions[columnIndex]), { id: columnId }));
        visibleColumnIdsWithSelection.push(columnId);
    }
    const stickyState = useStickyColumns({
        visibleColumns: visibleColumnIdsWithSelection,
        stickyColumnsFirst: ((_b = stickyColumns === null || stickyColumns === void 0 ? void 0 : stickyColumns.first) !== null && _b !== void 0 ? _b : 0) + ((stickyColumns === null || stickyColumns === void 0 ? void 0 : stickyColumns.first) && hasSelection ? 1 : 0),
        stickyColumnsLast: (stickyColumns === null || stickyColumns === void 0 ? void 0 : stickyColumns.last) || 0,
    });
    const hasStickyColumns = !!(((_c = stickyColumns === null || stickyColumns === void 0 ? void 0 : stickyColumns.first) !== null && _c !== void 0 ? _c : 0) + ((_d = stickyColumns === null || stickyColumns === void 0 ? void 0 : stickyColumns.last) !== null && _d !== void 0 ? _d : 0) > 0);
    const hasEditableCells = !!columnDefinitions.find(col => col.editConfig);
    let tableRole = 'table';
    if (isExpandable) {
        tableRole = 'treegrid';
    }
    else if (enableKeyboardNavigation) {
        tableRole = 'grid';
    }
    else if (hasEditableCells) {
        tableRole = 'grid-default';
    }
    const theadProps = {
        selectionType,
        getSelectAllProps,
        columnDefinitions: visibleColumnDefinitions,
        variant: computedVariant,
        wrapLines,
        resizableColumns,
        sortingColumn,
        sortingDisabled,
        sortingDescending,
        onSortingChange,
        onFocusMove: moveFocus,
        onResizeFinish(newWidth) {
            const widthsDetail = columnDefinitions.map((column, index) => newWidth.get(getColumnKey(column, index)) || column.width || DEFAULT_COLUMN_WIDTH);
            const widthsChanged = widthsDetail.some((width, index) => columnDefinitions[index].width !== width);
            if (widthsChanged) {
                fireNonCancelableEvent(onColumnWidthsChange, { widths: widthsDetail });
            }
        },
        singleSelectionHeaderAriaLabel: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.selectionGroupLabel,
        resizerRoleDescription: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.resizerRoleDescription,
        stripedRows,
        stickyState,
        selectionColumnId,
        tableRole,
        isExpandable,
        setLastUserAction,
    };
    const wrapperRef = useMergeRefs(wrapperRefObject, stickyState.refs.wrapper);
    const tableRef = useMergeRefs(tableMeasureRef, tableRefObject, stickyState.refs.table);
    const wrapperProps = getTableWrapperRoleProps({
        tableRole,
        isScrollable: !!(tableWidth && containerWidth && tableWidth > containerWidth),
        ariaLabel: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.tableLabel,
        ariaLabelledby,
    });
    const getMouseDownTarget = useMouseDownTarget();
    useTableFocusNavigation({
        enableKeyboardNavigation,
        selectionType,
        tableRoot: tableRefObject,
        columnDefinitions: visibleColumnDefinitions,
        numRows: allRows === null || allRows === void 0 ? void 0 : allRows.length,
    });
    const toolsHeaderPerformanceMarkRef = useRef(null);
    // If is mobile, we take into consideration the AppLayout's mobile bar and we subtract the tools wrapper height so only the table header is sticky
    const [toolsHeaderHeight, toolsHeaderWrapperMeasureRef] = useContainerQuery(rect => rect.borderBoxHeight);
    const toolsHeaderWrapper = useMergeRefs(toolsHeaderPerformanceMarkRef, toolsHeaderWrapperMeasureRef);
    const colIndexOffset = selectionType ? 1 : 0;
    const totalColumnsCount = visibleColumnDefinitions.length + colIndexOffset;
    return (React.createElement(LinkDefaultVariantContext.Provider, { value: { defaultVariant: 'primary' } },
        React.createElement(TableComponentsContext.Provider, { value: { paginationRef, filterRef } },
            React.createElement(ColumnWidthsProvider, { visibleColumns: visibleColumnWidthsWithSelection, resizableColumns: resizableColumns, containerRef: wrapperMeasureRefObject },
                React.createElement(InternalContainer, Object.assign({}, baseProps, { __internalRootRef: __internalRootRef, className: clsx(baseProps.className, styles.root), __funnelSubStepProps: __funnelSubStepProps, __fullPage: variant === 'full-page', header: React.createElement(React.Fragment, null,
                        hasHeader && (React.createElement("div", null,
                            React.createElement("div", { ref: toolsHeaderWrapper, className: clsx(styles['header-controls'], styles[`variant-${computedVariant}`]) },
                                React.createElement(CollectionLabelContext.Provider, { value: { assignId: setHeaderRef } },
                                    React.createElement(ToolsHeader, { header: header, filter: filter, pagination: pagination, preferences: preferences, setLastUserAction: setLastUserAction }))))),
                        stickyHeader && (React.createElement(StickyHeader, { ref: stickyHeaderRef, variant: computedVariant, theadProps: theadProps, wrapperRef: wrapperRefObject, theadRef: theadRef, secondaryWrapperRef: secondaryWrapperRef, tableRef: tableRefObject, onScroll: handleScroll, tableHasHeader: hasHeader, contentDensity: contentDensity, tableRole: tableRole }))), disableHeaderPaddings: true, disableContentPaddings: true, variant: toContainerVariant(computedVariant), __disableFooterPaddings: true, __disableFooterDivider: true, __disableStickyMobile: false, footer: hasFooter ? (React.createElement("div", { className: clsx(styles['footer-wrapper'], styles[`variant-${computedVariant}`]) },
                        React.createElement("div", { className: clsx(styles.footer, hasFooterPagination && styles['footer-with-pagination']) },
                            footer && React.createElement("span", null, footer),
                            hasFooterPagination && React.createElement("div", { className: styles['footer-pagination'] }, pagination)))) : null, __stickyHeader: stickyHeader, __mobileStickyOffset: toolsHeaderHeight !== null && toolsHeaderHeight !== void 0 ? toolsHeaderHeight : 0, __stickyOffset: stickyHeaderVerticalOffset }, focusMarkers.root),
                    React.createElement("div", Object.assign({ ref: wrapperRef, className: clsx(styles.wrapper, styles[`variant-${computedVariant}`], {
                            [styles['has-footer']]: hasFooter,
                            [styles['has-header']]: hasHeader,
                        }), style: stickyState.style.wrapper, onScroll: handleScroll }, wrapperProps),
                        React.createElement("div", { className: styles['wrapper-content-measure'], ref: wrapperMeasureMergedRef }),
                        !!renderAriaLive && !!firstIndex && (React.createElement(InternalLiveRegion, { hidden: true, tagName: "span" },
                            React.createElement("span", null, renderAriaLive({
                                firstIndex,
                                lastIndex: firstIndex + items.length - 1,
                                visibleItemsCount: allItems.length,
                                totalItemsCount,
                            })))),
                        React.createElement(GridNavigationProvider, { keyboardNavigation: !!enableKeyboardNavigation, pageSize: GRID_NAVIGATION_PAGE_SIZE, getTable: () => tableRefObject.current },
                            React.createElement("table", Object.assign({}, performanceMarkAttributes, tableInteractionAttributes, { ref: tableRef, className: clsx(styles.table, resizableColumns && styles['table-layout-fixed'], contentDensity === 'compact' && getVisualContextClassname('compact-table')) }, getTableRoleProps({
                                tableRole,
                                totalItemsCount,
                                totalColumnsCount: totalColumnsCount,
                                ariaLabel: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.tableLabel,
                                ariaLabelledby,
                            })),
                                React.createElement(Thead, Object.assign({ ref: theadRef, hidden: stickyHeader, onFocusedComponentChange: focusId => { var _a; return (_a = stickyHeaderRef.current) === null || _a === void 0 ? void 0 : _a.setFocus(focusId); } }, theadProps)),
                                React.createElement("tbody", null, loading || allItems.length === 0 ? (React.createElement("tr", null,
                                    React.createElement(NoDataCell, { totalColumnsCount: totalColumnsCount, hasFooter: hasFooter, loading: loading, loadingText: loadingText, empty: empty, tableRef: tableRefObject, containerRef: wrapperMeasureRefObject }))) : (allRows.map((row, rowIndex) => {
                                    const isFirstRow = rowIndex === 0;
                                    const isLastRow = rowIndex === allRows.length - 1;
                                    const expandableProps = row.type === 'data' ? getExpandableItemProps(row.item) : undefined;
                                    const rowRoleProps = getTableRowRoleProps(Object.assign({ tableRole,
                                        firstIndex,
                                        rowIndex, level: row.type === 'loader' ? row.level : undefined }, expandableProps));
                                    const getTableItemKey = (item) => getItemKey(trackBy, item, rowIndex);
                                    const sharedCellProps = {
                                        isVisualRefresh,
                                        isFirstRow,
                                        isLastRow,
                                        isSelected: hasSelection && isRowSelected(row),
                                        isPrevSelected: hasSelection && !isFirstRow && isRowSelected(allRows[rowIndex - 1]),
                                        isNextSelected: hasSelection && !isLastRow && isRowSelected(allRows[rowIndex + 1]),
                                        isEvenRow: rowIndex % 2 === 0,
                                        stripedRows,
                                        hasSelection,
                                        hasFooter,
                                        stickyState,
                                        tableRole,
                                    };
                                    if (row.type === 'data') {
                                        return (React.createElement("tr", Object.assign({ key: getTableItemKey(row.item), className: clsx(styles.row, sharedCellProps.isSelected && styles['row-selected']), onFocus: ({ currentTarget }) => {
                                                var _a;
                                                // When an element inside table row receives focus we want to adjust the scroll.
                                                // However, that behaviour is unwanted when the focus is received as result of a click
                                                // as it causes the click to never reach the target element.
                                                if (!currentTarget.contains(getMouseDownTarget())) {
                                                    (_a = stickyHeaderRef.current) === null || _a === void 0 ? void 0 : _a.scrollToRow(currentTarget);
                                                }
                                            } }, focusMarkers.item, { onClick: onRowClickHandler && onRowClickHandler.bind(null, rowIndex, row.item), onContextMenu: onRowContextMenuHandler && onRowContextMenuHandler.bind(null, rowIndex, row.item) }, rowRoleProps),
                                            getItemSelectionProps && (React.createElement(TableTdElement, Object.assign({}, sharedCellProps, { className: styles['selection-control'], wrapLines: false, columnId: selectionColumnId, colIndex: 0 }),
                                                React.createElement(SelectionControl, Object.assign({ onFocusDown: moveFocusDown, onFocusUp: moveFocusUp }, getItemSelectionProps(row.item), { rowIndex: rowIndex, itemKey: `${getTableItemKey(row.item)}` })))),
                                            visibleColumnDefinitions.map((column, colIndex) => {
                                                var _a;
                                                const isEditing = cellEditing.checkEditing({ rowIndex, colIndex });
                                                const successfulEdit = cellEditing.checkLastSuccessfulEdit({ rowIndex, colIndex });
                                                const isEditable = !!column.editConfig && !cellEditing.isLoading;
                                                const cellExpandableProps = isExpandable && colIndex === 0 ? expandableProps : undefined;
                                                const analyticsMetadata = {
                                                    component: {
                                                        innerContext: {
                                                            position: `${rowIndex + 1},${colIndex + 1}`,
                                                            columnId: column.id ? `${column.id}` : '',
                                                            columnLabel: {
                                                                selector: `table thead tr th:nth-child(${colIndex + (selectionType ? 2 : 1)})`,
                                                                root: 'component',
                                                            },
                                                            item: `${getTableItemKey(row.item)}`,
                                                        },
                                                    },
                                                };
                                                return (React.createElement(TableBodyCell, Object.assign({ key: getColumnKey(column, colIndex) }, sharedCellProps, { style: resizableColumns
                                                        ? {}
                                                        : {
                                                            width: column.width,
                                                            minWidth: column.minWidth,
                                                            maxWidth: column.maxWidth,
                                                        }, ariaLabels: ariaLabels, column: column, item: row.item, wrapLines: wrapLines, isEditable: isEditable, isEditing: isEditing, isRowHeader: column.isRowHeader, successfulEdit: successfulEdit, resizableColumns: resizableColumns, onEditStart: () => cellEditing.startEdit({ rowIndex, colIndex }), onEditEnd: editCancelled => cellEditing.completeEdit({ rowIndex, colIndex }, editCancelled), submitEdit: cellEditing.submitEdit, columnId: (_a = column.id) !== null && _a !== void 0 ? _a : colIndex, colIndex: colIndex + colIndexOffset, verticalAlign: column.verticalAlign }, cellExpandableProps, getAnalyticsMetadataAttribute(analyticsMetadata))));
                                            })));
                                    }
                                    return (React.createElement("tr", Object.assign({ key: (row.item ? getTableItemKey(row.item) : 'root-' + rowIndex) + '-' + row.from, className: styles.row }, rowRoleProps),
                                        getItemSelectionProps && (React.createElement(TableTdElement, Object.assign({}, sharedCellProps, { className: styles['selection-control'], wrapLines: false, columnId: selectionColumnId, colIndex: 0 }), null)),
                                        visibleColumnDefinitions.map((column, colIndex) => {
                                            var _a;
                                            return (React.createElement(TableTdElement, Object.assign({ key: getColumnKey(column, colIndex) }, sharedCellProps, { wrapLines: false, columnId: (_a = column.id) !== null && _a !== void 0 ? _a : colIndex, colIndex: colIndex + colIndexOffset, isRowHeader: colIndex === 0, level: row.level }), colIndex === 0 ? (React.createElement(ItemsLoader, { item: row.item, loadingStatus: row.status, renderLoaderPending: renderLoaderPending, renderLoaderLoading: renderLoaderLoading, renderLoaderError: renderLoaderError, trackBy: trackBy })) : null));
                                        })));
                                }))))),
                        resizableColumns && React.createElement(ResizeTracker, null)),
                    React.createElement(StickyScrollbar, { ref: scrollbarRef, wrapperRef: wrapperRefObject, tableRef: tableRefObject, onScroll: handleScroll, hasStickyColumns: hasStickyColumns }))))));
});
export default InternalTable;
//# sourceMappingURL=internal.js.map