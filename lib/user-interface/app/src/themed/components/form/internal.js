import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { getAnalyticsMetadataAttribute } from '@cloudscape-design/component-toolkit/internal/analytics-metadata';
import InternalAlert from '../alert/internal';
import InternalBox from '../box/internal';
import { useInternalI18n } from '../i18n/context';
import { getBaseProps } from '../internal/base-component';
import InternalLiveRegion from '../live-region/internal';
import analyticsSelectors from './analytics-metadata/styles.css.js';
import styles from './styles.css.js';
export default function InternalForm(_a) {
    var { children, header, errorText, errorIconAriaLabel: errorIconAriaLabelOverride, actions, secondaryActions, __internalRootRef, __injectAnalyticsComponentMetadata } = _a, props = __rest(_a, ["children", "header", "errorText", "errorIconAriaLabel", "actions", "secondaryActions", "__internalRootRef", "__injectAnalyticsComponentMetadata"]);
    const baseProps = getBaseProps(props);
    const i18n = useInternalI18n('form');
    const errorIconAriaLabel = i18n('errorIconAriaLabel', errorIconAriaLabelOverride);
    const analyticsComponentMetadata = {
        component: {
            name: 'awsui.Form',
            label: {
                selector: ['h1', 'h2', 'h3'].map(heading => `.${analyticsSelectors.header} ${heading}`),
            },
        },
    };
    return (React.createElement("div", Object.assign({}, baseProps, { ref: __internalRootRef, className: clsx(styles.root, baseProps.className) }, (__injectAnalyticsComponentMetadata ? getAnalyticsMetadataAttribute(analyticsComponentMetadata) : {})),
        header && React.createElement("div", { className: clsx(styles.header, analyticsSelectors.header) }, header),
        children && React.createElement("div", { className: styles.content }, children),
        errorText && (React.createElement(InternalBox, { margin: { top: 'l' } },
            React.createElement(InternalAlert, { type: "error", statusIconAriaLabel: errorIconAriaLabel },
                React.createElement("div", { className: styles.error }, errorText)))),
        (actions || secondaryActions) && (React.createElement("div", { className: styles.footer },
            React.createElement("div", { className: styles['actions-section'] },
                actions && React.createElement("div", { className: styles.actions }, actions),
                secondaryActions && React.createElement("div", { className: styles['secondary-actions'] }, secondaryActions)))),
        errorText && (React.createElement(InternalLiveRegion, { hidden: true, tagName: "span", assertive: true },
            errorIconAriaLabel,
            ", ",
            errorText))));
}
//# sourceMappingURL=internal.js.map