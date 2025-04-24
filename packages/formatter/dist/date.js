import keyBy from 'lodash/keyBy.js';
/**
 * Format a date to a human-readable string like '2020-03-27T12:34:56 (CDT)'.
 *
 * @param date The date to format.
 * @param timeZone The time zone to use for formatting.
 * @param param2.includeTz Whether to include the time zone in the output (default true).
 * @param param2.longTz Whether to use the long time zone name (default false).
 * @returns Human-readable string representing the date.
 */
export function formatDate(date, timeZone, { includeTz = true, longTz = false, includeMs = false, } = {}) {
    const options = {
        timeZone,
        hourCycle: 'h23',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: includeMs ? 3 : undefined,
        timeZoneName: longTz ? 'long' : 'short',
    };
    const parts = keyBy(new Intl.DateTimeFormat('en-US', options).formatToParts(date), (x) => x.type);
    let dateFormatted = `${parts.year.value}-${parts.month.value}-${parts.day.value} ${parts.hour.value}:${parts.minute.value}:${parts.second.value}`;
    if (includeMs) {
        dateFormatted = `${dateFormatted}.${parts.fractionalSecond.value}`;
    }
    if (includeTz) {
        dateFormatted = `${dateFormatted} (${parts.timeZoneName.value})`;
    }
    return dateFormatted;
}
/**
 * Format a date to a human-readable string like '2020-03-27'.
 *
 * @param date The date to format.
 * @param timeZone The time zone to use for formatting.
 * @returns Human-readable string representing the date.
 */
export function formatDateYMD(date, timeZone) {
    const options = {
        timeZone,
        hourCycle: 'h23',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    const parts = keyBy(new Intl.DateTimeFormat('en-US', options).formatToParts(date), (x) => x.type);
    return `${parts.year.value}-${parts.month.value}-${parts.day.value}`;
}
/**
 * Format a date to a human-readable string like '2020-03-27 14:27'.
 *
 * @param date The date to format.
 * @param timeZone The time zone to use for formatting.
 * @returns Human-readable string representing the date.
 */
export function formatDateYMDHM(date, timeZone) {
    const options = {
        timeZone,
        hourCycle: 'h23',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    const parts = keyBy(new Intl.DateTimeFormat('en-US', options).formatToParts(date), (x) => x.type);
    return `${parts.year.value}-${parts.month.value}-${parts.day.value} ${parts.hour.value}:${parts.minute.value}`;
}
//# sourceMappingURL=date.js.map