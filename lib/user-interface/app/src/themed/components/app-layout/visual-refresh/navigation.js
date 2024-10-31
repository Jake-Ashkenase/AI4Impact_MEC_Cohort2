// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { findUpUntil } from '@cloudscape-design/component-toolkit/dom';
import { InternalButton } from '../../button/internal';
import { Transition } from '../../internal/components/transition';
import customCssProps from '../../internal/generated/custom-css-properties';
import { useAppLayoutInternals } from './context';
import TriggerButton from './trigger-button';
import testutilStyles from '../test-classes/styles.css.js';
import styles from './styles.css.js';
/**
 * The Navigation component consists of the following elements:
 * the container, or root element, that sits as a direct child to the Layout grid definition;
 * the show navigation form that contains the trigger for the drawer in large viewports;
 * the navigation, or drawer, that contains the hide navigation form and the children
 * passed through the API;
 */
export default function Navigation() {
    const { ariaLabels, disableBodyScroll, handleNavigationClick, hasDrawerViewportOverlay, isMobile, navigationOpen, isToolsOpen, navigation, navigationHide, navigationRefs, navigationWidth, toolsHide, headerVariant, } = useAppLayoutInternals();
    if (navigationHide) {
        return null;
    }
    // Close the Navigation drawer on mobile when a user clicks a link inside.
    const onNavigationClick = (event) => {
        const hasLink = findUpUntil(event.target, node => node.tagName === 'A' && !!node.href);
        if (hasLink && isMobile) {
            handleNavigationClick(false);
        }
    };
    const isUnfocusable = hasDrawerViewportOverlay && (!navigationOpen || (isToolsOpen && !toolsHide));
    return (React.createElement(Transition, { in: navigationOpen }, (state, transitionEventsRef) => {
        var _a, _b, _c;
        return (React.createElement("div", { className: clsx(styles['navigation-container'], {
                [styles['disable-body-scroll']]: disableBodyScroll,
                [styles.unfocusable]: isUnfocusable,
            }), style: { [customCssProps.navigationWidth]: `${navigationWidth}px` } },
            !isMobile && (React.createElement("nav", { "aria-hidden": isMobile || navigationOpen, "aria-label": (_a = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigation) !== null && _a !== void 0 ? _a : undefined, className: clsx(styles['show-navigation'], {
                    [styles.animating]: state === 'exiting',
                    [styles['is-navigation-open']]: navigationOpen,
                }), ref: state === 'exiting' ? transitionEventsRef : undefined },
                React.createElement(TriggerButton, { ariaLabel: ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigationToggle, ariaExpanded: navigationOpen ? undefined : false, iconName: "menu", className: testutilStyles['navigation-toggle'], onClick: () => handleNavigationClick(true), ref: navigationRefs.toggle, highContrastHeader: headerVariant === 'high-contrast' }))),
            React.createElement("nav", { "aria-label": (_b = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigation) !== null && _b !== void 0 ? _b : undefined, className: clsx(styles.navigation, testutilStyles.navigation, {
                    [testutilStyles['drawer-closed']]: !navigationOpen,
                    [styles.animating]: state === 'entering',
                    [styles['is-navigation-open']]: navigationOpen,
                }), ref: state !== 'exiting' ? transitionEventsRef : undefined, "aria-hidden": !navigationOpen, onClick: event => {
                    onNavigationClick && onNavigationClick(event);
                } },
                React.createElement("div", { className: styles['animated-content'] },
                    React.createElement("div", { className: styles['hide-navigation'] },
                        React.createElement(InternalButton, { ariaLabel: (_c = ariaLabels === null || ariaLabels === void 0 ? void 0 : ariaLabels.navigationClose) !== null && _c !== void 0 ? _c : undefined, iconName: isMobile ? 'close' : 'angle-left', onClick: () => handleNavigationClick(false), variant: "icon", formAction: "none", className: testutilStyles['navigation-close'], ref: navigationRefs.close })),
                    navigation))));
    }));
}
//# sourceMappingURL=navigation.js.map