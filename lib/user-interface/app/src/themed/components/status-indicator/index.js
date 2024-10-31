import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import useBaseComponent from '../internal/hooks/use-base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import InternalStatusIndicator from './internal';
export default function StatusIndicator(_a) {
    var { type = 'success', wrapText = true } = _a, props = __rest(_a, ["type", "wrapText"]);
    const baseComponentProps = useBaseComponent('StatusIndicator', {
        props: { colorOverride: props.colorOverride, type, wrapText },
    });
    return React.createElement(InternalStatusIndicator, Object.assign({ type: type, wrapText: wrapText }, props, baseComponentProps));
}
applyDisplayName(StatusIndicator, 'StatusIndicator');
//# sourceMappingURL=index.js.map