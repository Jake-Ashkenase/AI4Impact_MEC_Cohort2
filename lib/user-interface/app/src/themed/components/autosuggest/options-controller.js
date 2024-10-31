// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { __rest } from "tslib";
import { useMemo, useState } from 'react';
import { warnOnce } from '@cloudscape-design/component-toolkit/internal';
import { useInternalI18n } from '../i18n/context';
import { generateTestIndexes } from '../internal/components/options-list/utils/test-indexes';
import { useHighlightedOption, } from '../internal/components/options-list/utils/use-highlight-option';
import { filterOptions } from './utils/utils';
const isHighlightable = (option) => {
    return !!option && option.type !== 'parent';
};
const isInteractive = (option) => !!option && !option.disabled && option.type !== 'parent';
export const useAutosuggestItems = ({ options, filterValue, filterText, filteringType, enteredTextLabel, hideEnteredTextLabel, onSelectItem, }) => {
    const i18n = useInternalI18n('autosuggest');
    const [showAll, setShowAll] = useState(false);
    const { items, getItemGroup, getItemParent } = useMemo(() => createItems(options), [options]);
    const enteredItemLabel = i18n('enteredTextLabel', enteredTextLabel === null || enteredTextLabel === void 0 ? void 0 : enteredTextLabel(filterValue), format => format({ value: filterValue }));
    if (!enteredItemLabel) {
        warnOnce('Autosuggest', 'A value for enteredTextLabel must be provided.');
    }
    const filteredItems = useMemo(() => {
        const filteredItems = filteringType === 'auto' && !showAll ? filterOptions(items, filterText) : [...items];
        if (filterValue && !hideEnteredTextLabel) {
            filteredItems.unshift({
                value: filterValue,
                type: 'use-entered',
                label: enteredItemLabel,
                option: { value: filterValue },
            });
        }
        generateTestIndexes(filteredItems, getItemParent);
        return filteredItems;
    }, [filteringType, showAll, items, filterText, filterValue, hideEnteredTextLabel, getItemParent, enteredItemLabel]);
    const [highlightedOptionState, highlightedOptionHandlers] = useHighlightedOption({
        options: filteredItems,
        isHighlightable,
    });
    const selectHighlightedOptionWithKeyboard = () => {
        var _a;
        if (highlightedOptionState.highlightedOption && !isInteractive(highlightedOptionState.highlightedOption)) {
            // skip selection when a non-interactive item is active
            return false;
        }
        onSelectItem((_a = highlightedOptionState.highlightedOption) !== null && _a !== void 0 ? _a : {
            // put use-entered item as a fallback
            value: filterValue,
            type: 'use-entered',
            option: { value: filterValue },
        });
        return true;
    };
    const highlightVisibleOptionWithMouse = (index) => {
        if (filteredItems[index] && isHighlightable(filteredItems[index])) {
            highlightedOptionHandlers.setHighlightedIndexWithMouse(index);
        }
    };
    const selectVisibleOptionWithMouse = (index) => {
        if (filteredItems[index] && isInteractive(filteredItems[index])) {
            onSelectItem(filteredItems[index]);
        }
    };
    return [
        Object.assign(Object.assign({}, highlightedOptionState), { items: filteredItems, showAll, getItemGroup }),
        Object.assign(Object.assign({}, highlightedOptionHandlers), { setShowAll,
            selectHighlightedOptionWithKeyboard,
            highlightVisibleOptionWithMouse,
            selectVisibleOptionWithMouse }),
    ];
};
function createItems(options) {
    const items = [];
    const itemToGroup = new WeakMap();
    const getItemParent = (item) => itemToGroup.get(item);
    const getItemGroup = (item) => { var _a; return (_a = getItemParent(item)) === null || _a === void 0 ? void 0 : _a.option; };
    for (const option of options) {
        if (isGroup(option)) {
            for (const item of flattenGroup(option)) {
                items.push(item);
            }
        }
        else {
            items.push(Object.assign(Object.assign({}, option), { option }));
        }
    }
    function flattenGroup(group) {
        const { options } = group, rest = __rest(group, ["options"]);
        let hasOnlyDisabledChildren = true;
        const groupItem = Object.assign(Object.assign({}, rest), { type: 'parent', option: group });
        const items = [groupItem];
        for (const option of options) {
            if (!option.disabled) {
                hasOnlyDisabledChildren = false;
            }
            const childOption = Object.assign(Object.assign({}, option), { type: 'child', disabled: option.disabled || rest.disabled, option });
            items.push(childOption);
            itemToGroup.set(childOption, groupItem);
        }
        items[0].disabled = items[0].disabled || hasOnlyDisabledChildren;
        return items;
    }
    return { items, getItemGroup, getItemParent };
}
function isGroup(optionOrGroup) {
    return 'options' in optionOrGroup;
}
//# sourceMappingURL=options-controller.js.map