import React from 'react';
export interface GetMenuItemPropsParams {
    disabled: boolean;
    parent?: boolean;
    expanded?: boolean;
}
/**
 * @returns attributes for a menuitem widget given parameters
 */
export declare const getMenuItemProps: (params: GetMenuItemPropsParams) => React.HTMLProps<HTMLElement>;
export interface GetMenuItemCheckboxPropsParams extends GetMenuItemPropsParams {
    checked: boolean;
}
export declare const getMenuItemCheckboxProps: (params: GetMenuItemCheckboxPropsParams) => React.HTMLProps<HTMLElement>;
//# sourceMappingURL=menu-item.d.ts.map