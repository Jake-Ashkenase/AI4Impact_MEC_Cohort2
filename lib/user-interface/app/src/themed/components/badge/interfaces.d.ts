import React from 'react';
import { BaseComponentProps } from '../internal/base-component';
export interface BadgeProps extends BaseComponentProps {
    /**
     * Specifies the badge color.
     */
    color?: 'blue' | 'grey' | 'green' | 'red' | 'severity-critical' | 'severity-high' | 'severity-medium' | 'severity-low' | 'severity-neutral';
    /**
     * Text displayed inside the badge.
     */
    children?: React.ReactNode;
}
//# sourceMappingURL=interfaces.d.ts.map