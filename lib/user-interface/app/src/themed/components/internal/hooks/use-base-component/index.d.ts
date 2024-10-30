import { MutableRefObject } from 'react';
import { ComponentConfiguration } from '@cloudscape-design/component-toolkit/internal';
import { AnalyticsMetadata } from '../../analytics/interfaces';
export interface InternalBaseComponentProps<T = any> {
    __internalRootRef?: MutableRefObject<T | null> | null;
}
/**
 * This hook is used for components which are exported to customers. The returned __internalRootRef needs to be
 * attached to the (internal) component's root DOM node. The hook takes care of attaching the metadata to this
 * root DOM node and emits the telemetry for this component.
 */
export default function useBaseComponent<T = any>(componentName: string, config?: ComponentConfiguration, analyticsMetadata?: AnalyticsMetadata): {
    __internalRootRef: import("react").RefObject<T>;
};
//# sourceMappingURL=index.d.ts.map