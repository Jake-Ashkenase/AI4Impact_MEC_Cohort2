// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import clsx from 'clsx';
import { useInternalI18n } from '../../../i18n/context';
import InternalLiveRegion from '../../../live-region/internal';
import { useUniqueId } from '../../hooks/use-unique-id';
import { KeyCode } from '../../keycode';
import ApplicationController from './application-controller';
import FocusOutline from './focus-outline';
import styles from './styles.css.js';
const DEFAULT_PLOT_FOCUS_OFFSET = 3;
const DEFAULT_ELEMENT_FOCUS_OFFSET = 3;
/**
  An extension for the SVG to be used for charts. It includes a controller element to
  handle the focus and keyboard interactions in a way that is supported by screen readers.

  The application mimics the aria-activedescendant behavior which is unsupported by Safari. The
  activeElementRef is the pointer to the secondary-focus element and activeElementKey denotes when
  the focus transition was made.

  Alternatively, ariaLiveRegion can be used to make announcements.
*/
export default forwardRef(ChartPlot);
function ChartPlot({ width, height, transform, offsetTop, offsetBottom, offsetLeft, offsetRight, ariaLabel, ariaLabelledby, ariaRoleDescription, ariaDescription, ariaDescribedby, activeElementKey, activeElementRef, ariaLiveRegion, isClickable, isPrecise, children, onClick, onKeyDown, focusOffset = DEFAULT_PLOT_FOCUS_OFFSET, activeElementFocusOffset = DEFAULT_ELEMENT_FOCUS_OFFSET, onMouseMove, onMouseOut, onApplicationBlur, onApplicationFocus, }, ref) {
    const i18n = useInternalI18n('[charts]');
    const svgRef = useRef(null);
    const applicationRef = useRef(null);
    const plotClickedRef = useRef(false);
    const [isPlotFocused, setPlotFocused] = useState(false);
    const [isApplicationFocused, setApplicationFocused] = useState(false);
    const internalDescriptionId = useUniqueId('awsui-chart-plot__description');
    const ariaDescriptionId = [ariaDescription && internalDescriptionId, ariaDescribedby].filter(Boolean).join(' ');
    useImperativeHandle(ref, () => ({
        svg: svgRef.current,
        focusPlot: () => svgRef.current.focus(),
        focusApplication: () => applicationRef.current.focus(),
    }));
    const onPlotMouseDown = () => {
        // Record the click was made for the application focus handler.
        plotClickedRef.current = true;
    };
    const onPlotFocus = (event) => {
        // If focused via click or an element was highlighted,
        // focus the internal application, which will manage and show focus accordingly on its internal elements.
        if (plotClickedRef.current || !!activeElementKey) {
            applicationRef.current.focus();
        }
        else if (event.target === svgRef.current) {
            // Otherwise, focus the entire plot if it was focused with the keyboard.
            setPlotFocused(true);
        }
    };
    const onPlotClick = (event) => {
        onClick && onClick(event);
    };
    const onPlotBlur = (event) => {
        if (event.target === svgRef.current) {
            setPlotFocused(false);
        }
    };
    // Once one of the expected keys is pressed the focus is delegated to the application controller.
    const onPlotKeyDown = (event) => {
        if (isPlotFocused) {
            // Delegate the focus to the application if one of the expected keys was pressed.
            const codes = [KeyCode.space, KeyCode.enter, KeyCode.up, KeyCode.left, KeyCode.right, KeyCode.down];
            if (codes.indexOf(event.keyCode) !== -1) {
                applicationRef.current.focus();
            }
        }
    };
    const onPlotApplicationFocus = (event) => {
        onApplicationFocus && onApplicationFocus(event, plotClickedRef.current ? 'mouse' : 'keyboard');
        // "Release" the click reference to not affect the next call of this handler.
        plotClickedRef.current = false;
        setApplicationFocused(true);
    };
    const onPlotApplicationBlur = (event) => {
        onApplicationBlur && onApplicationBlur(event);
        setApplicationFocused(false);
    };
    const onApplicationKeyDown = onKeyDown;
    const plotFocusable = !isApplicationFocused;
    const plotTabIndex = plotFocusable ? 0 : -1;
    const plotAria = !isApplicationFocused
        ? {
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledby,
            'aria-describedby': ariaDescriptionId,
            'aria-roledescription': i18n('i18nStrings.chartAriaRoleDescription', ariaRoleDescription),
        }
        : {};
    return (React.createElement(React.Fragment, null,
        React.createElement("svg", Object.assign({ onMouseMove: onMouseMove, onMouseOut: onMouseOut, focusable: plotFocusable, tabIndex: plotTabIndex, role: "application", "aria-hidden": "false" }, plotAria, { ref: svgRef, style: {
                width,
                height,
                marginTop: offsetTop,
                marginBottom: offsetBottom,
                marginLeft: offsetLeft,
                marginRight: offsetRight,
            }, className: clsx(styles.root, {
                [styles.clickable]: isClickable,
                [styles.precise]: isPrecise,
            }), onMouseDown: onPlotMouseDown, onClick: onPlotClick, onFocus: onPlotFocus, onBlur: onPlotBlur, onKeyDown: onPlotKeyDown }),
            React.createElement(FocusOutline, { elementRef: svgRef, elementKey: isPlotFocused, offset: focusOffset }),
            React.createElement("g", { transform: transform },
                React.createElement(ApplicationController, { activeElementKey: (isApplicationFocused && activeElementKey) || null, activeElementRef: activeElementRef, ref: applicationRef, onFocus: onPlotApplicationFocus, onBlur: onPlotApplicationBlur, onKeyDown: onApplicationKeyDown }),
                ariaDescription && plotFocusable && (React.createElement("desc", { "aria-hidden": "true", id: internalDescriptionId }, ariaDescription)),
                children,
                React.createElement(FocusOutline, { elementRef: activeElementRef, elementKey: isApplicationFocused && activeElementKey, offset: activeElementFocusOffset }))),
        React.createElement(InternalLiveRegion, { hidden: true, tagName: "span" }, ariaLiveRegion)));
}
//# sourceMappingURL=index.js.map