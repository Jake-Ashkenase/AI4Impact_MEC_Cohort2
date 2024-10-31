export type FunnelType = 'single-page' | 'multi-page' | 'modal';
export type FlowType = 'create' | 'edit' | 'delete' | 'home' | 'dashboard' | 'view-resource';
export interface AnalyticsMetadata {
    instanceIdentifier?: string;
    flowType?: FlowType;
    errorContext?: string;
    resourceType?: string;
}
export interface BaseFunnelProps {
    funnelIdentifier?: string;
    funnelInteractionId: string;
    currentDocument?: Document;
}
export interface FunnelErrorProps extends BaseFunnelProps {
    funnelErrorContext?: string;
}
export interface FunnelStartProps extends Omit<BaseFunnelProps, 'funnelInteractionId'> {
    flowType?: FlowType;
    resourceType?: string;
    funnelName: string;
    funnelNameSelector: string;
    totalFunnelSteps: number;
    optionalStepNumbers: number[];
    stepConfiguration?: StepConfiguration[];
    funnelType: FunnelType;
    funnelVersion: string;
    componentVersion: string;
    componentTheme: string;
    funnelInteractionId?: string;
}
export type FunnelMethod<T extends BaseFunnelProps> = (props: T) => void;
export interface TableInteractionProps {
    interactionTime: number;
    userAction: string;
    instanceIdentifier?: string;
    componentIdentifier?: string;
    noOfResourcesInTable?: number;
    interactionMetadata?: string;
}
export type TableInteractionMethod = (props: TableInteractionProps) => void;
export type FunnelStartMethod = (props: FunnelStartProps) => string;
export interface FunnelStepProps extends BaseFunnelProps {
    stepIdentifier?: string;
    stepNumber: number;
    stepName?: string | undefined;
    stepNameSelector?: string;
    subStepAllSelector: string;
    totalSubSteps?: number;
    subStepConfiguration?: SubStepConfiguration[];
}
export interface FunnelStepNavigationProps extends FunnelStepProps {
    destinationStepNumber: number;
    navigationType: string;
    totalSubSteps?: number;
}
export interface FunnelStepErrorProps extends FunnelStepProps {
    stepErrorContext?: string;
    stepErrorSelector: string;
}
export interface FunnelSubStepProps extends FunnelStepProps {
    subStepIdentifier?: string;
    subStepSelector: string;
    subStepName?: string | undefined;
    subStepNameSelector: string;
    subStepNumber?: number;
}
export interface FunnelSubStepErrorProps extends FunnelSubStepProps {
    subStepErrorContext?: string;
    fieldIdentifier?: string;
    fieldErrorContext?: string;
    fieldLabelSelector: string;
    fieldErrorSelector: string;
}
export interface OptionalFunnelSubStepErrorProps extends FunnelSubStepProps {
    subStepErrorContext?: string;
    fieldIdentifier?: string;
    fieldErrorContext?: string;
    fieldLabelSelector?: string;
    fieldErrorSelector?: string;
}
export interface FunnelLinkInteractionProps extends FunnelSubStepProps {
    elementSelector: string;
}
export interface FunnelChangeProps extends BaseFunnelProps {
    stepConfiguration: StepConfiguration[];
}
export interface StepConfiguration {
    number: number;
    name: string;
    isOptional: boolean;
    stepIdentifier?: string;
}
export interface SubStepConfiguration {
    number: number;
    name: string;
    subStepIdentifier?: string;
}
export interface IFunnelMetrics {
    funnelStart: FunnelStartMethod;
    funnelError: FunnelMethod<FunnelErrorProps>;
    funnelComplete: FunnelMethod<BaseFunnelProps>;
    funnelSuccessful: FunnelMethod<BaseFunnelProps>;
    funnelCancelled: FunnelMethod<BaseFunnelProps>;
    funnelChange: FunnelMethod<FunnelChangeProps>;
    funnelStepStart: FunnelMethod<FunnelStepProps>;
    funnelStepComplete: FunnelMethod<FunnelStepProps>;
    funnelStepNavigation: FunnelMethod<FunnelStepNavigationProps>;
    funnelStepError: FunnelMethod<FunnelStepErrorProps>;
    funnelStepChange: FunnelMethod<FunnelStepProps>;
    funnelSubStepStart: FunnelMethod<FunnelSubStepProps>;
    funnelSubStepComplete: FunnelMethod<FunnelSubStepProps>;
    funnelSubStepError: FunnelMethod<OptionalFunnelSubStepErrorProps>;
    helpPanelInteracted: FunnelMethod<FunnelLinkInteractionProps>;
    externalLinkInteracted: FunnelMethod<FunnelLinkInteractionProps>;
}
export interface TaskCompletionDataProps {
    timeToRespondAfterFormSubmit: number;
    taskInteractionId: string;
    taskIdentifier?: string;
    taskFlowType?: string;
    taskType?: FunnelType;
    completionMetadata?: string;
}
export type TaskCompletionDataMethod = (props: TaskCompletionDataProps) => void;
export interface IPerformanceMetrics {
    tableInteraction: TableInteractionMethod;
    taskCompletionData: TaskCompletionDataMethod;
    modalPerformanceData: ModalPerformanceDataMethod;
}
type JSONValue = string | number | boolean | null | undefined;
export interface JSONObject {
    [key: string]: JSONObject | JSONValue;
}
export interface ComponentMountedProps {
    componentName: string;
    taskInteractionId?: string;
    componentConfiguration: JSONObject;
}
export interface ComponentUpdatedProps extends ComponentMountedProps {
    taskInteractionId: string;
    actionType: string;
}
export type ComponentMountedMethod = (props: ComponentMountedProps) => string;
export type ComponentUpdatedMethod = (props: ComponentUpdatedProps) => void;
export interface IComponentMetrics {
    componentMounted: ComponentMountedMethod;
    componentUpdated: ComponentUpdatedMethod;
}
export interface ModalPerformanceDataProps {
    timeToContentReadyInModal: number;
    instanceIdentifier?: string;
    componentIdentifier?: string;
    modalMetadata?: string;
}
export type ModalPerformanceDataMethod = (props: ModalPerformanceDataProps) => void;
export {};
//# sourceMappingURL=interfaces.d.ts.map