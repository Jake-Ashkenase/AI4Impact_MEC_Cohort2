// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { InternalButton } from '../../button/internal';
import { highContrastHeaderClassName } from '../../internal/utils/content-header-utils';
import { useAppLayoutInternals } from './context';
import { MobileTriggers as DrawersMobileTriggers } from './drawers';
import testutilStyles from '../test-classes/styles.css.js';
import styles from './styles.css.js';
export default function MobileToolbar() {
    var _a, _b, _c;
    const { ariaLabels, breadcrumbs, drawers, handleNavigationClick, handleToolsClick, hasDrawerViewportOverlay, isMobile, navigationOpen, __embeddedViewMode, isToolsOpen, navigationHide, navigationRefs, toolsHide, toolsRefs, headerVariant, } = useAppLayoutInternals();
    if (!isMobile ||
        __embeddedViewMode ||
        (navigationHide && !breadcrumbs && toolsHide && (!drawers || drawers.length === 0))) {
        return null;
    }
    return (React.createElement("section", { className: clsx(styles['mobile-toolbar'], [testutilStyles['mobile-bar']], {
            [styles['has-breadcrumbs']]: breadcrumbs,
            [styles.unfocusable]: hasDrawerViewportOverlay,
            [highContrastHeaderClassName]: headerVariant === 'high-contrast',
        }, testutilStyles['mobile-bar'], headerVariant !== 'high-contrast' && styles['remove-high-contrast-header']) },
        !navigationHide && (React.createElement("nav", { "aria-hidden": navigationOpen, "aria-orientation": "horizontal", className: clsx(styles['mobile-toolbar-nav'], { [testutilStyles['drawer-closed']]: !navigationOpen }) },
            React.createElement(InternalButton, { ariaLabel: (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigationToggle) !== null && _a !== void 0 ? _a : undefined, ariaExpanded: navigationOpen ? undefined : false, iconName: "menu", formAction: "none", onClick: () => handleNavigationClick(true), variant: "icon", className: testutilStyles['navigation-toggle'], ref: navigationRefs.toggle, disabled: hasDrawerViewportOverlay, __nativeAttributes: { 'aria-haspopup': navigationOpen ? undefined : true } }))),
        breadcrumbs && (React.createElement("div", { className: clsx(styles['mobile-toolbar-breadcrumbs'], testutilStyles.breadcrumbs) }, breadcrumbs)),
        drawers ? (React.createElement(DrawersMobileTriggers, null)) : (!toolsHide && (React.createElement("aside", { "aria-hidden": isToolsOpen, "aria-label": (_b = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.tools) !== null && _b !== void 0 ? _b : undefined, className: clsx(styles['mobile-toolbar-tools'], { [testutilStyles['drawer-closed']]: !isToolsOpen }) },
            React.createElement(InternalButton, { className: testutilStyles['tools-toggle'], ariaExpanded: isToolsOpen, disabled: hasDrawerViewportOverlay, ariaLabel: (_c = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.toolsToggle) !== null && _c !== void 0 ? _c : undefined, iconName: "status-info", formAction: "none", onClick: () => handleToolsClick(true), variant: "icon", ref: toolsRefs.toggle, __nativeAttributes: { 'aria-haspopup': true } }))))));
}
//# sourceMappingURL=mobile-toolbar.js.map