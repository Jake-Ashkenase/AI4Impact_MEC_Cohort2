// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import { getCalendarMonth } from 'mnth';
import { normalizeStartOfWeek } from '../../internal/utils/locale/index.js';
export default function useCalendarGridRows({ baseDate, granularity, locale, startOfWeek, }) {
    const isMonthPicker = granularity === 'month';
    const rows = useMemo(() => isMonthPicker
        ? getCalendarYear(baseDate)
        : getCalendarMonth(baseDate, { firstDayOfWeek: normalizeStartOfWeek(startOfWeek, locale) }), [baseDate, isMonthPicker, startOfWeek, locale]);
    return rows;
}
// Returns a 3-by-4 matrix with dates corresponding to the initial date-time of each month of the year for a given date.
function getCalendarYear(date) {
    const year = date.getFullYear();
    return new Array(4)
        .fill(0)
        .map((_, i) => new Array(3).fill(0).map((_, j) => new Date(year, i * 3 + j)));
}
//# sourceMappingURL=use-calendar-grid-rows.js.map