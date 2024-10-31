// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import clsx from 'clsx';
import InternalIcon from '../../icon/internal';
import { useSingleTabStopNavigation } from '../../internal/context/single-tab-stop-navigation-context';
import styles from './styles.css.js';
export function ExpandToggleButton({ isExpanded, onExpandableItemToggle, expandButtonLabel, collapseButtonLabel, }) {
    const buttonRef = useRef(null);
    const { tabIndex } = useSingleTabStopNavigation(buttonRef);
    return (React.createElement("button", { type: "button", ref: buttonRef, tabIndex: tabIndex, "aria-label": isExpanded ? collapseButtonLabel : expandButtonLabel, "aria-expanded": isExpanded, className: styles['expand-toggle'], onClick: onExpandableItemToggle },
        React.createElement(InternalIcon, { size: "small", name: "caret-down-filled", className: clsx(styles['expand-toggle-icon'], isExpanded && styles['expand-toggle-icon-expanded']) })));
}
//# sourceMappingURL=expand-toggle-button.js.map