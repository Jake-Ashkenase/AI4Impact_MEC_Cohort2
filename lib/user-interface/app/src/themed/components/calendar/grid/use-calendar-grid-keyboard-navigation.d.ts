import React from 'react';
import { CalendarProps } from '../interfaces';
export default function useCalendarGridKeyboardNavigation({ baseDate, focusableDate, granularity, isDateEnabled, isDateFocusable, onChangePage, onFocusDate, onSelectDate, }: {
    baseDate: Date;
    focusableDate: Date | null;
    granularity: CalendarProps.Granularity;
    isDateEnabled: CalendarProps.IsDateEnabledFunction;
    isDateFocusable: CalendarProps.IsDateEnabledFunction;
    onChangePage: (date: Date) => void;
    onFocusDate: (date: null | Date) => void;
    onSelectDate: (date: Date) => void;
}): (event: React.KeyboardEvent<HTMLElement>) => void;
//# sourceMappingURL=use-calendar-grid-keyboard-navigation.d.ts.map