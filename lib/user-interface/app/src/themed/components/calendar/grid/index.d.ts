import React from 'react';
import { DatePickerProps } from '../../date-picker/interfaces';
import { CalendarProps } from '../interfaces';
/**
 * Calendar grid supports two mechanisms of keyboard navigation:
 * - Native screen-reader table navigation (semantic table markup);
 * - Keyboard arrow-keys navigation (a custom key-down handler).
 *
 * The implementation largely follows the w3 example (https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/datepicker-dialog) and shares the following issues:
 * - (table navigation) Chrome+VO - weekday is announced twice when navigating to the calendar's header;
 * - (table navigation) Safari+VO - "dimmed" state is announced twice;
 * - (table navigation) Firefox/Chrome+NVDA - cannot use table navigation if any cell has a focus;
 * - (keyboard navigation) Firefox+NVDA - every date is announced as "not selected";
 * - (keyboard navigation) Safari/Chrome+VO - weekdays are not announced;
 * - (keyboard navigation) Safari/Chrome+VO - dates are not announced as interactive (clickable or selectable);
 * - (keyboard navigation) Safari/Chrome+VO - date announcements are not interruptive and can be missed if navigating fast.
 */
export interface GridProps {
    isDateEnabled: DatePickerProps.IsDateEnabledFunction;
    dateDisabledReason: CalendarProps.DateDisabledReasonFunction;
    focusedDate: Date | null;
    focusableDate: Date | null;
    onSelectDate: (date: Date) => void;
    onFocusDate: (date: null | Date) => void;
    onChangePage: (date: Date) => void;
    selectedDate: Date | null;
    ariaLabelledby: string;
    header?: React.ReactNode;
    rows: ReadonlyArray<ReadonlyArray<Date>>;
    isCurrentPage: (date: Date) => boolean;
    renderDate: (date: Date) => string;
    renderDateAnnouncement: (date: Date, isOnCurrentDate: boolean) => string;
    isSameDate: (date: Date, baseDate: Date) => boolean;
    onGridKeyDownHandler: (event: React.KeyboardEvent<HTMLElement>) => void;
}
export default function Grid({ isDateEnabled, dateDisabledReason, focusedDate, focusableDate, onSelectDate, selectedDate, ariaLabelledby, header, rows, isCurrentPage, renderDate, renderDateAnnouncement, isSameDate, onGridKeyDownHandler, }: GridProps): JSX.Element;
//# sourceMappingURL=index.d.ts.map