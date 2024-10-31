// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { checkSplitPanelForcedPosition } from '../split-panel/split-panel-utils';
export const CONTENT_PADDING = 2 * 24; // space-xl
export function computeHorizontalLayout({ navigationOpen, navigationWidth, placement, minContentWidth, activeDrawerSize, splitPanelOpen, splitPanelPosition, splitPanelSize, isMobile, activeGlobalDrawersSizes, }) {
    const activeNavigationWidth = navigationOpen ? navigationWidth : 0;
    let resizableSpaceAvailable = Math.max(0, placement.inlineSize - minContentWidth - CONTENT_PADDING - activeNavigationWidth);
    const totalActiveGlobalDrawersSize = Object.values(activeGlobalDrawersSizes).reduce((acc, size) => acc + size, 0);
    const splitPanelMaxWidth = resizableSpaceAvailable - activeDrawerSize;
    const splitPanelForcedPosition = checkSplitPanelForcedPosition({ isMobile, splitPanelMaxWidth });
    const resolvedSplitPanelPosition = splitPanelForcedPosition ? 'bottom' : splitPanelPosition !== null && splitPanelPosition !== void 0 ? splitPanelPosition : 'bottom';
    const sideSplitPanelSize = resolvedSplitPanelPosition === 'side' && splitPanelOpen ? splitPanelSize !== null && splitPanelSize !== void 0 ? splitPanelSize : 0 : 0;
    const maxSplitPanelSize = Math.max(resizableSpaceAvailable - totalActiveGlobalDrawersSize - activeDrawerSize, 0);
    resizableSpaceAvailable -= sideSplitPanelSize;
    const maxDrawerSize = resizableSpaceAvailable - totalActiveGlobalDrawersSize;
    const maxGlobalDrawersSizes = Object.keys(activeGlobalDrawersSizes).reduce((acc, drawerId) => {
        return Object.assign(Object.assign({}, acc), { [drawerId]: resizableSpaceAvailable -
                activeDrawerSize -
                totalActiveGlobalDrawersSize +
                activeGlobalDrawersSizes[drawerId] });
    }, {});
    return {
        splitPanelPosition: resolvedSplitPanelPosition,
        splitPanelForcedPosition,
        sideSplitPanelSize,
        maxSplitPanelSize,
        maxDrawerSize,
        maxGlobalDrawersSizes,
        totalActiveGlobalDrawersSize,
        resizableSpaceAvailable,
    };
}
export function computeVerticalLayout({ topOffset, hasVisibleToolbar, toolbarHeight, stickyNotifications, notificationsHeight, }) {
    const toolbar = topOffset;
    let notifications = topOffset;
    let drawers = topOffset;
    if (hasVisibleToolbar) {
        notifications += toolbarHeight;
        drawers += toolbarHeight;
    }
    let header = notifications;
    if (stickyNotifications) {
        header += notificationsHeight;
    }
    return { toolbar, notifications, header, drawers };
}
export function getDrawerTopOffset(verticalOffsets, isMobile, placement) {
    var _a;
    return isMobile ? verticalOffsets.toolbar : (_a = verticalOffsets.drawers) !== null && _a !== void 0 ? _a : placement.insetBlockStart;
}
//# sourceMappingURL=compute-layout.js.map