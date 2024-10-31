import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppLayoutToolbarEnabled } from '../../../app-layout/utils/feature-flags';
import { BreadcrumbsSlotContext } from '../../../app-layout/visual-refresh-toolbar/contexts';
import { awsuiPluginsInternal } from '../api';
function useSetGlobalBreadcrumbsImplementation(_a) {
    var _b;
    var { __disableGlobalization } = _a, props = __rest(_a, ["__disableGlobalization"]);
    const { isInToolbar } = (_b = useContext(BreadcrumbsSlotContext)) !== null && _b !== void 0 ? _b : {};
    const registrationRef = useRef();
    const [registered, setRegistered] = useState(false);
    useEffect(() => {
        if (isInToolbar || __disableGlobalization) {
            return;
        }
        const registration = awsuiPluginsInternal.breadcrumbs.registerBreadcrumbs(props, isRegistered => setRegistered(isRegistered !== null && isRegistered !== void 0 ? isRegistered : true));
        registrationRef.current = registration;
        return () => {
            registration.cleanup();
        };
        // subsequent prop changes are handled by another effect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInToolbar, __disableGlobalization]);
    useLayoutEffect(() => {
        var _a;
        (_a = registrationRef.current) === null || _a === void 0 ? void 0 : _a.update(props);
    });
    return registered;
}
export function useSetGlobalBreadcrumbs(props) {
    // avoid additional side effects when this feature is not active
    if (!useAppLayoutToolbarEnabled()) {
        return false;
    }
    // getGlobalFlag() value does not change without full page reload
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSetGlobalBreadcrumbsImplementation(props);
}
export function useGetGlobalBreadcrumbs(enabled) {
    const [discoveredBreadcrumbs, setDiscoveredBreadcrumbs] = useState(null);
    useEffect(() => {
        if (!enabled) {
            return;
        }
        return awsuiPluginsInternal.breadcrumbs.registerAppLayout(breadcrumbs => {
            setDiscoveredBreadcrumbs(breadcrumbs);
        });
    }, [enabled]);
    return discoveredBreadcrumbs;
}
//# sourceMappingURL=use-global-breadcrumbs.js.map