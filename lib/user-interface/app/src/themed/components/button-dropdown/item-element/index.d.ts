/// <reference types="react" />
import { ItemProps } from '../interfaces';
import { ButtonDropdownProps } from '../interfaces';
declare const ItemElement: ({ position, item, disabled, onItemActivate, highlighted, highlightItem, showDivider, hasCategoryHeader, isKeyboardHighlighted, analyticsMetadataTransformer, variant, linkStyle, }: ItemProps) => JSX.Element;
export type InternalItemProps = ButtonDropdownProps.Item & {
    badge?: boolean;
};
export type InternalCheckboxItemProps = ButtonDropdownProps.CheckboxItem & {
    badge?: boolean;
};
export default ItemElement;
//# sourceMappingURL=index.d.ts.map