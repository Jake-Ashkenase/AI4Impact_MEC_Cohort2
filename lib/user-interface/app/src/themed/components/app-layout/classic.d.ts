import React from 'react';
import { AppLayoutProps } from './interfaces';
declare const ClassicAppLayout: React.ForwardRefExoticComponent<Omit<AppLayoutProps, "headerSelector" | "footerSelector"> & {
    contentType: AppLayoutProps.ContentType;
    navigationOpen: boolean;
    navigationWidth: number;
    toolsWidth: number;
    minContentWidth: number;
    onNavigationChange: import("../internal/events").NonCancelableEventHandler<AppLayoutProps.ChangeDetail>;
} & {
    placement: {
        insetBlockStart: number;
        insetBlockEnd: number;
        insetInlineStart: number;
        insetInlineEnd: number;
        inlineSize: number;
    };
} & React.RefAttributes<AppLayoutProps.Ref>>;
export default ClassicAppLayout;
//# sourceMappingURL=classic.d.ts.map