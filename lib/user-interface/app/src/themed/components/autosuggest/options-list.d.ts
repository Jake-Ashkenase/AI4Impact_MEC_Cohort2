import React from 'react';
import { AutosuggestProps } from './interfaces';
import { AutosuggestItemsHandlers, AutosuggestItemsState } from './options-controller';
export interface AutosuggestOptionsListProps extends Pick<AutosuggestProps, 'virtualScroll' | 'selectedAriaLabel' | 'renderHighlightedAriaLive'> {
    statusType: AutosuggestProps.StatusType;
    autosuggestItemsState: AutosuggestItemsState;
    autosuggestItemsHandlers: AutosuggestItemsHandlers;
    highlightedOptionId?: string;
    highlightText: string;
    listId: string;
    controlId: string;
    handleLoadMore: () => void;
    hasDropdownStatus?: boolean;
    listBottom?: React.ReactNode;
    ariaDescribedby?: string;
}
export default function AutosuggestOptionsList({ statusType, autosuggestItemsState, autosuggestItemsHandlers, highlightedOptionId, highlightText, listId, controlId, handleLoadMore, hasDropdownStatus, virtualScroll, selectedAriaLabel, renderHighlightedAriaLive, listBottom, ariaDescribedby, }: AutosuggestOptionsListProps): JSX.Element;
//# sourceMappingURL=options-list.d.ts.map