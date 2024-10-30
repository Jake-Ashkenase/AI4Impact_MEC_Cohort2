/**
 * The controller that manages a single live region container. It has a timer
 * to make sure announcements are throttled correctly. It can also make sure
 * that a message is announced again even if it matches the previous content
 * of the live region.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
 */
export declare class LiveRegionController {
    readonly politeness: 'polite' | 'assertive';
    readonly delay: number;
    /**
     * The default delay for announcements when no delay is explicitly provided.
     * During internal unit testing, you can import this and explicitly set it to
     * 0 to make the live region update the DOM without waiting for a timer.
     */
    static defaultDelay: number;
    private _element;
    private _timeoutId;
    private _lastAnnouncement;
    private _addedTerminalPeriod;
    private _nextAnnouncement;
    constructor(politeness: 'polite' | 'assertive', delay?: number);
    /**
     * Reset the state of the controller and clear any active announcements.
     */
    destroy(): void;
    announce({ message, forceReannounce }: {
        message?: string;
        delay?: number;
        forceReannounce?: boolean;
    }): void;
    private _updateElement;
}
//# sourceMappingURL=controller.d.ts.map