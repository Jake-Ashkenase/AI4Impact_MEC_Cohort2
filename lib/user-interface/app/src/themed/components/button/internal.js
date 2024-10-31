import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { getAnalyticsLabelAttribute, getAnalyticsMetadataAttribute, } from '@cloudscape-design/component-toolkit/internal/analytics-metadata';
import { FunnelMetrics } from '../internal/analytics';
import { useFunnel, useFunnelStep, useFunnelSubStep } from '../internal/analytics/hooks/use-funnel';
import { DATA_ATTR_FUNNEL_VALUE, getFunnelValueSelector, getSubStepAllSelector, getTextFromSelector, } from '../internal/analytics/selectors';
import Tooltip from '../internal/components/tooltip/index.js';
import { useButtonContext } from '../internal/context/button-context';
import { useSingleTabStopNavigation } from '../internal/context/single-tab-stop-navigation-context';
import { fireCancelableEvent, isPlainLeftClick } from '../internal/events';
import useForwardFocus from '../internal/hooks/forward-focus';
import useHiddenDescription from '../internal/hooks/use-hidden-description';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useModalContextLoadingButtonComponent } from '../internal/hooks/use-modal-component-analytics';
import { usePerformanceMarks } from '../internal/hooks/use-performance-marks';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { checkSafeUrl } from '../internal/utils/check-safe-url';
import InternalLiveRegion from '../live-region/internal';
import { LeftIcon, RightIcon } from './icon-helper';
import analyticsSelectors from './analytics-metadata/styles.css.js';
import styles from './styles.css.js';
import testUtilStyles from './test-classes/styles.css.js';
export const InternalButton = React.forwardRef((_a, ref) => {
    var { children, iconName, __iconClass, onClick, onFollow, iconAlign = 'left', iconUrl, iconSvg, iconAlt, variant = 'normal', loading = false, loadingText, disabled = false, disabledReason, wrapText = true, href, target, rel, download, formAction = 'submit', ariaLabel, ariaDescribedby, ariaExpanded, ariaControls, fullWidth, badge, __nativeAttributes, __internalRootRef = null, __focusable = false, __injectAnalyticsComponentMetadata = false, __title, __emitPerformanceMarks = true, analyticsAction = 'click' } = _a, props = __rest(_a, ["children", "iconName", "__iconClass", "onClick", "onFollow", "iconAlign", "iconUrl", "iconSvg", "iconAlt", "variant", "loading", "loadingText", "disabled", "disabledReason", "wrapText", "href", "target", "rel", "download", "formAction", "ariaLabel", "ariaDescribedby", "ariaExpanded", "ariaControls", "fullWidth", "badge", "__nativeAttributes", "__internalRootRef", "__focusable", "__injectAnalyticsComponentMetadata", "__title", "__emitPerformanceMarks", "analyticsAction"]);
    const [showTooltip, setShowTooltip] = useState(false);
    checkSafeUrl('Button', href);
    const isAnchor = Boolean(href);
    const isNotInteractive = loading || disabled;
    const isDisabledWithReason = (variant === 'normal' || variant === 'primary') && !!disabledReason && disabled;
    const hasAriaDisabled = (loading && !disabled) || (disabled && __focusable) || isDisabledWithReason;
    const shouldHaveContent = children && ['icon', 'inline-icon', 'flashbar-icon', 'modal-dismiss'].indexOf(variant) === -1;
    const buttonRef = useRef(null);
    useForwardFocus(ref, buttonRef);
    const buttonContext = useButtonContext();
    const uniqueId = useUniqueId('button');
    const { funnelInteractionId } = useFunnel();
    const { stepNumber, stepNameSelector } = useFunnelStep();
    const { subStepSelector, subStepNameSelector } = useFunnelSubStep();
    const performanceMarkAttributes = usePerformanceMarks('primaryButton', variant === 'primary' && __emitPerformanceMarks, buttonRef, () => {
        var _a;
        return ({
            loading,
            disabled,
            text: (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.innerText,
        });
    }, [loading, disabled]);
    useModalContextLoadingButtonComponent(variant === 'primary', loading);
    const { targetProps, descriptionEl } = useHiddenDescription(disabledReason);
    const handleClick = (event) => {
        if (isNotInteractive) {
            return event.preventDefault();
        }
        if (isAnchor && isPlainLeftClick(event)) {
            fireCancelableEvent(onFollow, { href, target }, event);
            if ((iconName === 'external' || target === '_blank') && funnelInteractionId) {
                const stepName = getTextFromSelector(stepNameSelector);
                const subStepName = getTextFromSelector(subStepNameSelector);
                FunnelMetrics.externalLinkInteracted({
                    funnelInteractionId,
                    stepNumber,
                    stepName,
                    stepNameSelector,
                    subStepSelector,
                    subStepName,
                    subStepNameSelector,
                    elementSelector: getFunnelValueSelector(uniqueId),
                    subStepAllSelector: getSubStepAllSelector(),
                });
            }
        }
        const { altKey, button, ctrlKey, metaKey, shiftKey } = event;
        fireCancelableEvent(onClick, { altKey, button, ctrlKey, metaKey, shiftKey }, event);
        buttonContext.onClick({ variant });
    };
    const buttonClass = clsx(props.className, styles.button, styles[`variant-${variant}`], {
        [styles.disabled]: isNotInteractive,
        [styles['button-no-wrap']]: !wrapText,
        [styles['button-no-text']]: !shouldHaveContent,
        [styles['full-width']]: shouldHaveContent && fullWidth,
        [styles.link]: isAnchor,
    });
    const explicitTabIndex = __nativeAttributes && 'tabIndex' in __nativeAttributes ? __nativeAttributes.tabIndex : undefined;
    const { tabIndex } = useSingleTabStopNavigation(buttonRef, {
        tabIndex: isAnchor && isNotInteractive ? -1 : explicitTabIndex,
    });
    const analyticsMetadata = disabled
        ? {}
        : {
            action: analyticsAction,
            detail: { label: { root: 'self' } },
        };
    if (__injectAnalyticsComponentMetadata) {
        analyticsMetadata.component = {
            name: 'awsui.Button',
            label: { root: 'self' },
            properties: { variant, disabled: `${disabled}` },
        };
    }
    const buttonProps = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, props), __nativeAttributes), performanceMarkAttributes), { tabIndex, 
        // https://github.com/microsoft/TypeScript/issues/36659
        ref: useMergeRefs(buttonRef, __internalRootRef), 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedby, 'aria-expanded': ariaExpanded, 'aria-controls': ariaControls, 
        // add ariaLabel as `title` as visible hint text
        title: __title !== null && __title !== void 0 ? __title : ariaLabel, className: buttonClass, onClick: handleClick, [DATA_ATTR_FUNNEL_VALUE]: uniqueId }), getAnalyticsMetadataAttribute(analyticsMetadata)), getAnalyticsLabelAttribute(children ? `.${analyticsSelectors.label}` : ''));
    const iconProps = {
        loading,
        iconName,
        iconAlign,
        iconUrl,
        iconSvg,
        iconAlt,
        variant,
        badge,
        iconClass: __iconClass,
        iconSize: variant === 'modal-dismiss' ? 'medium' : 'normal',
    };
    const buttonContent = (React.createElement(React.Fragment, null,
        React.createElement(LeftIcon, Object.assign({}, iconProps)),
        shouldHaveContent && React.createElement("span", { className: clsx(styles.content, analyticsSelectors.label) }, children),
        React.createElement(RightIcon, Object.assign({}, iconProps))));
    const { loadingButtonCount } = useFunnel();
    useEffect(() => {
        if (loading) {
            loadingButtonCount.current++;
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                loadingButtonCount.current--;
            };
        }
    }, [loading, loadingButtonCount]);
    if (isAnchor) {
        return (
        // https://github.com/yannickcr/eslint-plugin-react/issues/2962
        // eslint-disable-next-line react/jsx-no-target-blank
        React.createElement(React.Fragment, null,
            React.createElement("a", Object.assign({}, buttonProps, { href: href, target: target, 
                // security recommendation: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target
                rel: rel !== null && rel !== void 0 ? rel : (target === '_blank' ? 'noopener noreferrer' : undefined), "aria-disabled": isNotInteractive ? true : undefined, download: download }), buttonContent),
            loading && loadingText && (React.createElement(InternalLiveRegion, { tagName: "span", hidden: true }, loadingText))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("button", Object.assign({}, buttonProps, { type: formAction === 'none' ? 'button' : 'submit', disabled: disabled && !__focusable && !isDisabledWithReason, "aria-disabled": hasAriaDisabled ? true : undefined, onFocus: isDisabledWithReason ? () => setShowTooltip(true) : undefined, onBlur: isDisabledWithReason ? () => setShowTooltip(false) : undefined, onMouseEnter: isDisabledWithReason ? () => setShowTooltip(true) : undefined, onMouseLeave: isDisabledWithReason ? () => setShowTooltip(false) : undefined }, (isDisabledWithReason ? targetProps : {})),
            buttonContent,
            isDisabledWithReason && (React.createElement(React.Fragment, null,
                descriptionEl,
                showTooltip && (React.createElement(Tooltip, { className: testUtilStyles['disabled-reason-tooltip'], trackRef: buttonRef, value: disabledReason }))))),
        loading && loadingText && (React.createElement(InternalLiveRegion, { tagName: "span", hidden: true }, loadingText))));
});
export default InternalButton;
//# sourceMappingURL=internal.js.map