// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import Icon from '../../../../icon/internal';
import Tooltip from '../../../../internal/components/tooltip';
import { registerTooltip } from '../../../../internal/components/tooltip/registry';
import testutilStyles from '../../../test-classes/styles.css.js';
import styles from './styles.css.js';
function TriggerButton({ ariaLabel, className, iconName, iconSvg, ariaExpanded, ariaControls, onClick, testId, disabled = false, badge, selected = false, hasTooltip = false, tooltipText, hasOpenDrawer = false, isMobile = false, isForPreviousActiveDrawer = false, isForSplitPanel = false, }, ref) {
    const containerRef = useRef(null);
    const tooltipValue = tooltipText ? tooltipText : ariaLabel ? ariaLabel : '';
    const [showTooltip, setShowTooltip] = useState(false);
    const [suppressTooltip, setSupressTooltip] = useState(false);
    const handleTriggerClick = (event) => {
        event.stopPropagation(); // Stop the event from propagating to the badge icon
        setShowTooltip(false);
        setSupressTooltip(true);
        onClick(event);
    };
    const handleBlur = (keepSupressed = false) => {
        setSupressTooltip(keepSupressed);
        setShowTooltip(false);
    };
    const handlePointerEnter = () => {
        setSupressTooltip(false);
        setShowTooltip(true);
    };
    /**
     * Takes the drawer being closed and the data-shift-focus value from a close button on that drawer that persists
     * on the event relatedTarget to determine not to show the tooltip
     * @param event
     */
    const handleOnFocus = useCallback((event) => {
        var _a;
        let shouldShowTooltip = false;
        const eventWithRelatedTarget = event;
        const relatedTarget = eventWithRelatedTarget === null || eventWithRelatedTarget === void 0 ? void 0 : eventWithRelatedTarget.relatedTarget;
        const isFromAnotherTrigger = ((_a = relatedTarget === null || relatedTarget === void 0 ? void 0 : relatedTarget.dataset) === null || _a === void 0 ? void 0 : _a.shiftFocus) === 'awsui-layout-drawer-trigger';
        if ((isForSplitPanel && !!relatedTarget) || // relatedTarget is null when split panel is closed
            (!isForSplitPanel &&
                (isFromAnotherTrigger || // for key navigation from another trigger button
                    !isForPreviousActiveDrawer)) // for when the drawer was not opened recently
        ) {
            shouldShowTooltip = true;
        }
        setSupressTooltip(!shouldShowTooltip);
        setShowTooltip(true);
    }, [
        // To assert reference equality check
        isForPreviousActiveDrawer,
        isForSplitPanel,
    ]);
    const tooltipVisible = useMemo(() => {
        return (hasTooltip &&
            showTooltip &&
            !suppressTooltip &&
            !!(containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) &&
            tooltipValue &&
            !(isMobile && hasOpenDrawer));
    }, [hasTooltip, showTooltip, containerRef, tooltipValue, isMobile, hasOpenDrawer, suppressTooltip]);
    useEffect(() => {
        if (hasTooltip && tooltipValue) {
            const close = () => {
                setShowTooltip(false);
                setSupressTooltip(false);
            };
            const shouldCloseTooltip = (event) => {
                var _a;
                if (event.target && containerRef && ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
                    return false;
                }
                return true;
            };
            const handlePointerDownEvent = (event) => {
                if (shouldCloseTooltip(event)) {
                    close();
                }
            };
            const handleKeyDownEvent = (event) => {
                if (event.key === 'Escape') {
                    close();
                }
            };
            const wrapperDiv = containerRef.current;
            if (wrapperDiv) {
                wrapperDiv.addEventListener('pointerdown', handlePointerDownEvent);
                wrapperDiv.addEventListener('keydown', handleKeyDownEvent);
                return () => {
                    wrapperDiv.removeEventListener('pointerdown', handlePointerDownEvent);
                    wrapperDiv.removeEventListener('keydown', handleKeyDownEvent);
                };
            }
        }
    }, [containerRef, hasTooltip, tooltipValue]);
    useEffect(() => {
        if (tooltipVisible) {
            return registerTooltip(() => {
                setShowTooltip(false);
                setSupressTooltip(false);
            });
        }
    }, [tooltipVisible]);
    return (React.createElement("div", Object.assign({ ref: containerRef }, (hasTooltip && {
        onPointerEnter: () => handlePointerEnter(),
        onPointerLeave: () => handleBlur(true),
        onFocus: e => handleOnFocus(e),
        onBlur: () => handleBlur(true),
    }), { className: styles['trigger-wrapper'] }),
        React.createElement("button", { "aria-expanded": ariaExpanded, "aria-controls": ariaControls, "aria-haspopup": true, "aria-label": ariaLabel, "aria-disabled": disabled, disabled: disabled, className: clsx(styles.trigger, styles['trigger-button-styles'], {
                [styles.selected]: selected,
                [styles.badge]: badge,
                [testutilStyles['drawers-trigger-with-badge']]: badge,
            }, className), onClick: handleTriggerClick, ref: ref, type: "button", "data-testid": testId, "data-shift-focus": "awsui-layout-drawer-trigger" },
            React.createElement("span", { className: clsx(badge && clsx(styles['trigger-badge-wrapper'], styles['trigger-button-styles'])) }, (iconName || iconSvg) && React.createElement(Icon, { name: iconName, svg: iconSvg }))),
        badge && React.createElement("div", { className: styles.dot }),
        tooltipVisible && (React.createElement(Tooltip, { trackRef: containerRef, value: tooltipValue, className: testutilStyles['trigger-tooltip'] }))));
}
export default React.forwardRef(TriggerButton);
//# sourceMappingURL=index.js.map