// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { getAnalyticsMetadataAttribute } from '@cloudscape-design/component-toolkit/internal/analytics-metadata';
import useBaseComponent from '../internal/hooks/use-base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import InternalTextFilter from './internal';
const TextFilter = React.forwardRef((props, ref) => {
    const baseComponentProps = useBaseComponent('TextFilter', {
        props: { disabled: props.disabled, disableBrowserAutocorrect: props.disableBrowserAutocorrect },
    });
    const componentAnalyticsMetadata = {
        name: 'awsui.TextFilter',
        label: 'input',
        properties: {
            disabled: `${!!props.disabled}`,
        },
    };
    return (React.createElement(InternalTextFilter, Object.assign({}, props, baseComponentProps, { ref: ref }, getAnalyticsMetadataAttribute({ component: componentAnalyticsMetadata }))));
});
applyDisplayName(TextFilter, 'TextFilter');
export default TextFilter;
//# sourceMappingURL=index.js.map