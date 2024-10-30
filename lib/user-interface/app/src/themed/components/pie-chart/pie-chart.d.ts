import React from 'react';
import { PieArcDatum } from 'd3-shape';
import { SomeRequired } from '../internal/types';
import { PieChartProps, SeriesInfo } from './interfaces';
export interface InternalChartDatum<T> {
    index: number;
    color: string;
    datum: Readonly<T>;
}
interface InternalPieChartProps<T extends PieChartProps.Datum> extends SomeRequired<Omit<PieChartProps<T>, 'onHighlightChange' | 'statusType'>, 'variant' | 'size' | 'i18nStrings' | 'hideTitles' | 'hideDescriptions'> {
    width: number;
    height: number;
    highlightedSegment: T | null;
    onHighlightChange: (segment: null | T) => void;
    legendSegment: T | null;
    pieData: PieArcDatum<InternalChartDatum<T>>[];
    dataSum: number;
}
export interface PopoverData<T> {
    datum: T;
    trackRef: React.RefObject<SVGElement>;
    series: SeriesInfo;
}
declare const _default: <T extends PieChartProps.Datum>({ fitHeight, height: explicitHeight, variant, size, width, i18nStrings, ariaLabel, ariaLabelledby, ariaDescription, innerMetricValue, innerMetricDescription, hideTitles, hideDescriptions, detailPopoverContent, detailPopoverSize, detailPopoverFooter, segmentDescription, highlightedSegment, onHighlightChange, legendSegment, pieData, dataSum, }: InternalPieChartProps<T>) => JSX.Element;
export default _default;
//# sourceMappingURL=pie-chart.d.ts.map