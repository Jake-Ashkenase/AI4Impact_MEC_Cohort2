import { TableProps } from '../interfaces';
export type SortingStatus = 'sortable' | 'ascending' | 'descending';
export declare const getSortingStatus: (sortable: boolean, sorted: boolean, descending: boolean, disabled: boolean) => SortingStatus | undefined;
export declare const getSortingIconName: (sortingState: SortingStatus) => "caret-down-filled" | "caret-down" | "caret-up-filled";
export declare const isSorted: <T>(column: TableProps.ColumnDefinition<T>, sortingColumn: TableProps.SortingColumn<T>) => boolean;
export declare const getSortingColumnId: <T>(columnDefinitions?: readonly TableProps.ColumnDefinition<T>[], sortingColumn?: TableProps.SortingColumn<T> | undefined) => string | null;
//# sourceMappingURL=utils.d.ts.map