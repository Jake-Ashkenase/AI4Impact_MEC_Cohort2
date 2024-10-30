import React from 'react';
import { BaseComponentProps } from '../../base-component';
import { BaseKeyDetail, CancelableEventHandler } from '../../events';
export interface ButtonTriggerProps extends BaseComponentProps {
    children?: React.ReactNode;
    pressed?: boolean;
    hideCaret?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    warning?: boolean;
    inFilteringToken?: 'root' | 'nested';
    inlineTokens?: boolean;
    ariaHasPopup?: 'true' | 'listbox' | 'dialog';
    ariaControls?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    onKeyDown?: CancelableEventHandler<BaseKeyDetail>;
    onKeyUp?: CancelableEventHandler<BaseKeyDetail>;
    onMouseDown?: CancelableEventHandler;
    onClick?: CancelableEventHandler;
    onFocus?: CancelableEventHandler;
    onBlur?: CancelableEventHandler<{
        relatedTarget: Node | null;
    }>;
    autoFocus?: boolean;
}
export declare namespace ButtonTriggerProps {
    interface Ref {
        focus(): void;
    }
}
declare const _default: React.ForwardRefExoticComponent<ButtonTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export default _default;
//# sourceMappingURL=index.d.ts.map