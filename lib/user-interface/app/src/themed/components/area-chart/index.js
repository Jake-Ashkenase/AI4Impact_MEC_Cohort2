import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import useBaseComponent from '../internal/hooks/use-base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import InternalAreaChart from './internal';
function AreaChart(_a) {
    var { height = 500, xScaleType = 'linear', yScaleType = 'linear', statusType = 'finished', detailPopoverSize = 'medium', i18nStrings = {} } = _a, props = __rest(_a, ["height", "xScaleType", "yScaleType", "statusType", "detailPopoverSize", "i18nStrings"]);
    const baseComponentProps = useBaseComponent('AreaChart', {
        props: {
            detailPopoverSize,
            hideLegend: props.hideLegend,
            hideFilter: props.hideFilter,
            fitHeight: props.fitHeight,
            xScaleType,
            yScaleType,
        },
    });
    return (React.createElement(InternalAreaChart, Object.assign({ height: height, xScaleType: xScaleType, yScaleType: yScaleType, statusType: statusType, detailPopoverSize: detailPopoverSize, i18nStrings: i18nStrings }, props, baseComponentProps)));
}
applyDisplayName(AreaChart, 'AreaChart');
export default AreaChart;
//# sourceMappingURL=index.js.map