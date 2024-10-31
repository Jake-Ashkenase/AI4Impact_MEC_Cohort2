import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import clsx from 'clsx';
import { convertAutoComplete } from '../input/utils';
import { getBaseProps } from '../internal/base-component';
import { useFormFieldContext } from '../internal/context/form-field-context';
import { fireKeyboardEvent, fireNonCancelableEvent } from '../internal/events';
import useForwardFocus from '../internal/hooks/forward-focus';
import useBaseComponent from '../internal/hooks/use-base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import styles from './styles.css.js';
const Textarea = React.forwardRef((_a, ref) => {
    var { value, autoComplete = true, disabled, readOnly, disableBrowserAutocorrect, disableBrowserSpellcheck, spellcheck, onKeyDown, onKeyUp, onChange, onBlur, onFocus, ariaRequired, name, rows, placeholder, autoFocus, ariaLabel } = _a, rest = __rest(_a, ["value", "autoComplete", "disabled", "readOnly", "disableBrowserAutocorrect", "disableBrowserSpellcheck", "spellcheck", "onKeyDown", "onKeyUp", "onChange", "onBlur", "onFocus", "ariaRequired", "name", "rows", "placeholder", "autoFocus", "ariaLabel"]);
    const { __internalRootRef } = useBaseComponent('Textarea', {
        props: { autoComplete, autoFocus, disableBrowserAutocorrect, disableBrowserSpellcheck, readOnly, spellcheck },
    });
    const { ariaLabelledby, ariaDescribedby, controlId, invalid, warning } = useFormFieldContext(rest);
    const baseProps = getBaseProps(rest);
    const textareaRef = useRef(null);
    useForwardFocus(ref, textareaRef);
    const attributes = {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        'aria-required': ariaRequired ? 'true' : undefined,
        'aria-invalid': invalid ? 'true' : undefined,
        name,
        placeholder,
        autoFocus,
        className: clsx(styles.textarea, {
            [styles['textarea-readonly']]: readOnly,
            [styles['textarea-invalid']]: invalid,
            [styles['textarea-warning']]: warning && !invalid,
        }),
        autoComplete: convertAutoComplete(autoComplete),
        spellCheck: spellcheck,
        disabled,
        readOnly: readOnly ? true : undefined,
        rows: rows || 3,
        onKeyDown: onKeyDown && (event => fireKeyboardEvent(onKeyDown, event)),
        onKeyUp: onKeyUp && (event => fireKeyboardEvent(onKeyUp, event)),
        // We set a default value on the component in order to force it into the controlled mode.
        value: value || '',
        onChange: onChange && (event => fireNonCancelableEvent(onChange, { value: event.target.value })),
        onBlur: onBlur && (() => fireNonCancelableEvent(onBlur)),
        onFocus: onFocus && (() => fireNonCancelableEvent(onFocus)),
    };
    if (disableBrowserAutocorrect) {
        attributes.autoCorrect = 'off';
        attributes.autoCapitalize = 'off';
    }
    if (disableBrowserSpellcheck) {
        attributes.spellCheck = 'false';
    }
    return (React.createElement("span", Object.assign({}, baseProps, { className: clsx(styles.root, baseProps.className), ref: __internalRootRef }),
        React.createElement("textarea", Object.assign({ ref: textareaRef, id: controlId }, attributes))));
});
applyDisplayName(Textarea, 'Textarea');
export default Textarea;
//# sourceMappingURL=index.js.map