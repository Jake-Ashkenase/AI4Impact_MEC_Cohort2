const DEFAULT_CHAR_REGEX = /^([\p{L}\p{Z}\p{N}_.:/=+\-@]*)$/u;
const SYSTEM_TAG_PREFIX = 'aws:';
const MAX_KEY_LENGTH = 128;
const MAX_VALUE_LENGTH = 256;
export function validate(tags, keyDirtyState, i18n, i18nStrings, charRegex = DEFAULT_CHAR_REGEX) {
    // Create cache to use for duplicate key check
    const tagKeysCache = {};
    tags.forEach(tag => {
        var _a;
        if (tag.key && !tag.markedForRemoval) {
            tagKeysCache[tag.key] = ((_a = tagKeysCache[tag.key]) !== null && _a !== void 0 ? _a : 0) + 1;
        }
    });
    return tags.map((tag, i) => {
        let keyError, valueError;
        if (keyDirtyState[i] && emptyKeyCheck(tag.key)) {
            keyError = i18n('i18nStrings.emptyKeyError', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.emptyKeyError);
        }
        else if (awsPrefixCheck(tag.key)) {
            keyError = i18n('i18nStrings.awsPrefixError', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.awsPrefixError);
        }
        else if (invalidCharCheck(tag.key, charRegex)) {
            keyError = i18n('i18nStrings.invalidKeyError', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.invalidKeyError);
        }
        else if (maxKeyLengthCheck(tag.key)) {
            keyError = i18n('i18nStrings.maxKeyCharLengthError', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.maxKeyCharLengthError);
        }
        else if (duplicateKeyCheck(tag.key, tagKeysCache)) {
            keyError = i18n('i18nStrings.duplicateKeyError', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.duplicateKeyError);
        }
        if (!tag.markedForRemoval) {
            if (invalidCharCheck(tag.value, charRegex)) {
                valueError = i18n('i18nStrings.invalidValueError', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.invalidValueError);
            }
            else if (maxValueLengthCheck(tag.value)) {
                valueError = i18n('i18nStrings.maxValueCharLengthError', i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.maxValueCharLengthError);
            }
        }
        if (keyError || valueError) {
            return { key: keyError, value: valueError };
        }
    });
}
export const awsPrefixCheck = (value) => {
    return value.toLowerCase().indexOf(SYSTEM_TAG_PREFIX) === 0;
};
export const emptyKeyCheck = (value) => {
    return !value || value.trim().length === 0;
};
export const maxKeyLengthCheck = (value) => {
    return value && value.length > MAX_KEY_LENGTH;
};
export const duplicateKeyCheck = (value, keyCache) => {
    var _a;
    return ((_a = keyCache === null || keyCache === void 0 ? void 0 : keyCache[value]) !== null && _a !== void 0 ? _a : 0) > 1;
};
export const maxValueLengthCheck = (value) => {
    return value && value.length > MAX_VALUE_LENGTH;
};
export const invalidCharCheck = (value, validCharRegex = DEFAULT_CHAR_REGEX) => {
    // Empty values are valid
    if (!value || !validCharRegex) {
        return false;
    }
    return !validCharRegex.test(value);
};
//# sourceMappingURL=validation.js.map