import { __awaiter } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { useStableCallback } from '@cloudscape-design/component-toolkit/internal';
import { InternalButton } from '../../button/internal';
import InternalHeader from '../../header/internal';
import useForwardFocus from '../../internal/hooks/forward-focus';
import formatDateLocalized from '../../internal/utils/date-time/format-date-localized';
import InternalLiveRegion from '../../live-region/internal';
import InternalPagination from '../../pagination/internal';
import InternalSpaceBetween from '../../space-between/internal';
import InternalTable from '../../table/internal';
import InternalTextFilter from '../../text-filter/internal';
import { EmptyState } from './empty-state';
import styles from './styles.css.js';
export function getSharedI18Strings(i18n, i18nStrings) {
    return {
        filteringCounterText: i18n('i18nStrings.filteringCounterText', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.filteringCounterText, format => count => format({ count })),
        labelRefresh: i18n('i18nStrings.labelRefresh', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.labelRefresh),
        labelsPagination: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.labelsPagination,
        noMatchTitle: i18n('i18nStrings.filteringNoMatches', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.filteringNoMatches),
        noMatchSubtitle: i18n('i18nStrings.filteringCantFindMatch', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.filteringCantFindMatch),
        clearFilterButtonText: i18n('i18nStrings.clearFilterButtonText', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.clearFilterButtonText),
        filteringClearAriaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.labelClearFilter,
        lastUpdatedText: i18n('i18nStrings.modalLastUpdatedText', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.modalLastUpdatedText),
    };
}
export function BasicS3Table({ forwardFocusRef, columnDefinitions, fetchData, trackBy, i18nStrings = {}, isVisualRefresh, visibleColumns, isItemDisabled, onSelect, }) {
    var _a;
    const [loading, setLoading] = useState(false);
    const [allItems, setAllItems] = useState([]);
    const [lastUpdated, setLastUpdated] = useState();
    const textFilterRef = useRef(null);
    const onSelectLatest = useStableCallback(onSelect);
    function loadData() {
        setLoading(true);
        return fetchData()
            .then(items => {
            setAllItems(items);
            setLoading(false);
        })
            .catch(() => {
            // error handling should happen on the customer side, outside of this component
            setLoading(false);
        });
    }
    function reloadData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield loadData();
            setLastUpdated(new Date());
        });
    }
    useEffect(() => {
        loadData();
        // Data loading is only happening on initial render, or via refresh button
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useForwardFocus(forwardFocusRef, textFilterRef);
    const { items, filteredItemsCount, collectionProps, filterProps, paginationProps, actions } = useCollection(allItems, {
        selection: { trackBy },
        filtering: {
            empty: i18nStrings.emptyText,
            noMatch: (React.createElement(EmptyState, { title: i18nStrings.noMatchTitle, subtitle: i18nStrings.noMatchSubtitle, action: React.createElement(InternalButton, { onClick: () => actions.setFiltering('') }, i18nStrings.clearFilterButtonText) })),
        },
        pagination: {},
        sorting: {},
    });
    const selectedItem = (_a = collectionProps.selectedItems) === null || _a === void 0 ? void 0 : _a[0];
    // selectedItem can change internally inside the hook after pagination or filtering
    // useEffect will capture all possible changes
    useEffect(() => {
        onSelectLatest(selectedItem);
    }, [selectedItem, onSelectLatest]);
    return (React.createElement(InternalTable, Object.assign({ variant: isVisualRefresh ? 'borderless' : 'container' }, collectionProps, { header: React.createElement(InternalHeader, { variant: isVisualRefresh ? 'h3' : 'h2', headingTagOverride: 'h3', actions: React.createElement(InternalHeaderActions, { reloadData: reloadData, i18nStrings: i18nStrings, lastUpdated: lastUpdated }), counter: selectedItem ? `(1/${allItems.length})` : `(${allItems.length})` }, i18nStrings.header), trackBy: trackBy, filter: React.createElement(InternalTextFilter, Object.assign({}, filterProps, { ref: textFilterRef, filteringAriaLabel: i18nStrings.filteringAriaLabel, filteringClearAriaLabel: i18nStrings.filteringClearAriaLabel, filteringPlaceholder: i18nStrings.filteringPlaceholder, countText: i18nStrings.filteringCounterText ? i18nStrings.filteringCounterText(filteredItemsCount) : '' })), pagination: React.createElement(InternalPagination, Object.assign({}, paginationProps, { ariaLabels: i18nStrings.labelsPagination })), selectionType: "single", ariaLabels: i18nStrings.selectionLabels, loading: loading, loadingText: i18nStrings.loadingText, items: items, visibleColumns: visibleColumns, isItemDisabled: isItemDisabled, columnDefinitions: columnDefinitions, enableKeyboardNavigation: true })));
}
export function InternalHeaderActions({ i18nStrings, reloadData, lastUpdated }) {
    function getLastUpdated() {
        if (!lastUpdated || !i18nStrings.lastUpdatedText) {
            return null;
        }
        const formattedDate = formatDateLocalized({
            date: lastUpdated.toString(),
            isDateOnly: false,
        });
        return (React.createElement("div", { className: styles['last-updated-caption'] },
            i18nStrings.lastUpdatedText,
            React.createElement("br", null),
            formattedDate,
            React.createElement(InternalLiveRegion, { tagName: "span", sources: [i18nStrings.lastUpdatedText, formattedDate] })));
    }
    return (React.createElement(InternalSpaceBetween, { size: "s", direction: "horizontal", alignItems: "center" },
        getLastUpdated(),
        React.createElement(InternalButton, { iconName: "refresh", ariaLabel: i18nStrings.labelRefresh, onClick: reloadData })));
}
//# sourceMappingURL=basic-table.js.map