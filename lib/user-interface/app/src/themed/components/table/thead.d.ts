import React from 'react';
import { NonCancelableEventHandler } from '../internal/events';
import { TableProps } from './interfaces';
import { SelectionProps } from './selection';
import { StickyColumnsModel } from './sticky-columns';
import { TableRole } from './table-role';
export interface TheadProps {
    selectionType: TableProps.SelectionType | undefined;
    columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<any>>;
    sortingColumn: TableProps.SortingColumn<any> | undefined;
    sortingDescending: boolean | undefined;
    sortingDisabled: boolean | undefined;
    variant: TableProps.Variant;
    wrapLines: boolean | undefined;
    resizableColumns: boolean | undefined;
    getSelectAllProps?: () => SelectionProps;
    onFocusMove: ((sourceElement: HTMLElement, fromIndex: number, direction: -1 | 1) => void) | undefined;
    onResizeFinish: (newWidths: Map<PropertyKey, number>) => void;
    onSortingChange: NonCancelableEventHandler<TableProps.SortingState<any>> | undefined;
    sticky?: boolean;
    hidden?: boolean;
    stuck?: boolean;
    singleSelectionHeaderAriaLabel?: string;
    resizerRoleDescription?: string;
    stripedRows?: boolean;
    stickyState: StickyColumnsModel;
    selectionColumnId: PropertyKey;
    focusedComponent?: null | string;
    onFocusedComponentChange?: (focusId: null | string) => void;
    tableRole: TableRole;
    isExpandable?: boolean;
    setLastUserAction: (name: string) => void;
}
declare const Thead: React.ForwardRefExoticComponent<TheadProps & React.RefAttributes<HTMLTableRowElement>>;
export default Thead;
//# sourceMappingURL=thead.d.ts.map