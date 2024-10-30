import { BoundingBox, Dimensions, InternalPosition, PopoverProps, Rect } from '../interfaces';
interface CalculatedPosition {
    scrollable?: boolean;
    internalPosition: InternalPosition;
    rect: BoundingBox;
}
export declare const PRIORITY_MAPPING: Record<PopoverProps.Position, InternalPosition[]>;
/**
 * Returns the area of the intersection of passed in rectangles or a null, if there is no intersection
 */
export declare function intersectRectangles(rectangles: BoundingBox[]): number | null;
/**
 * A functions that returns the correct popover position based on screen dimensions.
 */
export declare function calculatePosition({ preferredPosition, fixedInternalPosition, trigger, arrow, body, container, viewport, renderWithPortal, allowVerticalOverflow, }: {
    preferredPosition: PopoverProps.Position;
    fixedInternalPosition?: InternalPosition;
    trigger: BoundingBox;
    arrow: Dimensions;
    body: Dimensions;
    container: BoundingBox;
    viewport: BoundingBox;
    renderWithPortal?: boolean;
    allowVerticalOverflow?: boolean;
}): CalculatedPosition;
export declare function getOffsetDimensions(element: HTMLElement): {
    offsetHeight: number;
    offsetWidth: number;
};
export declare function getDimensions(element: HTMLElement): {
    inlineSize: number;
    blockSize: number;
};
export declare function isCenterOutside(child: Rect, parent: Rect): boolean;
export {};
//# sourceMappingURL=positions.d.ts.map