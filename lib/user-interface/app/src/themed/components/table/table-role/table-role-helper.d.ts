/// <reference types="react" />
import { TableRole } from './interfaces';
type SortingStatus = 'sortable' | 'ascending' | 'descending';
export declare function getTableRoleProps(options: {
    tableRole: TableRole;
    ariaLabel?: string;
    ariaLabelledby?: string;
    totalItemsCount?: number;
    totalColumnsCount?: number;
}): React.TableHTMLAttributes<HTMLTableElement>;
export declare function getTableWrapperRoleProps(options: {
    tableRole: TableRole;
    isScrollable: boolean;
    ariaLabel?: string;
    ariaLabelledby?: string;
}): import("react").HTMLAttributes<HTMLDivElement>;
export declare function getTableHeaderRowRoleProps(options: {
    tableRole: TableRole;
}): import("react").HTMLAttributes<HTMLTableRowElement>;
export declare function getTableRowRoleProps(options: {
    tableRole: TableRole;
    rowIndex: number;
    firstIndex?: number;
    level?: number;
    setSize?: number;
    posInSet?: number;
}): import("react").HTMLAttributes<HTMLTableRowElement>;
export declare function getTableColHeaderRoleProps(options: {
    tableRole: TableRole;
    colIndex: number;
    sortingStatus?: SortingStatus;
}): import("react").ThHTMLAttributes<HTMLTableCellElement>;
export declare function getTableCellRoleProps(options: {
    tableRole: TableRole;
    colIndex: number;
    isRowHeader?: boolean;
}): import("react").TdHTMLAttributes<HTMLTableCellElement>;
export {};
//# sourceMappingURL=table-role-helper.d.ts.map