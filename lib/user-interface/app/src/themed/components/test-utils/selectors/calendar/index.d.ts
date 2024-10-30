import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/selectors";
import ButtonWrapper from '../button';
export declare class CalendarDateWrapper extends ComponentWrapper {
    findDisabledReason(): ElementWrapper;
}
export default class CalendarWrapper extends ComponentWrapper {
    static rootSelector: string;
    /**
     * Returns a date container on the calendar.
     *
     * @param row 1-based row index of the day or month.
     * @param column 1-based column index of the day or month.
     */
    findDateAt(row: number, column: number): CalendarDateWrapper;
    findHeader(): ElementWrapper;
    /**
     * Alias for findPreviousButton for compatibility with previous versions
     * @deprecated
     */
    findPreviousMonthButton(): ButtonWrapper;
    /**
     * Alias for findNextButton for compatibility with previous versions
     * @deprecated
     */
    findNextMonthButton(): ButtonWrapper;
    findPreviousButton(): ButtonWrapper;
    findNextButton(): ButtonWrapper;
    findSelectedDate(): ElementWrapper;
}
