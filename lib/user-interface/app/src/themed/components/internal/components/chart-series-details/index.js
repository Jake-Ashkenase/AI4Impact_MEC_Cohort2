import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef, memo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import InternalExpandableSection from '../../../expandable-section/internal';
import { getBaseProps } from '../../base-component';
import { useMergeRefs } from '../../hooks/use-merge-refs';
import ChartSeriesMarker from '../chart-series-marker';
import getSeriesDetailsText from './series-details-text';
import styles from './styles.css.js';
export default memo(forwardRef(ChartSeriesDetails));
function ChartSeriesDetails(_a, ref) {
    var { details, expandedSeries, setPopoverText, setExpandedState, compactList } = _a, restProps = __rest(_a, ["details", "expandedSeries", "setPopoverText", "setExpandedState", "compactList"]);
    const baseProps = getBaseProps(restProps);
    const className = clsx(baseProps.className, styles.root);
    const detailsRef = useRef(null);
    const mergedRef = useMergeRefs(ref, detailsRef);
    // Once the component has rendered, pass its content in plain text
    // so that it can be used by screen readers.
    useEffect(() => {
        if (setPopoverText) {
            if (detailsRef.current) {
                setPopoverText(getSeriesDetailsText(detailsRef.current));
            }
            return () => {
                setPopoverText('');
            };
        }
    }, [details, setPopoverText]);
    const isExpanded = (seriesTitle) => !!expandedSeries && expandedSeries.has(seriesTitle);
    return (React.createElement("div", Object.assign({}, baseProps, { className: className, ref: mergedRef }),
        React.createElement("ul", { className: clsx(styles.list, compactList && styles.compact) }, details.map(({ key, value, markerType, color, isDimmed, subItems, expandableId }, index) => (React.createElement("li", { key: index, className: clsx({
                [styles.dimmed]: isDimmed,
                [styles['list-item']]: true,
                [styles['with-sub-items']]: subItems === null || subItems === void 0 ? void 0 : subItems.length,
                [styles.expandable]: !!expandableId,
            }) }, (subItems === null || subItems === void 0 ? void 0 : subItems.length) && !!expandableId ? (React.createElement(ExpandableSeries, { itemKey: key, value: value, markerType: markerType, color: color, subItems: subItems, expanded: isExpanded(expandableId), setExpandedState: state => setExpandedState && setExpandedState(expandableId, state) })) : (React.createElement(NonExpandableSeries, { itemKey: key, value: value, markerType: markerType, color: color, subItems: subItems }))))))));
}
function SubItems({ items, expandable, expanded, }) {
    return (React.createElement("ul", { className: clsx(styles['sub-items'], expandable && styles.expandable) }, items.map(({ key, value }, index) => (React.createElement("li", { key: index, className: clsx(styles['inner-list-item'], styles['key-value-pair'], (expanded || !expandable) && styles.announced) },
        React.createElement("span", { className: styles.key }, key),
        React.createElement("span", { className: styles.value }, value))))));
}
function ExpandableSeries({ itemKey, value, subItems, markerType, color, expanded, setExpandedState, }) {
    return (React.createElement("div", { className: styles['expandable-section'] },
        markerType && color && React.createElement(ChartSeriesMarker, { type: markerType, color: color }),
        React.createElement("div", { className: styles['full-width'] },
            React.createElement(InternalExpandableSection, { variant: "compact", headerText: itemKey, headerActions: React.createElement("span", { className: clsx(styles.value, styles.expandable) }, value), expanded: expanded, onChange: ({ detail }) => setExpandedState(detail.expanded) },
                React.createElement(SubItems, { items: subItems, expandable: true, expanded: expanded })))));
}
function NonExpandableSeries({ itemKey, value, subItems, markerType, color }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: clsx(styles['key-value-pair'], styles.announced) },
            React.createElement("div", { className: styles.key },
                markerType && color && React.createElement(ChartSeriesMarker, { type: markerType, color: color }),
                React.createElement("span", null, itemKey)),
            React.createElement("span", { className: styles.value }, value)),
        subItems && React.createElement(SubItems, { items: subItems })));
}
//# sourceMappingURL=index.js.map