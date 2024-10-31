// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { findUpUntil } from '@cloudscape-design/component-toolkit/dom';
export const getOverflowParents = (element) => {
    const parents = [];
    let node = element;
    while ((node = node.parentElement) && node !== element.ownerDocument.body) {
        getComputedStyle(node).overflow !== 'visible' && parents.push(node);
    }
    return parents;
};
export const getOverflowParentDimensions = ({ element, excludeClosestParent = false, expandToViewport = false, canExpandOutsideViewport = false, }) => {
    var _a, _b, _c, _d, _e;
    const parents = expandToViewport
        ? []
        : getOverflowParents(element).map(el => {
            const { height, width, top, left } = el.getBoundingClientRect();
            return {
                // Treat the whole scrollable area as the available height
                // if we're allowed to expand past the viewport.
                blockSize: canExpandOutsideViewport ? el.scrollHeight : height,
                inlineSize: width,
                insetBlockStart: top,
                insetInlineStart: left,
            };
        });
    if (canExpandOutsideViewport && !expandToViewport) {
        const document = element.ownerDocument;
        const documentDimensions = document.documentElement.getBoundingClientRect();
        parents.push({
            inlineSize: Math.max(documentDimensions.width, document.documentElement.clientWidth),
            blockSize: Math.max(documentDimensions.height, document.documentElement.clientHeight),
            insetBlockStart: documentDimensions.top,
            insetInlineStart: documentDimensions.left,
        });
    }
    else {
        const owningWindow = (_a = element.ownerDocument.defaultView) !== null && _a !== void 0 ? _a : window;
        parents.push({
            blockSize: (_c = (_b = owningWindow.visualViewport) === null || _b === void 0 ? void 0 : _b.height) !== null && _c !== void 0 ? _c : owningWindow.innerHeight,
            inlineSize: (_e = (_d = owningWindow.visualViewport) === null || _d === void 0 ? void 0 : _d.width) !== null && _e !== void 0 ? _e : owningWindow.innerWidth,
            insetBlockStart: 0,
            insetInlineStart: 0,
        });
    }
    if (excludeClosestParent && !expandToViewport) {
        parents.shift();
    }
    return parents;
};
/**
 * Calls `scrollIntoView` on the provided element with sensible defaults. If
 * the element does not exist or does not support the `scrollIntoView`
 * method, it will do nothing. This wrapper is created to support environments
 * where the native function is not available like JSDom (feature request:
 * https://github.com/jsdom/jsdom/issues/1422).
 *
 * @param element to be scrolled into view
 * @param options native options for `scrollIntoView`
 */
export function scrollElementIntoView(element, options = { block: 'nearest', inline: 'nearest' }) {
    var _a;
    (_a = element === null || element === void 0 ? void 0 : element.scrollIntoView) === null || _a === void 0 ? void 0 : _a.call(element, options);
}
export function calculateScroll({ insetBlockStart, blockSize }) {
    if (insetBlockStart < 0) {
        return insetBlockStart;
    }
    else if (insetBlockStart + blockSize > window.innerHeight) {
        if (blockSize > window.innerHeight) {
            return insetBlockStart;
        }
        else {
            return insetBlockStart + blockSize - window.innerHeight;
        }
    }
    return 0;
}
/**
 * For elements with fixed position, the browser's native scrollIntoView API doesn't work,
 * so we need to manually scroll to the element's position.
 * Supports only vertical scrolling.
 */
export function scrollRectangleIntoView(box, scrollableParent) {
    const scrollAmount = calculateScroll(box);
    if (scrollAmount) {
        (scrollableParent || window).scrollBy(0, scrollAmount);
    }
}
export function getFirstScrollableParent(element) {
    return (findUpUntil(element, el => {
        const overflows = el.scrollHeight > el.clientHeight;
        return overflows && ['scroll', 'auto'].includes(getComputedStyle(el).overflowY);
    }) || undefined);
}
//# sourceMappingURL=scrollable-containers.js.map