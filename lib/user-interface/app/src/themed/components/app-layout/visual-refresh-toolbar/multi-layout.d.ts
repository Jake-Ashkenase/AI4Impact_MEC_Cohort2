import React from 'react';
import { AppLayoutProps } from '../interfaces';
import { Focusable } from '../utils/use-focus-control';
import { SplitPanelToggleProps, ToolbarProps } from './toolbar';
interface SharedProps {
    forceDeduplicationType?: 'primary' | 'secondary' | 'suspended' | 'off';
    ariaLabels: AppLayoutProps.Labels | undefined;
    navigation: React.ReactNode;
    navigationOpen: boolean;
    onNavigationToggle: (open: boolean) => void;
    navigationFocusRef: React.Ref<Focusable> | undefined;
    breadcrumbs: React.ReactNode;
    activeDrawerId: string | null;
    drawers: ReadonlyArray<AppLayoutProps.Drawer> | undefined;
    onActiveDrawerChange: ((drawerId: string | null) => void) | undefined;
    drawersFocusRef: React.Ref<Focusable> | undefined;
    splitPanel: React.ReactNode;
    splitPanelToggleProps: SplitPanelToggleProps;
    splitPanelFocusRef: React.Ref<Focusable> | undefined;
    onSplitPanelToggle: () => void;
}
export declare function useMultiAppLayout(props: SharedProps, isEnabled: boolean): {
    registered: boolean;
    toolbarProps: ToolbarProps | null;
};
export {};
//# sourceMappingURL=multi-layout.d.ts.map