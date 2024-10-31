/// <reference types="react" />
import { DropdownStatusProps } from '../internal/components/dropdown-status/interfaces.js';
import { NonCancelableEventHandler } from '../internal/events/index.js';
import { I18nStringsInternal } from './i18n-utils.js';
import { ComparisonOperator, GroupText, InternalFilteringOption, InternalFilteringProperty, InternalFreeTextFiltering, LoadItemsDetail } from './interfaces.js';
interface PropertyInputProps {
    asyncProps: null | DropdownStatusProps;
    customGroupsText: readonly GroupText[];
    freeTextFiltering: InternalFreeTextFiltering;
    filteringProperties: readonly InternalFilteringProperty[];
    i18nStrings: I18nStringsInternal;
    onChangePropertyKey: (propertyKey: undefined | string) => void;
    onLoadItems?: NonCancelableEventHandler<LoadItemsDetail>;
    property: null | InternalFilteringProperty;
}
export declare function PropertyInput({ property, onChangePropertyKey, asyncProps, filteringProperties, onLoadItems, customGroupsText, i18nStrings, freeTextFiltering, }: PropertyInputProps): JSX.Element;
interface OperatorInputProps {
    i18nStrings: I18nStringsInternal;
    onChangeOperator: (operator: ComparisonOperator) => void;
    operator: undefined | ComparisonOperator;
    property: null | InternalFilteringProperty;
    freeTextFiltering: InternalFreeTextFiltering;
    triggerVariant: 'option' | 'label';
}
export declare function OperatorInput({ property, operator, onChangeOperator, i18nStrings, freeTextFiltering, triggerVariant, }: OperatorInputProps): JSX.Element;
interface ValueInputProps {
    asyncProps: DropdownStatusProps;
    filteringOptions: readonly InternalFilteringOption[];
    i18nStrings: I18nStringsInternal;
    onChangeValue: (value: unknown) => void;
    onLoadItems?: NonCancelableEventHandler<LoadItemsDetail>;
    operator: undefined | ComparisonOperator;
    property: null | InternalFilteringProperty;
    value: unknown;
}
export declare function ValueInput(props: ValueInputProps): JSX.Element;
export {};
//# sourceMappingURL=token-editor-inputs.d.ts.map