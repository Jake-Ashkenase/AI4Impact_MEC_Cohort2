import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { warnOnce } from '@cloudscape-design/component-toolkit/internal';
import { copyAnalyticsMetadataAttribute } from '@cloudscape-design/component-toolkit/internal/analytics-metadata';
import InternalGrid from '../grid/internal';
import { useInternalI18n } from '../i18n/context';
import InternalIcon from '../icon/internal';
import { FunnelMetrics } from '../internal/analytics';
import { useFunnel, useFunnelStep, useFunnelSubStep } from '../internal/analytics/hooks/use-funnel';
import { DATA_ATTR_FIELD_ERROR, DATA_ATTR_FIELD_LABEL, getFieldSlotSeletor, getSubStepAllSelector, getTextFromSelector, } from '../internal/analytics/selectors';
import { getBaseProps } from '../internal/base-component';
import { FormFieldContext, useFormFieldContext } from '../internal/context/form-field-context';
import { InfoLinkLabelContext } from '../internal/context/info-link-label-context';
import { useUniqueId } from '../internal/hooks/use-unique-id';
import { useVisualRefresh } from '../internal/hooks/use-visual-mode';
import { joinStrings } from '../internal/utils/strings';
import InternalLiveRegion from '../live-region/internal';
import { getAriaDescribedBy, getGridDefinition, getSlotIds } from './util';
import analyticsSelectors from './analytics-metadata/styles.css.js';
import styles from './styles.css.js';
export function FormFieldError({ id, children, errorIconAriaLabel }) {
    const i18n = useInternalI18n('form-field');
    const contentRef = useRef(null);
    const i18nErrorIconAriaLabel = i18n('i18nStrings.errorIconAriaLabel', errorIconAriaLabel);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: id, className: styles.error },
            React.createElement("div", { className: styles['error-icon-shake-wrapper'] },
                React.createElement("div", { role: "img", "aria-label": i18nErrorIconAriaLabel, className: styles['error-icon-scale-wrapper'] },
                    React.createElement(InternalIcon, { name: "status-negative", size: "small" }))),
            React.createElement("span", { className: styles.error__message, ref: contentRef }, children)),
        React.createElement(InternalLiveRegion, { assertive: true, tagName: "span", sources: [i18nErrorIconAriaLabel, contentRef] })));
}
export function FormFieldWarning({ id, children, warningIconAriaLabel }) {
    const i18n = useInternalI18n('form-field');
    const contentRef = useRef(null);
    const i18nWarningIconAriaLabel = i18n('i18nStrings.warningIconAriaLabel', warningIconAriaLabel);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: id, className: styles.warning },
            React.createElement("div", { className: styles['warning-icon-shake-wrapper'] },
                React.createElement("div", { role: "img", "aria-label": i18nWarningIconAriaLabel, className: styles['warning-icon-scale-wrapper'] },
                    React.createElement(InternalIcon, { name: "status-warning", size: "small" }))),
            React.createElement("span", { className: styles.warning__message, ref: contentRef }, children)),
        React.createElement(InternalLiveRegion, { assertive: true, tagName: "span", sources: [i18nWarningIconAriaLabel, contentRef] })));
}
export function ConstraintText({ id, hasValidationText, children, }) {
    return (React.createElement("div", { id: id, className: clsx(styles.constraint, hasValidationText && styles['constraint-has-validation-text']) }, children));
}
export default function InternalFormField(_a) {
    var { controlId, stretch = false, label, info, i18nStrings, children, secondaryControl, description, constraintText, errorText, warningText, __hideLabel, __internalRootRef = null, __disableGutters = false, __analyticsMetadata = undefined } = _a, rest = __rest(_a, ["controlId", "stretch", "label", "info", "i18nStrings", "children", "secondaryControl", "description", "constraintText", "errorText", "warningText", "__hideLabel", "__internalRootRef", "__disableGutters", "__analyticsMetadata"]);
    const baseProps = getBaseProps(rest);
    const isRefresh = useVisualRefresh();
    const instanceUniqueId = useUniqueId('formField');
    const generatedControlId = controlId || instanceUniqueId;
    const formFieldId = controlId || generatedControlId;
    const { funnelIdentifier, funnelInteractionId, submissionAttempt, funnelState, errorCount } = useFunnel();
    const { stepIdentifier, stepNumber, stepNameSelector } = useFunnelStep();
    const { subStepErrorContext, subStepIdentifier, subStepSelector, subStepNameSelector } = useFunnelSubStep();
    const showWarning = warningText && !errorText;
    if (warningText && errorText) {
        warnOnce('FileUpload', 'Both `errorText` and `warningText` exist. `warningText` will not be shown.');
    }
    const slotIds = getSlotIds(formFieldId, label, description, constraintText, errorText, showWarning ? warningText : undefined);
    const ariaDescribedBy = getAriaDescribedBy(slotIds);
    const gridDefinition = getGridDefinition(stretch, !!secondaryControl, isRefresh);
    const { ariaLabelledby: parentAriaLabelledby, ariaDescribedby: parentAriaDescribedby, invalid: parentInvalid, warning: parentWarning, } = useFormFieldContext({});
    const contextValuesWithoutControlId = {
        ariaLabelledby: joinStrings(parentAriaLabelledby, slotIds.label) || undefined,
        ariaDescribedby: joinStrings(parentAriaDescribedby, ariaDescribedBy) || undefined,
        invalid: !!errorText || !!parentInvalid,
        warning: (!!warningText && !errorText) || (!!parentWarning && !parentInvalid),
    };
    const analyticsAttributes = {
        [DATA_ATTR_FIELD_LABEL]: slotIds.label ? getFieldSlotSeletor(slotIds.label) : undefined,
        [DATA_ATTR_FIELD_ERROR]: slotIds.error ? getFieldSlotSeletor(slotIds.error) : undefined,
    };
    useEffect(() => {
        var _a, _b, _c;
        if (funnelInteractionId && errorText && funnelState.current !== 'complete') {
            const stepName = getTextFromSelector(stepNameSelector);
            const subStepName = getTextFromSelector(subStepNameSelector);
            errorCount.current++;
            // We don't want to report an error if it is hidden, e.g. inside an Expandable Section.
            const errorIsVisible = ((_c = (_b = (_a = __internalRootRef === null || __internalRootRef === void 0 ? void 0 : __internalRootRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) === null || _b === void 0 ? void 0 : _b.width) !== null && _c !== void 0 ? _c : 0) > 0;
            if (errorIsVisible) {
                FunnelMetrics.funnelSubStepError({
                    funnelInteractionId,
                    funnelIdentifier,
                    subStepSelector,
                    subStepName,
                    subStepNameSelector,
                    subStepIdentifier,
                    stepNumber,
                    stepName,
                    stepNameSelector,
                    stepIdentifier,
                    subStepErrorContext,
                    fieldErrorSelector: `${getFieldSlotSeletor(slotIds.error)} .${styles.error__message}`,
                    fieldLabelSelector: getFieldSlotSeletor(slotIds.label),
                    subStepAllSelector: getSubStepAllSelector(),
                    fieldIdentifier: __analyticsMetadata === null || __analyticsMetadata === void 0 ? void 0 : __analyticsMetadata.instanceIdentifier,
                    fieldErrorContext: __analyticsMetadata === null || __analyticsMetadata === void 0 ? void 0 : __analyticsMetadata.errorContext,
                });
            }
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                errorCount.current--;
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [funnelInteractionId, errorText, submissionAttempt, errorCount]);
    return (React.createElement("div", Object.assign({}, baseProps, { className: clsx(baseProps.className, styles.root), ref: __internalRootRef }, analyticsAttributes, copyAnalyticsMetadataAttribute(rest)),
        React.createElement("div", { className: clsx(styles['label-wrapper'], __hideLabel && styles['visually-hidden']) },
            label && (React.createElement("label", { className: clsx(styles.label, analyticsSelectors.label), id: slotIds.label, htmlFor: generatedControlId }, label)),
            React.createElement(InfoLinkLabelContext.Provider, { value: slotIds.label }, !__hideLabel && info && React.createElement("span", { className: styles.info }, info))),
        description && (React.createElement("div", { className: styles.description, id: slotIds.description }, description)),
        React.createElement("div", { className: clsx(styles.controls, __hideLabel && styles['label-hidden']) },
            React.createElement(InternalGrid, { gridDefinition: gridDefinition, disableGutters: __disableGutters },
                React.createElement(FormFieldContext.Provider, { value: Object.assign({ controlId: generatedControlId }, contextValuesWithoutControlId) }, children && React.createElement("div", { className: styles.control }, children)),
                secondaryControl && (React.createElement(FormFieldContext.Provider, { value: contextValuesWithoutControlId },
                    React.createElement("div", { className: styles['secondary-control'] }, secondaryControl))))),
        (constraintText || errorText || warningText) && (React.createElement("div", { className: styles.hints },
            errorText && (React.createElement(FormFieldError, { id: slotIds.error, errorIconAriaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.errorIconAriaLabel }, errorText)),
            showWarning && (React.createElement(FormFieldWarning, { id: slotIds.warning, warningIconAriaLabel: i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.warningIconAriaLabel }, warningText)),
            constraintText && (React.createElement(ConstraintText, { id: slotIds.constraint, hasValidationText: !!errorText || !!warningText }, constraintText))))));
}
//# sourceMappingURL=internal.js.map