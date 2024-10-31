// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';
import { nodeContains } from '@cloudscape-design/component-toolkit/dom';
import { useResizeObserver } from '@cloudscape-design/component-toolkit/internal';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import usePopoverPosition from './use-popover-position.js';
import styles from './styles.css.js';
export default function PopoverContainer({ position, trackRef, trackKey, arrow, children, zIndex, renderWithPortal, size, fixedWidth, variant, keepPosition, allowScrollToFit, allowVerticalOverflow, hideOnOverscroll, }) {
    const bodyRef = useRef(null);
    const contentRef = useRef(null);
    const popoverRef = useRef(null);
    const arrowRef = useRef(null);
    const isRefresh = useVisualRefresh();
    // Updates the position handler.
    const { updatePositionHandler, popoverStyle, internalPosition, positionHandlerRef, isOverscrolling } = usePopoverPosition({
        popoverRef,
        bodyRef,
        arrowRef,
        trackRef,
        contentRef,
        allowScrollToFit,
        allowVerticalOverflow,
        preferredPosition: position,
        renderWithPortal,
        keepPosition,
        hideOnOverscroll,
    });
    // Recalculate position when properties change.
    useLayoutEffect(() => {
        updatePositionHandler();
    }, [updatePositionHandler, trackKey]);
    // Recalculate position when content size changes.
    useResizeObserver(contentRef, () => {
        updatePositionHandler(true);
    });
    // Recalculate position on DOM events.
    useLayoutEffect(() => {
        /*
        This is a heuristic. Some layout changes are caused by user clicks (e.g. toggling the tools panel, submitting a form),
        and by tracking the click event we can adapt the popover's position to the new layout.
    
        TODO: extend this to Enter and Spacebar?
        */
        const onClick = (event) => {
            if (
            // Do not update position if keepPosition is true.
            keepPosition ||
                // If the click was on the trigger, this will make the popover appear or disappear,
                // so no need to update its position either in this case.
                nodeContains(trackRef.current, event.target)) {
                return;
            }
            requestAnimationFrame(() => {
                updatePositionHandler();
            });
        };
        const updatePositionOnResize = () => requestAnimationFrame(() => updatePositionHandler());
        const refreshPosition = () => requestAnimationFrame(() => positionHandlerRef.current());
        window.addEventListener('click', onClick);
        window.addEventListener('resize', updatePositionOnResize);
        window.addEventListener('scroll', refreshPosition, true);
        return () => {
            window.removeEventListener('click', onClick);
            window.removeEventListener('resize', updatePositionOnResize);
            window.removeEventListener('scroll', refreshPosition, true);
        };
    }, [hideOnOverscroll, keepPosition, positionHandlerRef, trackRef, updatePositionHandler]);
    return isOverscrolling ? null : (React.createElement("div", { ref: popoverRef, style: Object.assign(Object.assign({}, popoverStyle), { zIndex }), className: clsx(styles.container, isRefresh && styles.refresh) },
        React.createElement("div", { ref: arrowRef, className: clsx(styles[`container-arrow`], styles[`container-arrow-position-${internalPosition}`]), "aria-hidden": true }, arrow(internalPosition)),
        React.createElement("div", { ref: bodyRef, className: clsx(styles['container-body'], styles[`container-body-size-${size}`], {
                [styles['fixed-width']]: fixedWidth,
                [styles[`container-body-variant-${variant}`]]: variant,
            }) },
            React.createElement("div", { ref: contentRef }, children))));
}
//# sourceMappingURL=container.js.map