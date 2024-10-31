// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useResizeObserver } from '@cloudscape-design/component-toolkit/internal';
import { BreadcrumbGroupImplementation } from '../../../breadcrumb-group/implementation';
import { createWidgetizedComponent } from '../../../internal/widgets';
import { BreadcrumbsSlotContext } from '../contexts';
import { ToolbarSlot } from '../skeleton/slot-wrappers';
import { DrawerTriggers } from './drawer-triggers';
import TriggerButton from './trigger-button';
import testutilStyles from '../../test-classes/styles.css.js';
import styles from './styles.css.js';
// support compatibility with changes before this commit: cf0f2b0755af1a28ac7c3c9476418a7ea807d0fd
function convertLegacyProps(toolbarProps, legacyProps) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    return {
        ariaLabels: (_a = toolbarProps.ariaLabels) !== null && _a !== void 0 ? _a : legacyProps.ariaLabels,
        activeDrawerId: (_b = toolbarProps.activeDrawerId) !== null && _b !== void 0 ? _b : (_c = legacyProps.activeDrawer) === null || _c === void 0 ? void 0 : _c.id,
        drawers: (_d = toolbarProps.drawers) !== null && _d !== void 0 ? _d : legacyProps.drawers,
        drawersFocusRef: (_e = toolbarProps.drawersFocusRef) !== null && _e !== void 0 ? _e : (_f = legacyProps.drawersFocusControl) === null || _f === void 0 ? void 0 : _f.refs.toggle,
        globalDrawersFocusControl: toolbarProps.globalDrawersFocusControl,
        onActiveDrawerChange: (_g = toolbarProps.onActiveDrawerChange) !== null && _g !== void 0 ? _g : legacyProps.onActiveDrawerChange,
        globalDrawers: (_h = toolbarProps.globalDrawers) !== null && _h !== void 0 ? _h : legacyProps.globalDrawers,
        activeGlobalDrawersIds: (_j = toolbarProps.activeGlobalDrawersIds) !== null && _j !== void 0 ? _j : legacyProps.activeGlobalDrawersIds,
        onActiveGlobalDrawersChange: (_k = toolbarProps.onActiveGlobalDrawersChange) !== null && _k !== void 0 ? _k : legacyProps.onActiveGlobalDrawersChange,
        hasNavigation: (_l = toolbarProps.hasNavigation) !== null && _l !== void 0 ? _l : !!legacyProps.navigation,
        navigationOpen: (_m = toolbarProps.navigationOpen) !== null && _m !== void 0 ? _m : legacyProps.navigationOpen,
        navigationFocusRef: (_o = toolbarProps.navigationFocusRef) !== null && _o !== void 0 ? _o : (_p = legacyProps.navigationFocusControl) === null || _p === void 0 ? void 0 : _p.refs.toggle,
        onNavigationToggle: (_q = toolbarProps.onNavigationToggle) !== null && _q !== void 0 ? _q : legacyProps.onNavigationToggle,
        hasSplitPanel: (_r = toolbarProps.hasSplitPanel) !== null && _r !== void 0 ? _r : true,
        splitPanelFocusRef: (_s = legacyProps.splitPanelFocusControl) === null || _s === void 0 ? void 0 : _s.refs.toggle,
        splitPanelToggleProps: (_t = toolbarProps.splitPanelToggleProps) !== null && _t !== void 0 ? _t : Object.assign(Object.assign({}, legacyProps.splitPanelToggleConfig), { active: legacyProps.splitPanelOpen, controlId: legacyProps.splitPanelControlId, position: legacyProps.splitPanelPosition }),
        onSplitPanelToggle: (_u = toolbarProps.onSplitPanelToggle) !== null && _u !== void 0 ? _u : legacyProps.onSplitPanelToggle,
    };
}
export function AppLayoutToolbarImplementation({ appLayoutInternals, 
// the value could be undefined if this component is loaded as a widget by a different app layout version
// not testable in a single-version setup
toolbarProps = {}, }) {
    var _a, _b, _c;
    const { breadcrumbs, discoveredBreadcrumbs, verticalOffsets, isMobile, toolbarState, setToolbarState, setToolbarHeight, globalDrawersFocusControl, } = appLayoutInternals;
    const { ariaLabels, activeDrawerId, drawers, drawersFocusRef, onActiveDrawerChange, globalDrawers, activeGlobalDrawersIds, onActiveGlobalDrawersChange, hasNavigation, navigationOpen, navigationFocusRef, onNavigationToggle, hasSplitPanel, splitPanelFocusRef, splitPanelToggleProps, onSplitPanelToggle, } = convertLegacyProps(toolbarProps, appLayoutInternals);
    // TODO: expose configuration property
    const pinnedToolbar = true;
    const ref = useRef(null);
    useResizeObserver(ref, entry => setToolbarHeight(entry.borderBoxHeight));
    useEffect(() => {
        return () => {
            setToolbarHeight(0);
        };
        // unmount effect only
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        let lastScrollY = window.scrollY;
        /* istanbul ignore next not testable in JSDOM */
        const updateScrollDirection = () => {
            if (pinnedToolbar) {
                setToolbarState('show');
                return;
            }
            const scrollY = window.scrollY;
            // 80 is an arbitrary number to have a pause before the toolbar scrolls out of view at the top of the page
            const direction = scrollY > lastScrollY && scrollY > 80 ? 'hide' : 'show';
            // 2 as a buffer to avoid mistaking minor accidental mouse moves as scroll
            if (direction !== toolbarState && (scrollY - lastScrollY > 2 || scrollY - lastScrollY < -2)) {
                setToolbarState(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };
        window.addEventListener('scroll', updateScrollDirection);
        return () => {
            window.removeEventListener('scroll', updateScrollDirection);
        };
    }, [pinnedToolbar, setToolbarState, toolbarState]);
    const anyPanelOpenInMobile = !!isMobile && (!!activeDrawerId || (!!navigationOpen && !!hasNavigation));
    useEffect(() => {
        if (anyPanelOpenInMobile) {
            document.body.classList.add(styles['block-body-scroll']);
        }
        else {
            document.body.classList.remove(styles['block-body-scroll']);
        }
        return () => {
            document.body.classList.remove(styles['block-body-scroll']);
        };
    }, [anyPanelOpenInMobile]);
    const toolbarHidden = toolbarState === 'hide' && !pinnedToolbar;
    return (React.createElement(ToolbarSlot, { ref: ref, className: clsx(styles['universal-toolbar'], testutilStyles.toolbar, {
            [testutilStyles['mobile-bar']]: isMobile,
            [styles['toolbar-hidden']]: toolbarHidden,
        }), style: {
            insetBlockStart: toolbarHidden ? '-60px' : verticalOffsets.toolbar,
        } },
        React.createElement("div", { className: styles['toolbar-container'] },
            hasNavigation && (React.createElement("nav", { className: clsx(styles['universal-toolbar-nav']) },
                React.createElement(TriggerButton, { ariaLabel: (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigationToggle) !== null && _a !== void 0 ? _a : undefined, ariaExpanded: false, iconName: "menu", className: testutilStyles['navigation-toggle'], onClick: () => onNavigationToggle === null || onNavigationToggle === void 0 ? void 0 : onNavigationToggle(!navigationOpen), ref: navigationFocusRef, selected: navigationOpen, disabled: anyPanelOpenInMobile }))),
            (breadcrumbs || discoveredBreadcrumbs) && (React.createElement("div", { className: clsx(styles['universal-toolbar-breadcrumbs'], testutilStyles.breadcrumbs) },
                React.createElement(BreadcrumbsSlotContext.Provider, { value: { isInToolbar: true } },
                    React.createElement("div", { className: styles['breadcrumbs-own'] }, breadcrumbs),
                    discoveredBreadcrumbs && (React.createElement("div", { className: styles['breadcrumbs-discovered'] },
                        React.createElement(BreadcrumbGroupImplementation, Object.assign({}, discoveredBreadcrumbs, { "data-awsui-discovered-breadcrumbs": true, __injectAnalyticsComponentMetadata: true }))))))),
            ((drawers && drawers.length > 0) || (hasSplitPanel && (splitPanelToggleProps === null || splitPanelToggleProps === void 0 ? void 0 : splitPanelToggleProps.displayed))) && (React.createElement("div", { className: clsx(styles['universal-toolbar-drawers']) },
                React.createElement(DrawerTriggers, { ariaLabels: ariaLabels, activeDrawerId: activeDrawerId !== null && activeDrawerId !== void 0 ? activeDrawerId : null, drawers: (_b = drawers === null || drawers === void 0 ? void 0 : drawers.filter(item => !!item.trigger)) !== null && _b !== void 0 ? _b : [], drawersFocusRef: drawersFocusRef, onActiveDrawerChange: onActiveDrawerChange, splitPanelToggleProps: (splitPanelToggleProps === null || splitPanelToggleProps === void 0 ? void 0 : splitPanelToggleProps.displayed) ? splitPanelToggleProps : undefined, splitPanelFocusRef: splitPanelFocusRef, onSplitPanelToggle: onSplitPanelToggle, disabled: anyPanelOpenInMobile, globalDrawersFocusControl: globalDrawersFocusControl, globalDrawers: (_c = globalDrawers === null || globalDrawers === void 0 ? void 0 : globalDrawers.filter(item => !!item.trigger)) !== null && _c !== void 0 ? _c : [], activeGlobalDrawersIds: activeGlobalDrawersIds !== null && activeGlobalDrawersIds !== void 0 ? activeGlobalDrawersIds : [], onActiveGlobalDrawersChange: onActiveGlobalDrawersChange }))))));
}
export const createWidgetizedAppLayoutToolbar = createWidgetizedComponent(AppLayoutToolbarImplementation);
//# sourceMappingURL=index.js.map