import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';
import { ExpandableSectionProps, InternalVariant } from './interfaces';
export declare const componentName = "ExpandableSection";
interface ExpandableDefaultHeaderProps {
    id: string;
    descriptionId?: string;
    className?: string;
    children?: ReactNode;
    expanded: boolean;
    ariaControls: string;
    ariaLabel?: string;
    onKeyUp: KeyboardEventHandler;
    onKeyDown: KeyboardEventHandler;
    onClick: MouseEventHandler;
    icon: JSX.Element;
    variant: InternalVariant;
}
interface ExpandableSectionHeaderProps extends Omit<ExpandableDefaultHeaderProps, 'children' | 'icon'> {
    header?: ReactNode;
    headerText?: ReactNode;
    headerDescription?: ReactNode;
    headerCounter?: string;
    headerInfo?: ReactNode;
    headerActions?: ReactNode;
    headingTagOverride?: ExpandableSectionProps.HeadingTag;
    ariaLabelledBy?: string;
}
export declare const ExpandableSectionHeader: ({ id, descriptionId, className, variant, header, headerText, headerDescription, headerCounter, headerInfo, headerActions, headingTagOverride, expanded, ariaControls, ariaLabel, ariaLabelledBy, onKeyUp, onKeyDown, onClick, }: ExpandableSectionHeaderProps) => JSX.Element;
export {};
//# sourceMappingURL=expandable-section-header.d.ts.map