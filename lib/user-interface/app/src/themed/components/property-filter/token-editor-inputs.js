// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import InternalAutosuggest from '../autosuggest/internal.js';
import InternalMultiselect from '../multiselect/internal.js';
import InternalSelect from '../select/internal.js';
import { getAllowedOperators, getPropertySuggestions } from './controller.js';
import { operatorToDescription } from './i18n-utils.js';
import { useLoadItems } from './use-load-items.js';
import styles from './styles.css.js';
export function PropertyInput({ property, onChangePropertyKey, asyncProps, filteringProperties, onLoadItems, customGroupsText, i18nStrings, freeTextFiltering, }) {
    var _a;
    const propertySelectHandlers = useLoadItems(onLoadItems);
    const asyncPropertySelectProps = asyncProps ? Object.assign(Object.assign({}, asyncProps), propertySelectHandlers) : {};
    const propertyOptions = getPropertySuggestions(filteringProperties, customGroupsText, i18nStrings, ({ propertyKey, propertyLabel }) => ({
        value: propertyKey,
        label: propertyLabel,
        dontCloseOnSelect: true,
    }));
    const allPropertiesOption = {
        label: i18nStrings.allPropertiesLabel,
        value: undefined,
    };
    if (!freeTextFiltering.disabled) {
        propertyOptions.unshift(allPropertiesOption);
    }
    return (React.createElement(InternalSelect, Object.assign({ options: propertyOptions, selectedOption: property
            ? {
                value: (_a = property.propertyKey) !== null && _a !== void 0 ? _a : undefined,
                label: property.propertyLabel,
            }
            : allPropertiesOption, onChange: e => onChangePropertyKey(e.detail.selectedOption.value) }, asyncPropertySelectProps)));
}
export function OperatorInput({ property, operator, onChangeOperator, i18nStrings, freeTextFiltering, triggerVariant, }) {
    const operatorOptions = (property ? getAllowedOperators(property) : freeTextFiltering.operators).map(operator => ({
        value: operator,
        label: operator,
        description: operatorToDescription(operator, i18nStrings),
    }));
    return (React.createElement(InternalSelect, { options: operatorOptions, triggerVariant: triggerVariant, selectedOption: operator
            ? {
                value: operator,
                label: operator,
                description: operatorToDescription(operator, i18nStrings),
            }
            : null, onChange: e => onChangeOperator(e.detail.selectedOption.value) }));
}
export function ValueInput(props) {
    const { property, operator, value, onChangeValue } = props;
    const OperatorForm = (property === null || property === void 0 ? void 0 : property.propertyKey) && operator && (property === null || property === void 0 ? void 0 : property.getValueFormRenderer(operator));
    if (OperatorForm) {
        return React.createElement(OperatorForm, { value: value, onChange: onChangeValue, operator: operator });
    }
    if (property && operator && property.getTokenType(operator) === 'enum') {
        return React.createElement(ValueInputEnum, Object.assign({}, props, { property: property, operator: operator }));
    }
    return React.createElement(ValueInputAuto, Object.assign({}, props));
}
function ValueInputAuto({ property, operator, value, onChangeValue, asyncProps, filteringOptions, onLoadItems, i18nStrings, }) {
    var _a, _b;
    const valueOptions = property
        ? filteringOptions
            .filter(option => { var _a; return ((_a = option.property) === null || _a === void 0 ? void 0 : _a.propertyKey) === property.propertyKey; })
            .map(({ label, value }) => ({ label, value }))
        : [];
    const valueFilter = typeof value === 'string' ? value : '';
    const valueAutosuggestHandlers = useLoadItems(onLoadItems, '', property === null || property === void 0 ? void 0 : property.externalProperty, valueFilter, operator);
    const asyncValueAutosuggestProps = (property === null || property === void 0 ? void 0 : property.propertyKey)
        ? Object.assign(Object.assign({}, valueAutosuggestHandlers), asyncProps) : { empty: asyncProps.empty };
    const [matchedOption] = valueOptions.filter(option => option.value === value);
    return (React.createElement(InternalAutosuggest, Object.assign({ enteredTextLabel: i18nStrings.enteredTextLabel, value: (_b = (_a = matchedOption === null || matchedOption === void 0 ? void 0 : matchedOption.label) !== null && _a !== void 0 ? _a : value) !== null && _b !== void 0 ? _b : '', clearAriaLabel: i18nStrings.clearAriaLabel, onChange: e => onChangeValue(e.detail.value), disabled: !operator, options: valueOptions }, asyncValueAutosuggestProps, { virtualScroll: true })));
}
function ValueInputEnum({ property, operator, value: unknownValue, onChangeValue, asyncProps, filteringOptions, onLoadItems, }) {
    const valueOptions = filteringOptions
        .filter(option => { var _a; return ((_a = option.property) === null || _a === void 0 ? void 0 : _a.propertyKey) === property.propertyKey; })
        .map(({ label, value }) => ({ label, value }));
    const valueAutosuggestHandlers = useLoadItems(onLoadItems, '', property.externalProperty, undefined, operator);
    const asyncValueAutosuggestProps = Object.assign(Object.assign({ statusType: 'finished' }, valueAutosuggestHandlers), asyncProps);
    const value = !unknownValue ? [] : Array.isArray(unknownValue) ? unknownValue : [unknownValue];
    const selectedOptions = valueOptions.filter(option => value.includes(option.value));
    return (React.createElement("div", { className: styles['token-editor-multiselect-wrapper'] },
        React.createElement("div", { className: styles['token-editor-multiselect-wrapper-inner'] },
            React.createElement(InternalMultiselect, Object.assign({ filteringType: "auto", selectedOptions: selectedOptions, onChange: e => onChangeValue(e.detail.selectedOptions.map(o => o.value)), options: valueOptions.length > 0 ? [{ options: valueOptions, label: property.groupValuesLabel }] : [] }, asyncValueAutosuggestProps, { inlineTokens: true, hideTokens: true, keepOpen: true })))));
}
//# sourceMappingURL=token-editor-inputs.js.map