import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import clsx from 'clsx';
import { getAnalyticsLabelAttribute } from '@cloudscape-design/component-toolkit/internal/analytics-metadata';
import { useFunnelSubStep } from '../internal/analytics/hooks/use-funnel';
import { getBaseProps } from '../internal/base-component';
import { ContainerHeaderContextProvider } from '../internal/context/container-header';
import { useModalContext } from '../internal/context/modal-context';
import { useMergeRefs } from '../internal/hooks/use-merge-refs';
import { useMobile } from '../internal/hooks/use-mobile';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { StickyHeaderContext, useStickyHeader } from './use-sticky-header';
import analyticsSelectors from './analytics-metadata/styles.css.js';
import styles from './styles.css.js';
export function InternalContainerAsSubstep(props) {
    const { subStepRef, funnelSubStepProps } = useFunnelSubStep();
    const modalContext = useModalContext();
    return (React.createElement(InternalContainer, Object.assign({}, props, { __subStepRef: (modalContext === null || modalContext === void 0 ? void 0 : modalContext.isInModal) ? { current: null } : subStepRef, __funnelSubStepProps: (modalContext === null || modalContext === void 0 ? void 0 : modalContext.isInModal) ? {} : funnelSubStepProps })));
}
export default function InternalContainer(_a) {
    var _b;
    var { header, footer, children, variant = 'default', disableHeaderPaddings = false, disableContentPaddings = false, fitHeight, media, __stickyOffset, __mobileStickyOffset, __stickyHeader = false, __internalRootRef = null, __disableFooterDivider = false, __disableFooterPaddings = false, __hiddenContent = false, __headerRef, __fullPage = false, __disableStickyMobile = true, __funnelSubStepProps, __subStepRef } = _a, restProps = __rest(_a, ["header", "footer", "children", "variant", "disableHeaderPaddings", "disableContentPaddings", "fitHeight", "media", "__stickyOffset", "__mobileStickyOffset", "__stickyHeader", "__internalRootRef", "__disableFooterDivider", "__disableFooterPaddings", "__hiddenContent", "__headerRef", "__fullPage", "__disableStickyMobile", "__funnelSubStepProps", "__subStepRef"]);
    const isMobile = useMobile();
    const isRefresh = useVisualRefresh();
    const baseProps = getBaseProps(restProps);
    const rootRef = useRef(null);
    const headerRef = useRef(null);
    const { isSticky, isStuck, stickyStyles } = useStickyHeader(rootRef, headerRef, __stickyHeader, __stickyOffset, __mobileStickyOffset, __disableStickyMobile, __fullPage && isRefresh && !isMobile);
    const contentId = useUniqueId();
    const hasDynamicHeight = isRefresh && variant === 'full-page';
    const mergedRef = useMergeRefs(rootRef, __internalRootRef);
    const headerMergedRef = useMergeRefs(headerRef, __headerRef);
    // The container is only sticky on mobile if it is the header for the table.
    // In this case we don't want the container to have sticky styles, as only the table header row will show as stuck on scroll.
    const shouldHaveStickyStyles = isSticky && !isMobile;
    const hasMedia = !!(media === null || media === void 0 ? void 0 : media.content);
    const mediaPosition = (_b = media === null || media === void 0 ? void 0 : media.position) !== null && _b !== void 0 ? _b : 'top';
    return (React.createElement("div", Object.assign({}, baseProps, __funnelSubStepProps, { className: clsx(baseProps.className, styles.root, styles[`variant-${variant}`], fitHeight && styles['fit-height'], hasMedia && (mediaPosition === 'side' ? styles['with-side-media'] : styles['with-top-media']), shouldHaveStickyStyles && [styles['sticky-enabled']], isRefresh && styles.refresh), ref: mergedRef }, getAnalyticsLabelAttribute(`.${analyticsSelectors.header} h1, .${analyticsSelectors.header} h2, .${analyticsSelectors.header} h3`)),
        hasMedia && (React.createElement("div", { className: clsx(styles[`media-${mediaPosition === 'side' ? 'side' : 'top'}`], styles.media), style: mediaPosition === 'top' ? { height: (media === null || media === void 0 ? void 0 : media.height) || '' } : { width: (media === null || media === void 0 ? void 0 : media.width) || '' } }, media.content)),
        React.createElement("div", { id: contentId, ref: __subStepRef, className: clsx(styles['content-wrapper'], fitHeight && styles['content-wrapper-fit-height']) },
            header && (React.createElement(ContainerHeaderContextProvider, null,
                React.createElement(StickyHeaderContext.Provider, { value: { isStuck } },
                    React.createElement("div", Object.assign({ className: clsx(isRefresh && styles.refresh, styles.header, analyticsSelectors.header, styles[`header-variant-${variant}`], {
                            [styles['header-sticky-disabled']]: __stickyHeader && !isSticky,
                            [styles['header-sticky-enabled']]: isSticky,
                            [styles['header-dynamic-height']]: hasDynamicHeight,
                            [styles['header-stuck']]: isStuck,
                            [styles['with-paddings']]: !disableHeaderPaddings,
                            [styles['with-hidden-content']]: !children || __hiddenContent,
                            [styles['header-with-media']]: hasMedia,
                            [styles['header-full-page']]: __fullPage && isRefresh,
                        }) }, stickyStyles, { ref: headerMergedRef }),
                        isStuck && !isMobile && isRefresh && __fullPage && React.createElement("div", { className: styles['header-cover'] }),
                        header)))),
            React.createElement("div", { className: clsx(styles.content, fitHeight && styles['content-fit-height'], {
                    [styles['with-paddings']]: !disableContentPaddings,
                }) }, children),
            footer && (React.createElement("div", { className: clsx(styles.footer, {
                    [styles['with-divider']]: !__disableFooterDivider,
                    [styles['with-paddings']]: !__disableFooterPaddings,
                }) }, footer)))));
}
//# sourceMappingURL=internal.js.map