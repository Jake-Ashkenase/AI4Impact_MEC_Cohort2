// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __rest } from "tslib";
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import clsx from 'clsx';
import { getBaseProps } from '../internal/base-component';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { LiveRegionController } from './controller';
import styles from './styles.css.js';
import testUtilStyles from './test-classes/styles.css.js';
export default React.forwardRef(function InternalLiveRegion(_a, ref) {
    var { assertive = false, hidden = false, tagName: TagName = 'div', delay, sources, children, __internalRootRef, className } = _a, restProps = __rest(_a, ["assertive", "hidden", "tagName", "delay", "sources", "children", "__internalRootRef", "className"]);
    const baseProps = getBaseProps(restProps);
    const childrenRef = useRef(null);
    const mergedRef = useMergeRefs(childrenRef, __internalRootRef);
    useEffect(() => {
        // We have to do this because `inert` isn't properly supported until
        // React 19 and this seems much more maintainable than version detection.
        // `inert` is better than `hidden` because it also blocks pointer and
        // focus events as well as hiding the contents from screen readers.
        // https://github.com/facebook/react/issues/17157
        if (childrenRef.current) {
            childrenRef.current.inert = hidden;
        }
    }, [hidden]);
    // Initialize the live region controller inside an effect. We have to do this
    // because the controller depends on DOM elements, which aren't available on the
    // server.
    const liveRegionControllerRef = useRef();
    useEffect(() => {
        const liveRegionController = new LiveRegionController(assertive ? 'assertive' : 'polite');
        liveRegionControllerRef.current = liveRegionController;
        return () => {
            liveRegionController.destroy();
            liveRegionControllerRef.current = undefined;
        };
    }, [assertive]);
    const getContent = () => {
        if (sources) {
            return getSourceContent(sources);
        }
        if (childrenRef.current) {
            return extractTextContent(childrenRef.current);
        }
    };
    // Call the controller on every render. The controller will deduplicate the
    // message against the previous announcement internally.
    useEffect(() => {
        var _a;
        (_a = liveRegionControllerRef.current) === null || _a === void 0 ? void 0 : _a.announce({ message: getContent(), delay });
    });
    useImperativeHandle(ref, () => ({
        reannounce() {
            var _a;
            (_a = liveRegionControllerRef.current) === null || _a === void 0 ? void 0 : _a.announce({ message: getContent(), delay, forceReannounce: true });
        },
    }));
    return (React.createElement(TagName, Object.assign({ ref: mergedRef }, baseProps, { className: clsx(styles.root, testUtilStyles.root, className), hidden: hidden }), children));
});
function extractTextContent(node) {
    // We use the text content of the node as the announcement text.
    // This only extracts text content from the node including all its children which is enough for now.
    // To make it more powerful, it is possible to create a more sophisticated extractor with respect to
    // ARIA properties to ignore aria-hidden nodes and read ARIA labels from the live content.
    return (node.textContent || '').replace(/\s+/g, ' ').trim();
}
function getSourceContent(source) {
    return source
        .map(item => {
        if (!item || typeof item === 'string') {
            return item;
        }
        if (item.current) {
            return extractTextContent(item.current);
        }
    })
        .filter(Boolean)
        .join(' ');
}
//# sourceMappingURL=internal.js.map