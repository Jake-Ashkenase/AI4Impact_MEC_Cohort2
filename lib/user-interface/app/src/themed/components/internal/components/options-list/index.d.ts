import React from 'react';
import { BaseComponentProps } from '../../base-component';
import { BaseKeyDetail, CancelableEventHandler, NonCancelableEventHandler } from '../../events';
import { DropdownStatusProps } from '../dropdown-status';
export interface OptionsListProps extends BaseComponentProps {
    open?: boolean;
    statusType: DropdownStatusProps.StatusType;
    /**
     * Options list
     */
    children: React.ReactNode;
    nativeAttributes?: Record<string, any>;
    /**
     * Called when more items need to be loaded.
     */
    onLoadMore?: NonCancelableEventHandler;
    onKeyDown?: CancelableEventHandler<BaseKeyDetail>;
    onBlur?: NonCancelableEventHandler<{
        relatedTarget: Node | null;
    }>;
    onFocus?: NonCancelableEventHandler;
    onMouseUp?: (itemIndex: number) => void;
    onMouseMove?: (itemIndex: number) => void;
    position?: React.CSSProperties['position'];
    role?: 'listbox' | 'list' | 'menu';
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    decreaseBlockMargin?: boolean;
    embedded?: boolean;
}
declare const _default: React.ForwardRefExoticComponent<OptionsListProps & React.RefAttributes<HTMLUListElement>>;
export default _default;
//# sourceMappingURL=index.d.ts.map