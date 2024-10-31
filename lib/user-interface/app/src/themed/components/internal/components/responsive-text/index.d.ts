import React from 'react';
interface ResponsiveTextProps {
    x: number;
    y: number;
    className?: string;
    children: string;
    maxWidth: number;
}
declare const _default: React.MemoExoticComponent<typeof ResponsiveText>;
export default _default;
declare function ResponsiveText({ x, y, className, children, maxWidth }: ResponsiveTextProps): JSX.Element;
export declare function renderTextContent(textNode: SVGTextElement, text: string, maxWidth: number, isRtl: boolean): void;
//# sourceMappingURL=index.d.ts.map