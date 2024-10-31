// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { splitItems } from '../drawer/drawers-helpers';
import OverflowMenu from '../drawer/overflow-menu';
import { ToggleButton, togglesConfig } from '../toggles';
import { TOOLS_DRAWER_ID } from '../utils/use-drawers';
import sharedStyles from '../styles.css.js';
import testutilStyles from '../test-classes/styles.css.js';
import styles from './styles.css.js';
const MobileToggle = React.forwardRef(({ className, ariaLabels, type, disabled, onClick }, ref) => {
    const { TagName, iconName, getLabels } = togglesConfig[type];
    const { mainLabel, openLabel } = getLabels(ariaLabels);
    return (React.createElement(TagName, { className: clsx(styles['mobile-toggle'], styles[`mobile-toggle-type-${type}`]), "aria-hidden": disabled, "aria-label": mainLabel, onClick: e => e.target === e.currentTarget && onClick() },
        React.createElement(ToggleButton, { ref: ref, className: className, iconName: iconName, onClick: onClick, ariaLabel: openLabel, disabled: disabled, ariaExpanded: disabled })));
});
export function MobileToolbar({ ariaLabels, toggleRefs, topOffset, navigationHide, toolsHide, anyPanelOpen, unfocusable, drawers, activeDrawerId, children, onNavigationOpen, onToolsOpen, onDrawerChange, mobileBarRef, }) {
    useEffect(() => {
        if (anyPanelOpen) {
            document.body.classList.add(styles['block-body-scroll']);
            return () => {
                document.body.classList.remove(styles['block-body-scroll']);
            };
        }
        else {
            document.body.classList.remove(styles['block-body-scroll']);
        }
    }, [anyPanelOpen]);
    const { overflowItems, visibleItems } = splitItems(drawers, 2, activeDrawerId);
    const overflowMenuHasBadge = !!overflowItems.find(item => item.badge);
    return (React.createElement("div", { ref: mobileBarRef, className: clsx(styles['mobile-bar'], testutilStyles['mobile-bar'], unfocusable && sharedStyles.unfocusable), style: { top: topOffset } },
        !navigationHide && (React.createElement(MobileToggle, { ref: toggleRefs.navigation, type: "navigation", className: testutilStyles['navigation-toggle'], ariaLabels: ariaLabels, disabled: anyPanelOpen, onClick: onNavigationOpen })),
        React.createElement("div", { className: styles['mobile-bar-breadcrumbs'] }, children && React.createElement("div", { className: testutilStyles.breadcrumbs }, children)),
        !toolsHide && !drawers && (React.createElement(MobileToggle, { ref: toggleRefs.tools, type: "tools", className: testutilStyles['tools-toggle'], ariaLabels: ariaLabels, disabled: anyPanelOpen, onClick: onToolsOpen })),
        drawers && (React.createElement("aside", { "aria-label": ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.drawers, role: "region" },
            React.createElement("div", { className: styles['drawers-container'], role: "toolbar", "aria-orientation": "horizontal" },
                visibleItems.map((item, index) => {
                    var _a;
                    return (React.createElement("div", { className: clsx(styles['mobile-toggle'], styles['mobile-toggle-type-drawer']), key: index, onClick: () => onDrawerChange(item.id) },
                        React.createElement(ToggleButton, { className: clsx(testutilStyles['drawers-trigger'], item.id === TOOLS_DRAWER_ID && testutilStyles['tools-toggle']), iconName: item.trigger.iconName, iconSvg: item.trigger.iconSvg, badge: item.badge, ariaLabel: (_a = item.ariaLabels) === null || _a === void 0 ? void 0 : _a.triggerButton, ariaExpanded: activeDrawerId === item.id, testId: `awsui-app-layout-trigger-${item.id}` })));
                }),
                overflowItems.length > 0 && (React.createElement("div", { className: clsx(styles['mobile-toggle'], styles['mobile-toggle-type-drawer']) },
                    React.createElement(OverflowMenu, { ariaLabel: overflowMenuHasBadge ? ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.drawersOverflowWithBadge : ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.drawersOverflow, items: overflowItems, onItemClick: ({ detail }) => onDrawerChange(detail.id) }))))))));
}
//# sourceMappingURL=index.js.map