import React from 'react';
import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
import { ButtonProps } from './interfaces';
export type InternalButtonProps = Omit<ButtonProps, 'variant'> & {
    variant?: ButtonProps['variant'] | 'flashbar-icon' | 'breadcrumb-group' | 'menu-trigger' | 'modal-dismiss';
    badge?: boolean;
    analyticsAction?: string;
    __nativeAttributes?: (React.HTMLAttributes<HTMLAnchorElement> & React.HTMLAttributes<HTMLButtonElement>) | Record<`data-${string}`, string>;
    __iconClass?: string;
    __focusable?: boolean;
    __injectAnalyticsComponentMetadata?: boolean;
    __title?: string;
    __emitPerformanceMarks?: boolean;
} & InternalBaseComponentProps<HTMLAnchorElement | HTMLButtonElement>;
export declare const InternalButton: React.ForwardRefExoticComponent<Omit<ButtonProps, "variant"> & {
    variant?: ButtonProps['variant'] | 'flashbar-icon' | 'breadcrumb-group' | 'menu-trigger' | 'modal-dismiss';
    badge?: boolean | undefined;
    analyticsAction?: string | undefined;
    __nativeAttributes?: (React.HTMLAttributes<HTMLAnchorElement> & React.HTMLAttributes<HTMLButtonElement>) | Record<`data-${string}`, string> | undefined;
    __iconClass?: string | undefined;
    __focusable?: boolean | undefined;
    __injectAnalyticsComponentMetadata?: boolean | undefined;
    __title?: string | undefined;
    __emitPerformanceMarks?: boolean | undefined;
} & InternalBaseComponentProps<HTMLAnchorElement | HTMLButtonElement> & React.RefAttributes<ButtonProps.Ref>>;
export default InternalButton;
//# sourceMappingURL=internal.d.ts.map