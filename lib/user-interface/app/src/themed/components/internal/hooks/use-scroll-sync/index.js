// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useRef } from 'react';
/**
 * useScrollSync returns scroll event handler to be attached to synchronized scroll elements.
 *
 * For example
 *    const handleScroll = useScrollSync([ref1, ref2]);
 *    <div ref={ref1} onScroll={handleScroll}/>
 *    <div ref={ref2} onScroll={handleScroll}/>
 */
export function useScrollSync(refs) {
    const activeElement = useRef(null);
    return (event) => {
        const targetElement = event.currentTarget;
        // remembers the first element that fires onscroll to align with other elements against it
        if (targetElement && (activeElement.current === null || activeElement.current === targetElement)) {
            requestAnimationFrame(() => {
                activeElement.current = targetElement;
                refs.forEach(ref => {
                    const element = ref.current;
                    if (element && element !== targetElement) {
                        element.scrollLeft = targetElement.scrollLeft;
                    }
                });
                // unblock the ability to scroll the synced elements
                requestAnimationFrame(() => {
                    activeElement.current = null;
                });
            });
        }
    };
}
//# sourceMappingURL=index.js.map