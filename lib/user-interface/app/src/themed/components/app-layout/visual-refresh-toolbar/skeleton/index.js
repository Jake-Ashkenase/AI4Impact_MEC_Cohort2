// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import customCssProps from '../../../internal/generated/custom-css-properties';
import { useMobile } from '../../../internal/hooks/use-mobile';
import { highContrastHeaderClassName } from '../../../internal/utils/content-header-utils';
import sharedStyles from '../../resize/styles.css.js';
import testutilStyles from '../../test-classes/styles.css.js';
import styles from './styles.css.js';
const contentTypeCustomWidths = ['dashboard', 'cards', 'table'];
export const SkeletonLayout = React.forwardRef(({ style, notifications, headerVariant, contentHeader, content, navigation, navigationOpen, navigationWidth, tools, globalTools, toolsOpen, toolsWidth, toolbar, sideSplitPanel, bottomSplitPanel, splitPanelOpen, placement, contentType, maxContentWidth, disableContentPaddings, globalToolsOpen, }, ref) => {
    const isMobile = useMobile();
    const isMaxWidth = maxContentWidth === Number.MAX_VALUE || maxContentWidth === Number.MAX_SAFE_INTEGER;
    const anyPanelOpen = navigationOpen || toolsOpen;
    return (React.createElement("div", { ref: ref, className: clsx(styles.root, testutilStyles.root, {
            [styles['has-adaptive-widths-default']]: !contentTypeCustomWidths.includes(contentType),
            [styles['has-adaptive-widths-dashboard']]: contentType === 'dashboard',
        }), style: {
            minBlockSize: `calc(100vh - ${placement.insetBlockStart + placement.insetBlockEnd}px)`,
            [customCssProps.maxContentWidth]: isMaxWidth ? '100%' : maxContentWidth ? `${maxContentWidth}px` : '',
            [customCssProps.navigationWidth]: `${navigationWidth}px`,
            [customCssProps.toolsWidth]: `${toolsWidth}px`,
        } },
        toolbar,
        navigation && (React.createElement("div", { className: clsx(styles.navigation, !navigationOpen && styles['panel-hidden'], toolsOpen && styles['unfocusable-mobile'], sharedStyles['with-motion']) }, navigation)),
        React.createElement("main", { className: clsx(styles['main-landmark'], isMobile && anyPanelOpen && styles['unfocusable-mobile']) },
            notifications && (React.createElement("div", { className: clsx(styles['notifications-background'], headerVariant === 'high-contrast' && highContrastHeaderClassName) })),
            notifications,
            React.createElement("div", { className: clsx(styles.main, { [styles['main-disable-paddings']]: disableContentPaddings }), style: style },
                contentHeader && React.createElement("div", { className: styles['content-header'] }, contentHeader),
                React.createElement("div", { className: clsx(styles.content, testutilStyles.content) }, content)),
            bottomSplitPanel && (React.createElement("div", { className: clsx(styles['split-panel-bottom']), style: { insetBlockEnd: placement.insetBlockEnd } }, bottomSplitPanel))),
        sideSplitPanel && (React.createElement("div", { className: clsx(styles['split-panel-side'], !splitPanelOpen && styles['panel-hidden']) }, sideSplitPanel)),
        React.createElement("div", { className: clsx(styles.tools, !toolsOpen && styles['panel-hidden'], sharedStyles['with-motion'], navigationOpen && !toolsOpen && styles['unfocusable-mobile'], toolsOpen && styles['tools-open']) }, tools),
        React.createElement("div", { className: clsx(styles['global-tools'], !globalToolsOpen && styles['panel-hidden']) }, globalTools)));
});
//# sourceMappingURL=index.js.map