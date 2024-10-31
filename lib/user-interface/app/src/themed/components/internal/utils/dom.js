// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import balanced from 'balanced-match';
import { findUpUntil } from '@cloudscape-design/component-toolkit/dom';
/**
 * Returns an element that is used to position the given element.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block
 */
export function getContainingBlock(startElement) {
    if (!startElement.parentElement) {
        return null;
    }
    return findUpUntil(startElement.parentElement, element => {
        var _a;
        const computedStyle = getComputedStyle(element);
        return ((!!computedStyle.transform && computedStyle.transform !== 'none') ||
            (!!computedStyle.perspective && computedStyle.perspective !== 'none') ||
            (!!computedStyle.containerType && computedStyle.containerType !== 'normal') ||
            ((_a = computedStyle.contain) === null || _a === void 0 ? void 0 : _a.split(' ').some(s => ['layout', 'paint', 'strict', 'content'].includes(s))));
    });
}
const cssVariableExpression = /--.+?\s*,\s*(.+)/;
/**
 * Parses a CSS color value that might contain CSS Custom Properties
 * and returns a value that will be understood by the browser, no matter of support level.
 * If the browser support CSS Custom Properties, the value will be return as is. Otherwise,
 * the fallback value will be extracted and returned instead.
 */
export function parseCssVariable(value) {
    var _a, _b, _c;
    if (typeof window === 'undefined') {
        return value;
    }
    if ((_c = (_b = (_a = window.CSS) === null || _a === void 0 ? void 0 : _a.supports) === null || _b === void 0 ? void 0 : _b.call(_a, 'color', 'var(--dummy, #000)')) !== null && _c !== void 0 ? _c : false) {
        return value;
    }
    const varIndex = value.lastIndexOf('var(');
    if (varIndex === -1) {
        return value;
    }
    const expr = balanced('(', ')', value.substr(varIndex));
    if (!expr) {
        return value;
    }
    const match = expr.body.match(cssVariableExpression);
    return match ? match[1] : value;
}
// The instanceof Node/HTMLElement/SVGElement checks can fail if the target element
// belongs to a different window than the respective type.
export function isNode(target) {
    return (target instanceof Node ||
        (target !== null &&
            typeof target === 'object' &&
            'nodeType' in target &&
            typeof target.nodeType === 'number' &&
            'nodeName' in target &&
            typeof target.nodeName === 'string' &&
            'parentNode' in target &&
            typeof target.parentNode === 'object'));
}
export function isHTMLElement(target) {
    return (target instanceof HTMLElement ||
        (isNode(target) &&
            target.nodeType === Node.ELEMENT_NODE &&
            'style' in target &&
            typeof target.style === 'object' &&
            typeof target.ownerDocument === 'object' &&
            !isSVGElement(target)));
}
export function isSVGElement(target) {
    return (target instanceof SVGElement ||
        (isNode(target) &&
            target.nodeType === Node.ELEMENT_NODE &&
            'ownerSVGElement' in target &&
            typeof target.ownerSVGElement === 'object'));
}
//# sourceMappingURL=dom.js.map