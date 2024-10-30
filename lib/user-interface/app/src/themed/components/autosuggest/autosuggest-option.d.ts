import React from 'react';
import { BaseComponentProps } from '../internal/base-component';
import { HighlightType } from '../internal/components/options-list/utils/use-highlight-option';
import { AutosuggestItem } from './interfaces';
export interface AutosuggestOptionProps extends BaseComponentProps {
    nativeAttributes?: React.HTMLAttributes<HTMLDivElement>;
    highlightText: string;
    option: AutosuggestItem;
    highlighted: boolean;
    highlightType: HighlightType;
    current: boolean;
    virtualPosition?: number;
    padBottom?: boolean;
    screenReaderContent?: string;
    ariaSetsize?: number;
    ariaPosinset?: number;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<AutosuggestOptionProps & React.RefAttributes<HTMLDivElement>>>;
export default _default;
//# sourceMappingURL=autosuggest-option.d.ts.map