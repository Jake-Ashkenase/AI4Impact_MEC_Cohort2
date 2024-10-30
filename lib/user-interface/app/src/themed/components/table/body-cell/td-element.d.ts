import React from 'react';
import { TableProps } from '../interfaces.js';
import { StickyColumnsModel } from '../sticky-columns';
import { TableRole } from '../table-role';
export interface TableTdElementProps {
    className?: string;
    style?: React.CSSProperties;
    wrapLines: boolean | undefined;
    isRowHeader?: boolean;
    isFirstRow: boolean;
    isLastRow: boolean;
    isSelected: boolean;
    isNextSelected: boolean;
    isPrevSelected: boolean;
    nativeAttributes?: Omit<React.TdHTMLAttributes<HTMLTableCellElement> | React.ThHTMLAttributes<HTMLTableCellElement>, 'style' | 'className' | 'onClick'>;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    children?: React.ReactNode;
    isEvenRow?: boolean;
    stripedRows?: boolean;
    hasSelection?: boolean;
    hasFooter?: boolean;
    columnId: PropertyKey;
    colIndex: number;
    stickyState: StickyColumnsModel;
    isVisualRefresh?: boolean;
    tableRole: TableRole;
    level?: number;
    isExpandable?: boolean;
    isExpanded?: boolean;
    onExpandableItemToggle?: () => void;
    expandButtonLabel?: string;
    collapseButtonLabel?: string;
    verticalAlign?: TableProps.VerticalAlign;
}
export declare const TableTdElement: React.ForwardRefExoticComponent<TableTdElementProps & React.RefAttributes<HTMLTableCellElement>>;
//# sourceMappingURL=td-element.d.ts.map