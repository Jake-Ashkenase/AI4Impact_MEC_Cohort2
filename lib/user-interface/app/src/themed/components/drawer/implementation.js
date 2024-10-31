import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import { useAppLayoutToolbarEnabled } from '../app-layout/utils/feature-flags';
import { useInternalI18n } from '../i18n/context';
import { getBaseProps } from '../internal/base-component';
import { createWidgetizedComponent } from '../internal/widgets';
import InternalLiveRegion from '../live-region/internal';
import InternalStatusIndicator from '../status-indicator/internal';
import styles from './styles.css.js';
export function DrawerImplementation(_a) {
    var { header, children, loading, i18nStrings, __internalRootRef } = _a, restProps = __rest(_a, ["header", "children", "loading", "i18nStrings", "__internalRootRef"]);
    const baseProps = getBaseProps(restProps);
    const isToolbar = useAppLayoutToolbarEnabled();
    const i18n = useInternalI18n('drawer');
    const containerProps = Object.assign(Object.assign({}, baseProps), { className: clsx(baseProps.className, styles.drawer, isToolbar && styles['with-toolbar']) });
    return loading ? (React.createElement("div", Object.assign({}, containerProps, { ref: __internalRootRef }),
        React.createElement(InternalStatusIndicator, { type: "loading" },
            React.createElement(InternalLiveRegion, { tagName: "span" }, i18n('i18nStrings.loadingText', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.loadingText))))) : (React.createElement("div", Object.assign({}, containerProps, { ref: __internalRootRef }),
        header && React.createElement("div", { className: styles.header }, header),
        React.createElement("div", { className: styles['test-utils-drawer-content'] }, children)));
}
export const createWidgetizedDrawer = createWidgetizedComponent(DrawerImplementation);
//# sourceMappingURL=implementation.js.map