import React from 'react';
import { InternalPosition, Offset, PopoverProps } from './interfaces';
export default function usePopoverPosition({ popoverRef, bodyRef, arrowRef, trackRef, contentRef, allowScrollToFit, allowVerticalOverflow, preferredPosition, renderWithPortal, keepPosition, hideOnOverscroll, }: {
    popoverRef: React.RefObject<HTMLDivElement | null>;
    bodyRef: React.RefObject<HTMLDivElement | null>;
    arrowRef: React.RefObject<HTMLDivElement | null>;
    trackRef: React.RefObject<HTMLElement | SVGElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    allowScrollToFit?: boolean;
    allowVerticalOverflow?: boolean;
    preferredPosition: PopoverProps.Position;
    renderWithPortal?: boolean;
    keepPosition?: boolean;
    hideOnOverscroll?: boolean;
}): {
    updatePositionHandler: (onContentResize?: any) => void;
    popoverStyle: Partial<Offset>;
    internalPosition: InternalPosition | null;
    positionHandlerRef: React.MutableRefObject<() => void>;
    isOverscrolling: boolean;
};
//# sourceMappingURL=use-popover-position.d.ts.map