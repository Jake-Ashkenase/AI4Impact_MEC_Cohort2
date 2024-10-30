import React from 'react';
export interface SharedReactContextsApiInternal {
    createContext: <T>(ReactInstance: typeof React, contextName: string) => React.Context<T | undefined>;
}
export declare class SharedReactContexts {
    #private;
    createContext: <T>(ReactInstance: typeof React, contextName: string) => React.Context<any>;
    installInternal(internalApi?: Partial<SharedReactContextsApiInternal>): SharedReactContextsApiInternal;
}
//# sourceMappingURL=shared-react-contexts.d.ts.map