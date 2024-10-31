import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { SplitPanelContextProvider } from '../../internal/context/split-panel-context';
import { getLimitedValue } from '../../split-panel/utils/size-utils';
import { SPLIT_PANEL_MIN_HEIGHT, SPLIT_PANEL_MIN_WIDTH } from './constants';
export function SplitPanelProvider(_a) {
    var { children, size, getMaxHeight, maxWidth, reportSize, onResize } = _a, rest = __rest(_a, ["children", "size", "getMaxHeight", "maxWidth", "reportSize", "onResize"]);
    const { position, isOpen } = rest;
    const [maxHeight, setMaxHeight] = useState(size);
    const minSize = position === 'bottom' ? SPLIT_PANEL_MIN_HEIGHT : SPLIT_PANEL_MIN_WIDTH;
    const maxSize = position === 'bottom' ? maxHeight : maxWidth;
    const cappedSize = getLimitedValue(minSize, size, maxSize);
    const relativeSize = ((size - minSize) / (maxSize - minSize)) * 100;
    const onResizeWithValidation = (newSize) => {
        const maxSize = position === 'side' ? maxWidth : getMaxHeight();
        const isResizeValid = position === 'side' ? maxSize >= SPLIT_PANEL_MIN_WIDTH : maxSize >= SPLIT_PANEL_MIN_HEIGHT;
        if (isOpen && isResizeValid) {
            onResize(getLimitedValue(minSize, newSize, maxSize));
        }
    };
    useEffect(() => {
        if (position !== 'bottom') {
            return;
        }
        // effects are called inside out in the components tree
        // wait one frame to allow app-layout to complete its calculations
        const handle = requestAnimationFrame(() => setMaxHeight(getMaxHeight()));
        return () => cancelAnimationFrame(handle);
    }, [size, minSize, position, getMaxHeight]);
    useEffect(() => {
        reportSize(cappedSize);
    }, [reportSize, cappedSize]);
    useEffect(() => {
        if (position !== 'bottom') {
            return;
        }
        const handler = () => setMaxHeight(getMaxHeight());
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, [position, getMaxHeight]);
    return (React.createElement(SplitPanelContextProvider, { value: Object.assign(Object.assign({}, rest), { size: cappedSize, relativeSize, onResize: onResizeWithValidation }) }, children));
}
//# sourceMappingURL=provider.js.map