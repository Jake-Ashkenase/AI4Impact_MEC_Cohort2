type ChangeCallback<T> = (props: T | null) => void;
type RegistrationCallback = (isRegistered: boolean) => void;
export interface BreadcrumbsGlobalRegistration<T> {
    update(props: T): void;
    cleanup(): void;
}
export interface BreadcrumbsApiInternal<T> {
    registerAppLayout: (changeCallback: ChangeCallback<T>) => (() => void) | void;
    registerBreadcrumbs: (props: T, onRegistered: RegistrationCallback) => BreadcrumbsGlobalRegistration<T>;
    getStateForTesting: () => {
        appLayoutUpdateCallback: ChangeCallback<T> | null;
        breadcrumbInstances: Array<{
            props: T;
        }>;
        breadcrumbRegistrations: Array<RegistrationCallback>;
    };
}
export declare class BreadcrumbsController<T> {
    #private;
    registerAppLayout: (changeCallback: ChangeCallback<T>) => (() => void) | undefined;
    registerBreadcrumbs: (props: T, onRegistered: RegistrationCallback) => BreadcrumbsGlobalRegistration<T>;
    getStateForTesting: () => {
        appLayoutUpdateCallback: ChangeCallback<T> | null;
        breadcrumbInstances: {
            props: T;
        }[];
        breadcrumbRegistrations: RegistrationCallback[];
    };
    installInternal(internalApi?: Partial<BreadcrumbsApiInternal<T>>): BreadcrumbsApiInternal<T>;
}
export {};
//# sourceMappingURL=breadcrumbs.d.ts.map