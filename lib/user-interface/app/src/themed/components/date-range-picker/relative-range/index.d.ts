/// <reference types="react" />
import { DateRangePickerProps } from '../interfaces';
export interface RelativeRangePickerProps {
    dateOnly: boolean;
    options: ReadonlyArray<DateRangePickerProps.RelativeOption>;
    initialSelection: DateRangePickerProps.RelativeValue | null;
    onChange: (range: DateRangePickerProps.RelativeValue) => void;
    i18nStrings?: DateRangePickerProps.I18nStrings;
    isSingleGrid: boolean;
    customUnits?: DateRangePickerProps.TimeUnit[];
}
export default function RelativeRangePicker({ dateOnly, options: clientOptions, initialSelection: initialRange, onChange: onChangeRangeSize, i18nStrings, isSingleGrid, customUnits, }: RelativeRangePickerProps): JSX.Element;
//# sourceMappingURL=index.d.ts.map