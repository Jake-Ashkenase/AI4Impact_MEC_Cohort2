export declare function getClosestCell(element: Element): HTMLTableCellElement | null;
export declare function isElementDisabled(element: HTMLElement): boolean;
/**
 * Returns true if the target element or one of its parents is a dialog or is marked with data-awsui-table-suppress-navigation attribute.
 * This is used to suppress navigation for interactive content without a need to use a custom suppression check.
 */
export declare function defaultIsSuppressed(target: Element): boolean;
/**
 * Finds the closest row to the targetAriaRowIndex+delta in the direction of delta.
 */
export declare function findTableRowByAriaRowIndex(table: HTMLTableElement, targetAriaRowIndex: number, delta: number): HTMLTableRowElement | null;
/**
 * Finds the closest column to the targetAriaColIndex+delta in the direction of delta.
 */
export declare function findTableRowCellByAriaColIndex(tableRow: HTMLTableRowElement, targetAriaColIndex: number, delta: number): HTMLTableCellElement | null;
export declare function isTableCell(element: Element): boolean;
export declare function focusNextElement(element: null | HTMLElement): void;
//# sourceMappingURL=utils.d.ts.map