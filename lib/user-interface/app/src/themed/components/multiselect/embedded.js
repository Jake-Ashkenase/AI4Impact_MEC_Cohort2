import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useFormFieldContext } from '../contexts/form-field';
import DropdownFooter from '../internal/components/dropdown-footer';
import ScreenreaderOnly from '../internal/components/screenreader-only';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import PlainList from '../select/parts/plain-list';
import VirtualList from '../select/parts/virtual-list';
import { useMultiselect } from './use-multiselect';
import styles from './styles.css.js';
const EmbeddedMultiselect = React.forwardRef((_a, externalRef) => {
    var { options, filteringType, ariaLabel, selectedOptions, deselectAriaLabel, virtualScroll, filteringText = '' } = _a, restProps = __rest(_a, ["options", "filteringType", "ariaLabel", "selectedOptions", "deselectAriaLabel", "virtualScroll", "filteringText"]);
    const formFieldContext = useFormFieldContext(restProps);
    const ariaLabelId = useUniqueId('multiselect-ariaLabel-');
    const footerId = useUniqueId('multiselect-footer-');
    const multiselectProps = useMultiselect(Object.assign({ options,
        selectedOptions,
        filteringType, disabled: false, deselectAriaLabel, controlId: formFieldContext.controlId, ariaLabelId,
        footerId, filteringValue: filteringText, externalRef, keepOpen: true, embedded: true }, restProps));
    const ListComponent = virtualScroll ? VirtualList : PlainList;
    const status = multiselectProps.dropdownStatus;
    return (React.createElement("div", { className: styles.embedded },
        React.createElement(ListComponent, { menuProps: multiselectProps.getMenuProps(), getOptionProps: multiselectProps.getOptionProps, filteredOptions: multiselectProps.filteredOptions, filteringValue: filteringText, ref: multiselectProps.scrollToIndex, hasDropdownStatus: status.content !== null, checkboxes: true, useInteractiveGroups: true, screenReaderContent: multiselectProps.announcement, highlightType: multiselectProps.highlightType }),
        status.content && React.createElement(DropdownFooter, { content: status.content, id: footerId }),
        React.createElement(ScreenreaderOnly, { id: ariaLabelId }, ariaLabel)));
});
export default EmbeddedMultiselect;
//# sourceMappingURL=embedded.js.map