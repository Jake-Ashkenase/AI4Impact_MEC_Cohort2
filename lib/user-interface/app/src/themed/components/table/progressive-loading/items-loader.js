// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { warnOnce } from '@cloudscape-design/component-toolkit/internal';
import InternalLiveRegion from '../../live-region/internal';
import { applyTrackBy } from '../utils';
import styles from './styles.css.js';
export function ItemsLoader({ item, loadingStatus, renderLoaderPending, renderLoaderLoading, renderLoaderError, trackBy, }) {
    let content = null;
    if (loadingStatus === 'pending' && renderLoaderPending) {
        content = renderLoaderPending({ item });
    }
    else if (loadingStatus === 'loading' && renderLoaderLoading) {
        content = React.createElement(InternalLiveRegion, { tagName: "span" }, renderLoaderLoading({ item }));
    }
    else if (loadingStatus === 'error' && renderLoaderError) {
        content = React.createElement(InternalLiveRegion, { tagName: "span" }, renderLoaderError({ item }));
    }
    else {
        warnOnce('Table', 'Must define `renderLoaderPending`, `renderLoaderLoading`, or `renderLoaderError` when using corresponding loading status.');
    }
    let parentTrackId = item && trackBy ? applyTrackBy(trackBy, item) : undefined;
    parentTrackId = typeof parentTrackId === 'string' ? parentTrackId : undefined;
    return (React.createElement("div", { "data-root": item ? 'false' : 'true', "data-parentrow": parentTrackId, className: styles['items-loader'] }, content));
}
//# sourceMappingURL=items-loader.js.map