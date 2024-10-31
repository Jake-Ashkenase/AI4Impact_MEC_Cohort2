/// <reference types="react" />
import { TableBodyCellProps } from './index';
interface DisabledInlineEditorProps<ItemType> extends TableBodyCellProps<ItemType> {
    editDisabledReason: string;
}
export declare function DisabledInlineEditor<ItemType>({ className, item, column, ariaLabels, isEditing, onEditStart, onEditEnd, editDisabledReason, isVisualRefresh, interactiveCell, resizableColumns, ...rest }: DisabledInlineEditorProps<ItemType>): JSX.Element;
export {};
//# sourceMappingURL=disabled-inline-editor.d.ts.map