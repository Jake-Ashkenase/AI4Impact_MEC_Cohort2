/// <reference types="react" />
import { ChartDataTypes } from '../../../mixed-line-bar-chart/interfaces';
import { ChartScale, NumericChartScale } from './scales';
interface LabelsMeasureProps {
    scale: ChartScale | NumericChartScale;
    ticks: readonly ChartDataTypes[];
    tickFormatter?: (value: ChartDataTypes) => string;
    autoWidth: (value: number) => void;
    maxLabelsWidth?: number;
}
declare const _default: typeof LabelsMeasure;
export default _default;
declare function LabelsMeasure({ scale, ticks, tickFormatter, autoWidth, maxLabelsWidth }: LabelsMeasureProps): JSX.Element;
//# sourceMappingURL=labels-measure.d.ts.map