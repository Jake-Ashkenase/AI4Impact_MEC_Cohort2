// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { InternalButton } from '../button/internal';
import { useInternalI18n } from '../i18n/context.js';
import InternalLiveRegion from '../live-region/internal';
import { TabButton } from './tab-button';
import { getStatusButtonId } from './util';
import styles from './styles.css.js';
export function StatusBar({ languageLabel, cursorPosition, paneStatus, onErrorPaneToggle, onWarningPaneToggle, onTabFocus, onTabBlur, errorsTabRef, warningsTabRef, isTabFocused, paneId, onPreferencesOpen, i18nStrings, errorCount, warningCount, isRefresh, }) {
    const i18n = useInternalI18n('code-editor');
    const errorText = `${i18n('i18nStrings.errorsTab', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.errorsTab)}: ${errorCount}`;
    const warningText = `${i18n('i18nStrings.warningsTab', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.warningsTab)}: ${warningCount}`;
    const errorButtonId = getStatusButtonId({ paneId, paneStatus: 'error' });
    const warningButtonId = getStatusButtonId({ paneId, paneStatus: 'warning' });
    return (React.createElement("div", { className: clsx(styles['status-bar'], {
            [styles['status-bar-with-hidden-pane']]: paneStatus === 'hidden',
        }) },
        React.createElement("div", { className: clsx(styles['status-bar__left']) },
            React.createElement("span", { className: styles['status-bar__language-mode'] }, languageLabel),
            React.createElement("span", { className: styles['status-bar__cursor-position'] }, cursorPosition),
            React.createElement("div", { className: styles['tab-list'], role: "tablist" },
                React.createElement(TabButton, { id: errorButtonId, count: errorCount, text: errorText, className: styles['tab-button--errors'], iconName: "status-negative", disabled: errorCount === 0, active: paneStatus === 'error', onClick: onErrorPaneToggle, onFocus: onTabFocus, onBlur: onTabBlur, ref: errorsTabRef, ariaLabel: errorText, paneId: paneId, isRefresh: isRefresh }),
                React.createElement("span", { className: styles['tab-button--divider'] }),
                React.createElement(TabButton, { id: warningButtonId, count: warningCount, text: warningText, className: styles['tab-button--warnings'], iconName: "status-warning", disabled: warningCount === 0, active: paneStatus === 'warning', onClick: onWarningPaneToggle, onFocus: onTabFocus, onBlur: onTabBlur, ref: warningsTabRef, tabIndex: paneStatus === 'error' && isTabFocused ? -1 : undefined, ariaHidden: paneStatus === 'error' && isTabFocused ? true : undefined, ariaLabel: warningText, paneId: paneId, isRefresh: isRefresh })),
            React.createElement(InternalLiveRegion, { assertive: true, hidden: true, tagName: "span" },
                React.createElement("span", null,
                    errorText,
                    " "),
                React.createElement("span", null, warningText))),
        React.createElement("div", { className: styles['status-bar__right'] },
            React.createElement("div", { className: styles['status-bar__cog-button'] },
                React.createElement(InternalButton, { formAction: "none", variant: "icon", iconName: "settings", iconAlt: "Settings", ariaLabel: i18n('i18nStrings.preferencesButtonAriaLabel', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.preferencesButtonAriaLabel), onClick: onPreferencesOpen, __nativeAttributes: {
                        tabIndex: paneStatus !== 'hidden' && isTabFocused ? -1 : undefined,
                        'aria-hidden': paneStatus !== 'hidden' && isTabFocused ? true : undefined,
                    } })))));
}
//# sourceMappingURL=status-bar.js.map