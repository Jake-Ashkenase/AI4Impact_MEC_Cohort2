// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import clsx from 'clsx';
import ChartPopover from '../internal/components/chart-popover';
import ChartPopoverFooter from '../internal/components/chart-popover-footer';
import ChartSeriesDetails from '../internal/components/chart-series-details';
import { Transition } from '../internal/components/transition';
import styles from './styles.css.js';
export default React.forwardRef(MixedChartPopover);
function MixedChartPopover({ containerRef, trackRef, isOpen, isPinned, highlightDetails, footer, onDismiss, size = 'medium', dismissAriaLabel, onMouseEnter, onMouseLeave, onBlur, setPopoverText, }, popoverRef) {
    const [expandedSeries, setExpandedSeries] = useState({});
    return (React.createElement(Transition, { in: isOpen }, (state, ref) => (React.createElement("div", { ref: ref, className: clsx(state === 'exiting' && styles.exiting) }, (isOpen || state !== 'exited') && highlightDetails && (React.createElement(ChartPopover, { ref: popoverRef, title: highlightDetails.position, trackRef: trackRef, trackKey: highlightDetails.position, dismissButton: isPinned, dismissAriaLabel: dismissAriaLabel, onDismiss: onDismiss, container: containerRef.current, size: size, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onBlur: onBlur },
        React.createElement(ChartSeriesDetails, { key: highlightDetails.position, details: highlightDetails.details, setPopoverText: setPopoverText, expandedSeries: expandedSeries[highlightDetails.position], setExpandedState: (id, isExpanded) => setExpandedSeries(oldState => {
                const expandedSeriesInCurrentCoordinate = new Set(oldState[highlightDetails.position]);
                if (isExpanded) {
                    expandedSeriesInCurrentCoordinate.add(id);
                }
                else {
                    expandedSeriesInCurrentCoordinate.delete(id);
                }
                return Object.assign(Object.assign({}, oldState), { [highlightDetails.position]: expandedSeriesInCurrentCoordinate });
            }) }),
        footer && React.createElement(ChartPopoverFooter, null, footer)))))));
}
//# sourceMappingURL=chart-popover.js.map