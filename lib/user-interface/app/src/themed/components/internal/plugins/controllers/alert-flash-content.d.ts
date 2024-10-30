import { ReactNode } from 'react';
interface RefShim<T> {
    current: T | null;
}
export interface AlertFlashContentContext {
    type: string;
    headerRef: RefShim<HTMLElement>;
    contentRef: RefShim<HTMLElement>;
}
interface AlertFlashContentInitialContext {
    type: string;
    header?: ReactNode;
    content?: ReactNode;
}
export type ReplacementType = 'original' | 'remove' | 'replaced';
export interface ReplacementApi {
    hideHeader(): void;
    restoreHeader(): void;
    replaceHeader(replacer: (container: HTMLElement) => void): void;
    hideContent(): void;
    restoreContent(): void;
    replaceContent(replacer: (container: HTMLElement) => void): void;
}
export interface AlertFlashContentResult {
    update: () => void;
    unmount: (containers: {
        replacementHeaderContainer: HTMLElement;
        replacementContentContainer: HTMLElement;
    }) => void;
}
export interface AlertFlashContentConfig {
    id: string;
    runReplacer: (context: AlertFlashContentContext, replacementApi: ReplacementApi) => AlertFlashContentResult;
    initialCheck?: (context: AlertFlashContentInitialContext) => boolean;
}
export type AlertFlashContentRegistrationListener = (provider: AlertFlashContentConfig) => () => void;
export interface AlertFlashContentApiPublic {
    registerContentReplacer(config: AlertFlashContentConfig): void;
}
export interface AlertFlashContentApiInternal {
    clearRegisteredReplacer(): void;
    onContentRegistered(listener: AlertFlashContentRegistrationListener): () => void;
    initialCheck(context: AlertFlashContentInitialContext): boolean;
}
export declare class AlertFlashContentController {
    #private;
    registerContentReplacer: (content: AlertFlashContentConfig) => void;
    clearRegisteredReplacer: () => void;
    initialCheck: (context: AlertFlashContentInitialContext) => boolean;
    onContentRegistered: (listener: AlertFlashContentRegistrationListener) => () => void;
    installPublic(api?: Partial<AlertFlashContentApiPublic>): AlertFlashContentApiPublic;
    installInternal(internalApi?: Partial<AlertFlashContentApiInternal>): AlertFlashContentApiInternal;
}
export {};
//# sourceMappingURL=alert-flash-content.d.ts.map