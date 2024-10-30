import React from 'react';
import { DropdownStatusProps } from '../internal/components/dropdown-status';
import { SomeRequired } from '../internal/types';
import { SelectListProps } from '../select/parts/plain-list';
import { TokenGroupProps } from '../token-group/interfaces';
import { MultiselectProps } from './interfaces';
type UseMultiselectOptions = SomeRequired<Pick<MultiselectProps, 'options' | 'selectedOptions' | 'filteringType' | 'filteringResultsText' | 'disabled' | 'noMatch' | 'renderHighlightedAriaLive' | 'deselectAriaLabel' | 'keepOpen' | 'onBlur' | 'onFocus' | 'onLoadItems' | 'onChange' | 'selectedAriaLabel'> & DropdownStatusProps & {
    controlId?: string;
    ariaLabelId: string;
    footerId: string;
    filteringValue: string;
    setFilteringValue?: (value: string) => void;
    externalRef: React.Ref<MultiselectProps.Ref>;
}, 'options' | 'selectedOptions' | 'filteringType' | 'statusType' | 'keepOpen'> & {
    embedded?: boolean;
};
export declare function useMultiselect({ options, filteringType, filteringResultsText, disabled, statusType, empty, loadingText, finishedText, errorText, noMatch, renderHighlightedAriaLive, selectedOptions, deselectAriaLabel, keepOpen, onBlur, onFocus, onLoadItems, onChange, controlId, ariaLabelId, footerId, filteringValue, setFilteringValue, externalRef, embedded, ...restProps }: UseMultiselectOptions): {
    isOpen: boolean;
    tokens: readonly TokenGroupProps.Item[];
    announcement: string;
    dropdownStatus: import("../internal/components/dropdown-status").DropdownStatusResult;
    filteringValue: string;
    filteredOptions: readonly import("../internal/components/option/interfaces").DropdownOption[];
    highlightType: import("../internal/components/options-list/utils/use-highlight-option").HighlightType;
    scrollToIndex: React.RefObject<SelectListProps.SelectListRef>;
    getFilterProps: () => Partial<import("../select/parts/filter").FilterProps>;
    getTriggerProps: (disabled?: boolean, autoFocus?: boolean) => import("../select/utils/use-select").SelectTriggerProps;
    getMenuProps: () => {
        onLoadMore: () => void;
        ariaLabelledby: string | undefined;
        ariaDescribedby: string | undefined;
        embedded: boolean | undefined;
        open?: boolean | undefined;
        position?: import("csstype").Property.Position | undefined;
        className?: string | undefined;
        id?: string | undefined;
        role?: "listbox" | "menu" | "list" | undefined;
        onFocus?: import("../internal/events").NonCancelableEventHandler<{}> | undefined;
        onBlur?: import("../internal/events").NonCancelableEventHandler<{
            relatedTarget: Node | null;
        }> | undefined;
        onKeyDown?: import("../internal/events").CancelableEventHandler<import("../internal/events").BaseKeyDetail> | undefined;
        onMouseMove?: ((itemIndex: number) => void) | undefined;
        onMouseUp?: ((itemIndex: number) => void) | undefined;
        ariaLabel?: string | undefined;
        statusType: DropdownStatusProps.StatusType;
        nativeAttributes?: Record<string, any> | undefined;
        decreaseBlockMargin?: boolean | undefined;
        ref: React.RefObject<HTMLUListElement>;
    };
    getOptionProps: (option: import("../internal/components/option/interfaces").DropdownOption, index: number) => any;
    getTokenProps: () => {
        onDismiss: import("../internal/events").NonCancelableEventHandler<TokenGroupProps.DismissDetail>;
    };
    getDropdownProps: () => {
        onMouseDown: (event: React.MouseEvent) => void;
        onFocus?: import("../internal/events").NonCancelableEventHandler<Pick<React.FocusEvent<Element, Element>, "target" | "relatedTarget">> | undefined;
        onBlur?: import("../internal/events").NonCancelableEventHandler<Pick<React.FocusEvent<Element, Element>, "target" | "relatedTarget">> | undefined;
        dropdownContentId?: string | undefined;
        dropdownContentRole?: string | undefined;
    };
    getWrapperProps: () => {
        onKeyDown: (event: React.KeyboardEvent<Element>) => void;
    };
};
export {};
//# sourceMappingURL=use-multiselect.d.ts.map