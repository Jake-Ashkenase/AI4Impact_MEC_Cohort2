/// <reference types="react" />
/**
 * This function returns an object that needs to be spread onto the same
 * element as the `elementRef`, so that the data attribute is applied
 * correctly.
 */
export declare function usePerformanceMarks(name: string, enabled: boolean, elementRef: React.RefObject<HTMLElement>, getDetails: () => Record<string, string | boolean | number | undefined>, dependencies: React.DependencyList): {
    [x: string]: string | undefined;
};
//# sourceMappingURL=index.d.ts.map