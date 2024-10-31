import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import clsx from 'clsx';
import { useContainerQuery } from '@cloudscape-design/component-toolkit';
import { findUpUntil } from '@cloudscape-design/component-toolkit/dom';
import { useStableCallback } from '@cloudscape-design/component-toolkit/internal';
import { fireNonCancelableEvent } from '../internal/events';
import { useControllable } from '../internal/hooks/use-controllable';
import { useMobile } from '../internal/hooks/use-mobile';
import { CONSTRAINED_MAIN_PANEL_MIN_HEIGHT, CONSTRAINED_PAGE_HEIGHT, getSplitPanelDefaultSize, MAIN_PANEL_MIN_HEIGHT, } from '../split-panel/utils/size-utils';
import ContentWrapper from './content-wrapper';
import { Drawer, DrawerTriggersBar } from './drawer';
import { ResizableDrawer } from './drawer/resizable-drawer';
import { MobileToolbar } from './mobile-toolbar';
import { Notifications } from './notifications';
import { SideSplitPanelDrawer, SplitPanelProvider } from './split-panel';
import { checkSplitPanelForcedPosition } from './split-panel/split-panel-utils';
import { togglesConfig } from './toggles';
import { getStickyOffsetVars } from './utils/sticky-offsets';
import { TOOLS_DRAWER_ID, useDrawers } from './utils/use-drawers';
import { useFocusControl } from './utils/use-focus-control';
import { useSplitPanelFocusControl } from './utils/use-split-panel-focus-control';
import styles from './styles.css.js';
import testutilStyles from './test-classes/styles.css.js';
const ClassicAppLayout = React.forwardRef((_a, ref) => {
    var _b, _c, _d, _e, _f, _g;
    var { navigation, navigationWidth, navigationHide, navigationOpen, tools, toolsWidth, toolsHide, toolsOpen: controlledToolsOpen, breadcrumbs, notifications, stickyNotifications, contentHeader, disableContentHeaderOverlap, content, contentType, disableContentPaddings, disableBodyScroll, maxContentWidth, minContentWidth, placement, ariaLabels, splitPanel, splitPanelSize: controlledSplitPanelSize, splitPanelOpen: controlledSplitPanelOpen, splitPanelPreferences: controlledSplitPanelPreferences, onSplitPanelPreferencesChange, onSplitPanelResize, onSplitPanelToggle, onNavigationChange, onToolsChange, drawers: controlledDrawers, onDrawerChange, activeDrawerId: controlledActiveDrawerId } = _a, rest = __rest(_a, ["navigation", "navigationWidth", "navigationHide", "navigationOpen", "tools", "toolsWidth", "toolsHide", "toolsOpen", "breadcrumbs", "notifications", "stickyNotifications", "contentHeader", "disableContentHeaderOverlap", "content", "contentType", "disableContentPaddings", "disableBodyScroll", "maxContentWidth", "minContentWidth", "placement", "ariaLabels", "splitPanel", "splitPanelSize", "splitPanelOpen", "splitPanelPreferences", "onSplitPanelPreferencesChange", "onSplitPanelResize", "onSplitPanelToggle", "onNavigationChange", "onToolsChange", "drawers", "onDrawerChange", "activeDrawerId"]);
    // Private API for embedded view mode
    const __embeddedViewMode = Boolean(rest.__embeddedViewMode);
    const rootRef = useRef(null);
    const isMobile = useMobile();
    const [toolsOpen = false, setToolsOpen] = useControllable(controlledToolsOpen, onToolsChange, false, {
        componentName: 'AppLayout',
        controlledProp: 'toolsOpen',
        changeHandler: 'onToolsChange',
    });
    const onToolsToggle = (open) => {
        setToolsOpen(open);
        if (hasDrawers) {
            focusDrawersButtons();
        }
        else {
            focusToolsButtons();
        }
        fireNonCancelableEvent(onToolsChange, { open });
    };
    const { drawers, activeDrawer, minDrawerSize, activeDrawerSize, activeDrawerId, ariaLabelsWithDrawers, onActiveDrawerChange, onActiveDrawerResize, } = useDrawers(Object.assign({ drawers: controlledDrawers, onDrawerChange, activeDrawerId: controlledActiveDrawerId }, rest), ariaLabels, {
        disableDrawersMerge: true,
        ariaLabels,
        tools,
        toolsOpen,
        toolsHide,
        toolsWidth,
        onToolsToggle,
    });
    ariaLabels = ariaLabelsWithDrawers;
    const hasDrawers = !!drawers;
    const { refs: navigationRefs, setFocus: focusNavButtons } = useFocusControl(navigationOpen);
    const { refs: toolsRefs, setFocus: focusToolsButtons, loseFocus: loseToolsFocus, } = useFocusControl(toolsOpen || activeDrawer !== undefined, true);
    const { refs: drawerRefs, setFocus: focusDrawersButtons, loseFocus: loseDrawersFocus, } = useFocusControl(!!activeDrawerId, true, activeDrawerId);
    const onNavigationToggle = useStableCallback((open) => {
        focusNavButtons();
        fireNonCancelableEvent(onNavigationChange, { open });
    });
    const onNavigationClick = (event) => {
        const hasLink = findUpUntil(event.target, node => node.tagName === 'A' && !!node.href);
        if (hasLink) {
            onNavigationToggle(false);
        }
    };
    useEffect(() => {
        // Close navigation drawer on mobile so that the main content is visible
        if (isMobile) {
            onNavigationToggle(false);
        }
    }, [isMobile, onNavigationToggle]);
    const navigationVisible = !navigationHide && navigationOpen;
    const toolsVisible = !toolsHide && toolsOpen;
    const [headerFooterHeight, setHeaderFooterHeight] = useState(0);
    // Delay applying changes in header/footer height, as applying them immediately can cause
    // ResizeOberver warnings due to the algorithm thinking that the change might have side-effects
    // further up the tree, therefore blocking notifications to prevent loops
    useEffect(() => {
        const id = requestAnimationFrame(() => setHeaderFooterHeight(placement.insetBlockStart + placement.insetBlockEnd));
        return () => cancelAnimationFrame(id);
    }, [placement.insetBlockStart, placement.insetBlockEnd]);
    const contentHeightStyle = {
        [disableBodyScroll ? 'blockSize' : 'minBlockSize']: `calc(100vh - ${headerFooterHeight}px)`,
    };
    const [notificationsHeight, notificationsRef] = useContainerQuery(rect => rect.contentBoxHeight);
    const anyPanelOpen = navigationVisible || toolsVisible || !!activeDrawer;
    const hasRenderedNotifications = notificationsHeight ? notificationsHeight > 0 : false;
    const stickyNotificationsHeight = stickyNotifications ? notificationsHeight !== null && notificationsHeight !== void 0 ? notificationsHeight : 0 : 0;
    const [splitPanelPreferences, setSplitPanelPreferences] = useControllable(controlledSplitPanelPreferences, onSplitPanelPreferencesChange, undefined, {
        componentName: 'AppLayout',
        controlledProp: 'splitPanelPreferences',
        changeHandler: 'onSplitPanelPreferencesChange',
    });
    const [splitPanelOpen = false, setSplitPanelOpen] = useControllable(controlledSplitPanelOpen, onSplitPanelToggle, false, {
        componentName: 'AppLayout',
        controlledProp: 'splitPanelOpen',
        changeHandler: 'onSplitPanelToggle',
    });
    const splitPanelPosition = (splitPanelPreferences === null || splitPanelPreferences === void 0 ? void 0 : splitPanelPreferences.position) || 'bottom';
    const [splitPanelReportedToggle, setSplitPanelReportedToggle] = useState({
        displayed: false,
        ariaLabel: undefined,
    });
    const splitPanelDisplayed = !!(splitPanel && (splitPanelReportedToggle.displayed || splitPanelOpen));
    const closedDrawerWidth = 40;
    const effectiveNavigationWidth = navigationHide ? 0 : navigationOpen ? navigationWidth : closedDrawerWidth;
    const defaultSplitPanelSize = getSplitPanelDefaultSize(splitPanelPosition);
    const [splitPanelSize = defaultSplitPanelSize, setSplitPanelSize] = useControllable(controlledSplitPanelSize, onSplitPanelResize, defaultSplitPanelSize, {
        componentName: 'AppLayout',
        controlledProp: 'splitPanelSize',
        changeHandler: 'onSplitPanelResize',
    });
    const mainContentRef = useRef(null);
    const legacyScrollRootRef = useRef(null);
    const { refs: splitPanelRefs, setLastInteraction: setSplitPanelLastInteraction } = useSplitPanelFocusControl([
        splitPanelPreferences,
        splitPanelOpen,
    ]);
    const onSplitPanelPreferencesSet = useCallback((detail) => {
        setSplitPanelPreferences(detail);
        setSplitPanelLastInteraction({ type: 'position' });
        fireNonCancelableEvent(onSplitPanelPreferencesChange, detail);
    }, [setSplitPanelPreferences, onSplitPanelPreferencesChange, setSplitPanelLastInteraction]);
    const onSplitPanelSizeSet = useCallback((newSize) => {
        setSplitPanelSize(newSize);
        fireNonCancelableEvent(onSplitPanelResize, { size: newSize });
    }, [setSplitPanelSize, onSplitPanelResize]);
    const onSplitPanelToggleHandler = useCallback(() => {
        setSplitPanelOpen(!splitPanelOpen);
        setSplitPanelLastInteraction({ type: splitPanelOpen ? 'close' : 'open' });
        fireNonCancelableEvent(onSplitPanelToggle, { open: !splitPanelOpen });
    }, [setSplitPanelOpen, splitPanelOpen, onSplitPanelToggle, setSplitPanelLastInteraction]);
    const getSplitPanelMaxHeight = useStableCallback(() => {
        if (typeof document === 'undefined') {
            return 0; // render the split panel in its minimum possible size
        }
        else if (disableBodyScroll && legacyScrollRootRef.current) {
            const availableHeight = legacyScrollRootRef.current.clientHeight;
            return availableHeight < CONSTRAINED_PAGE_HEIGHT ? availableHeight : availableHeight - MAIN_PANEL_MIN_HEIGHT;
        }
        else {
            const availableHeight = document.documentElement.clientHeight - placement.insetBlockStart - placement.insetBlockEnd;
            return availableHeight < CONSTRAINED_PAGE_HEIGHT
                ? availableHeight - CONSTRAINED_MAIN_PANEL_MIN_HEIGHT
                : availableHeight - MAIN_PANEL_MIN_HEIGHT;
        }
    });
    const rightDrawerBarWidth = drawers ? (drawers.length > 1 ? closedDrawerWidth : 0) : 0;
    const contentPadding = 80;
    // all content except split-panel + drawers/tools area
    const resizableSpaceAvailable = Math.max(0, placement.inlineSize - effectiveNavigationWidth - minContentWidth - contentPadding - rightDrawerBarWidth);
    const getEffectiveToolsWidth = () => {
        if (activeDrawerSize && activeDrawer) {
            return Math.min(resizableSpaceAvailable, activeDrawerSize);
        }
        if (toolsHide || drawers) {
            return 0;
        }
        if (toolsOpen) {
            return toolsWidth;
        }
        return closedDrawerWidth;
    };
    const effectiveToolsWidth = getEffectiveToolsWidth();
    const splitPanelMaxWidth = resizableSpaceAvailable - effectiveToolsWidth;
    const isSplitPanelForcedPosition = checkSplitPanelForcedPosition({ isMobile, splitPanelMaxWidth });
    const finalSplitPanePosition = isSplitPanelForcedPosition ? 'bottom' : splitPanelPosition;
    const splitPaneAvailableOnTheSide = splitPanelDisplayed && finalSplitPanePosition === 'side';
    const sideSplitPanelSize = splitPaneAvailableOnTheSide ? (splitPanelOpen ? splitPanelSize : closedDrawerWidth) : 0;
    const sideSplitPanelMaxWidth = Math.max(0, resizableSpaceAvailable - effectiveToolsWidth);
    const drawerMaxSize = Math.max(0, resizableSpaceAvailable - sideSplitPanelSize);
    const navigationClosedWidth = navigationHide || isMobile ? 0 : closedDrawerWidth;
    const contentMaxWidthStyle = !isMobile ? { maxWidth: maxContentWidth } : undefined;
    const [splitPanelReportedSize, setSplitPanelReportedSize] = useState(0);
    const [splitPanelReportedHeaderHeight, setSplitPanelReportedHeaderHeight] = useState(0);
    const splitPanelContextProps = {
        topOffset: placement.insetBlockStart + (finalSplitPanePosition === 'bottom' ? stickyNotificationsHeight : 0),
        bottomOffset: placement.insetBlockEnd,
        leftOffset: placement.insetInlineStart +
            (isMobile ? 0 : !navigationHide && navigationOpen ? navigationWidth : navigationClosedWidth),
        rightOffset: isMobile ? 0 : placement.insetInlineEnd + effectiveToolsWidth + rightDrawerBarWidth,
        position: finalSplitPanePosition,
        size: splitPanelSize,
        maxWidth: sideSplitPanelMaxWidth,
        getMaxHeight: getSplitPanelMaxHeight,
        disableContentPaddings,
        contentWidthStyles: contentMaxWidthStyle,
        isOpen: splitPanelOpen,
        isForcedPosition: isSplitPanelForcedPosition,
        onResize: onSplitPanelSizeSet,
        onToggle: onSplitPanelToggleHandler,
        onPreferencesChange: onSplitPanelPreferencesSet,
        setSplitPanelToggle: setSplitPanelReportedToggle,
        reportSize: setSplitPanelReportedSize,
        reportHeaderHeight: setSplitPanelReportedHeaderHeight,
        refs: splitPanelRefs,
    };
    const splitPanelWrapped = splitPanel && (React.createElement(SplitPanelProvider, Object.assign({}, splitPanelContextProps), finalSplitPanePosition === 'side' ? (React.createElement(SideSplitPanelDrawer, { displayed: splitPanelDisplayed }, splitPanel)) : (splitPanel)));
    const contentWrapperProps = {
        contentType,
        navigationPadding: navigationHide || !!navigationOpen,
        contentWidthStyles: !isMobile ? { minWidth: minContentWidth, maxWidth: maxContentWidth } : undefined,
        toolsPadding: 
        // tools padding is displayed in one of the three cases
        // 1. Nothing on the that screen edge (no tools panel and no split panel)
        toolsHide ||
            (hasDrawers && !activeDrawer && (!splitPanelDisplayed || finalSplitPanePosition !== 'side')) ||
            // 2. Tools panel is present and open
            toolsVisible ||
            // 3. Split panel is open in side position
            (splitPaneAvailableOnTheSide && splitPanelOpen),
        isMobile,
    };
    useImperativeHandle(ref, () => ({
        openTools: () => onToolsToggle(true),
        closeNavigationIfNecessary: () => {
            if (isMobile) {
                onNavigationToggle(false);
            }
        },
        focusToolsClose: () => {
            if (hasDrawers) {
                focusDrawersButtons(true);
            }
            else {
                focusToolsButtons(true);
            }
        },
        focusActiveDrawer: () => focusDrawersButtons(true),
        focusSplitPanel: () => { var _a; return (_a = splitPanelRefs.slider.current) === null || _a === void 0 ? void 0 : _a.focus(); },
    }));
    const splitPanelBottomOffset = (_b = (!splitPanelDisplayed || finalSplitPanePosition !== 'bottom'
        ? undefined
        : splitPanelOpen
            ? splitPanelReportedSize
            : splitPanelReportedHeaderHeight)) !== null && _b !== void 0 ? _b : undefined;
    const [mobileBarHeight, mobileBarRef] = useContainerQuery(rect => rect.contentBoxHeight);
    return (React.createElement("div", { className: clsx(styles.root, testutilStyles.root, disableBodyScroll && styles['root-no-scroll']), ref: rootRef, style: contentHeightStyle },
        isMobile && !__embeddedViewMode && (!toolsHide || !navigationHide || breadcrumbs) && (React.createElement(MobileToolbar, { anyPanelOpen: anyPanelOpen, toggleRefs: { navigation: navigationRefs.toggle, tools: toolsRefs.toggle }, topOffset: placement.insetBlockStart, ariaLabels: ariaLabels, navigationHide: navigationHide, toolsHide: toolsHide, onNavigationOpen: () => onNavigationToggle(true), onToolsOpen: () => onToolsToggle(true), unfocusable: anyPanelOpen, mobileBarRef: mobileBarRef, drawers: drawers, activeDrawerId: activeDrawerId, onDrawerChange: newDrawerId => {
                onActiveDrawerChange(newDrawerId);
                if (newDrawerId !== activeDrawerId) {
                    focusToolsButtons();
                    focusDrawersButtons();
                }
            } }, breadcrumbs)),
        React.createElement("div", { className: clsx(styles.layout, disableBodyScroll && styles['layout-no-scroll']) },
            !navigationHide && (React.createElement(Drawer, { contentClassName: testutilStyles.navigation, toggleClassName: testutilStyles['navigation-toggle'], closeClassName: testutilStyles['navigation-close'], ariaLabels: togglesConfig.navigation.getLabels(ariaLabels), bottomOffset: placement.insetBlockEnd, topOffset: placement.insetBlockStart, isMobile: isMobile, isOpen: navigationOpen, onClick: isMobile ? onNavigationClick : undefined, onToggle: onNavigationToggle, toggleRefs: navigationRefs, type: "navigation", width: navigationWidth }, navigation)),
            React.createElement("main", { ref: legacyScrollRootRef, className: clsx(styles['layout-main'], {
                    [styles['layout-main-scrollable']]: disableBodyScroll,
                    [testutilStyles['disable-body-scroll-root']]: disableBodyScroll,
                    [styles.unfocusable]: isMobile && anyPanelOpen,
                }) },
                React.createElement("div", { style: {
                        marginBottom: splitPanelBottomOffset,
                    } },
                    notifications && (React.createElement(Notifications, { disableContentPaddings: disableContentPaddings, testUtilsClassName: testutilStyles.notifications, labels: ariaLabels, topOffset: disableBodyScroll ? 0 : placement.insetBlockStart, sticky: !isMobile && stickyNotifications, ref: notificationsRef }, notifications)),
                    ((!isMobile && breadcrumbs) || contentHeader) && (React.createElement(ContentWrapper, Object.assign({}, contentWrapperProps),
                        !isMobile && breadcrumbs && (React.createElement("div", { className: clsx(testutilStyles.breadcrumbs, styles['breadcrumbs-desktop']) }, breadcrumbs)),
                        contentHeader && (React.createElement("div", { className: clsx(styles['content-header-wrapper'], !hasRenderedNotifications && (isMobile || !breadcrumbs) && styles['content-extra-top-padding'], !hasRenderedNotifications && !breadcrumbs && styles['content-header-wrapper-first-child'], !disableContentHeaderOverlap && styles['content-header-wrapper-overlapped']) }, contentHeader)))),
                    React.createElement(ContentWrapper, Object.assign({}, contentWrapperProps, { ref: mainContentRef, disablePaddings: disableContentPaddings, className: clsx(!disableContentPaddings && styles['content-wrapper'], !disableContentPaddings &&
                            (isMobile || !breadcrumbs) &&
                            !contentHeader &&
                            styles['content-extra-top-padding'], testutilStyles.content, !disableContentHeaderOverlap && contentHeader && styles['content-overlapped'], !hasRenderedNotifications &&
                            !breadcrumbs &&
                            !isMobile &&
                            !contentHeader &&
                            styles['content-wrapper-first-child']), style: getStickyOffsetVars(placement.insetBlockStart, placement.insetBlockEnd + (splitPanelBottomOffset || 0), `${stickyNotificationsHeight}px`, mobileBarHeight && !disableBodyScroll ? `${mobileBarHeight}px` : '0px', !!disableBodyScroll, isMobile) }), content)),
                finalSplitPanePosition === 'bottom' && splitPanelWrapped),
            finalSplitPanePosition === 'side' && splitPanelWrapped,
            hasDrawers ? (React.createElement(ResizableDrawer, { contentClassName: clsx(activeDrawerId && testutilStyles['active-drawer'], activeDrawerId === TOOLS_DRAWER_ID && testutilStyles.tools), toggleClassName: testutilStyles['tools-toggle'], closeClassName: clsx(testutilStyles['active-drawer-close-button'], activeDrawerId === TOOLS_DRAWER_ID && testutilStyles['tools-close']), ariaLabels: {
                    openLabel: (_c = activeDrawer === null || activeDrawer === void 0 ? void 0 : activeDrawer.ariaLabels) === null || _c === void 0 ? void 0 : _c.triggerButton,
                    closeLabel: (_d = activeDrawer === null || activeDrawer === void 0 ? void 0 : activeDrawer.ariaLabels) === null || _d === void 0 ? void 0 : _d.closeButton,
                    mainLabel: (_e = activeDrawer === null || activeDrawer === void 0 ? void 0 : activeDrawer.ariaLabels) === null || _e === void 0 ? void 0 : _e.drawerName,
                    resizeHandle: (_f = activeDrawer === null || activeDrawer === void 0 ? void 0 : activeDrawer.ariaLabels) === null || _f === void 0 ? void 0 : _f.resizeHandle,
                }, minWidth: minDrawerSize, maxWidth: drawerMaxSize, width: activeDrawerSize, bottomOffset: placement.insetBlockEnd, topOffset: placement.insetBlockStart, isMobile: isMobile, onToggle: isOpen => {
                    if (!isOpen) {
                        focusToolsButtons();
                        focusDrawersButtons();
                        onActiveDrawerChange(null);
                    }
                }, isOpen: true, hideOpenButton: true, toggleRefs: drawerRefs, type: "tools", onLoseFocus: loseDrawersFocus, activeDrawer: activeDrawer, onResize: changeDetail => onActiveDrawerResize(changeDetail), refs: drawerRefs, toolsContent: (_g = drawers === null || drawers === void 0 ? void 0 : drawers.find(drawer => drawer.id === TOOLS_DRAWER_ID)) === null || _g === void 0 ? void 0 : _g.content }, activeDrawer === null || activeDrawer === void 0 ? void 0 : activeDrawer.content)) : (!toolsHide && (React.createElement(Drawer, { contentClassName: testutilStyles.tools, toggleClassName: testutilStyles['tools-toggle'], closeClassName: testutilStyles['tools-close'], ariaLabels: togglesConfig.tools.getLabels(ariaLabels), width: toolsWidth, bottomOffset: placement.insetBlockEnd, topOffset: placement.insetBlockStart, isMobile: isMobile, onToggle: onToolsToggle, isOpen: toolsOpen, toggleRefs: toolsRefs, type: "tools", onLoseFocus: loseToolsFocus }, tools))),
            hasDrawers && drawers.length > 0 && (React.createElement(DrawerTriggersBar, { drawerRefs: drawerRefs, bottomOffset: placement.insetBlockEnd, topOffset: placement.insetBlockStart, isMobile: isMobile, drawers: drawers, activeDrawerId: activeDrawerId, onDrawerChange: newDrawerId => {
                    if (activeDrawerId !== newDrawerId) {
                        focusToolsButtons();
                        focusDrawersButtons();
                    }
                    onActiveDrawerChange(newDrawerId);
                }, ariaLabels: ariaLabels })))));
});
export default ClassicAppLayout;
//# sourceMappingURL=classic.js.map