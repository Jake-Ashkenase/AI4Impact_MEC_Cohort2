import { ComponentFormatFunction } from '../../i18n/context';
import { TableProps } from '../../table/interfaces';
import { S3ResourceSelectorProps } from '../interfaces';
export declare function includes<T>(array: ReadonlyArray<T> | undefined, item: T): boolean;
export declare const compareDates: (itemA: string | undefined, itemB: string | undefined) => number;
export declare function getColumnAriaLabel(i18n: ComponentFormatFunction<'s3-resource-selector'>, i18nStrings?: Pick<S3ResourceSelectorProps.I18nStrings, 'labelNotSorted' | 'labelSortedDescending' | 'labelSortedAscending'>, columnName?: string): ({ sorted, descending }: TableProps.LabelData) => string;
//# sourceMappingURL=table-utils.d.ts.map