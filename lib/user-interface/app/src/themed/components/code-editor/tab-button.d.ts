import React from 'react';
import { IconProps } from '../icon/interfaces';
interface TabButtonProps {
    count: number;
    text: string;
    iconName: IconProps.Name;
    active: boolean;
    disabled: boolean;
    tabIndex?: number;
    ariaHidden?: boolean;
    ariaLabel?: string;
    paneId?: string;
    isRefresh: boolean;
    className: string;
    id?: string;
    onClick: () => void;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}
export declare const TabButton: React.ForwardRefExoticComponent<TabButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=tab-button.d.ts.map