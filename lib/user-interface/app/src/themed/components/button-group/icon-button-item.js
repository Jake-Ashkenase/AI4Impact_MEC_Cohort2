// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { warnOnce } from '@cloudscape-design/component-toolkit/internal';
import { InternalButton } from '../button/internal.js';
import Tooltip from '../internal/components/tooltip/index.js';
import InternalLiveRegion from '../live-region/internal.js';
import testUtilStyles from './test-classes/styles.css.js';
const IconButtonItem = forwardRef(({ item, showTooltip, showFeedback, onItemClick, }, ref) => {
    const containerRef = React.useRef(null);
    const hasIcon = item.iconName || item.iconUrl || item.iconSvg;
    if (!hasIcon) {
        warnOnce('ButtonGroup', `Missing icon for item with id: ${item.id}`);
    }
    return (React.createElement("div", { ref: containerRef },
        React.createElement(InternalButton, { variant: "icon", loading: item.loading, loadingText: item.loadingText, disabled: item.disabled, iconName: hasIcon ? item.iconName : 'close', iconAlt: item.text, iconSvg: item.iconSvg, ariaLabel: item.text, onClick: onItemClick, ref: ref, "data-testid": item.id, "data-itemid": item.id, className: clsx(testUtilStyles.item, testUtilStyles['button-group-item']), __title: "" }, item.text),
        showTooltip && !item.disabled && !item.loading && (!showFeedback || item.popoverFeedback) && (React.createElement(Tooltip, { trackRef: containerRef, trackKey: item.id, value: (showFeedback && React.createElement(InternalLiveRegion, { tagName: "span" }, item.popoverFeedback)) ||
                item.text, className: clsx(testUtilStyles.tooltip, testUtilStyles['button-group-tooltip']) }))));
});
export default IconButtonItem;
//# sourceMappingURL=icon-button-item.js.map