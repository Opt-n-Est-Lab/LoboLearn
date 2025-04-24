/**
 * Format a date to a human-readable string like '2020-03-27T12:34:56 (CDT)'.
 *
 * @param date The date to format.
 * @param timeZone The time zone to use for formatting.
 * @param param2.includeTz Whether to include the time zone in the output (default true).
 * @param param2.longTz Whether to use the long time zone name (default false).
 * @returns Human-readable string representing the date.
 */
export declare function formatDate(date: Date, timeZone: string, { includeTz, longTz, includeMs, }?: {
    includeTz?: boolean;
    longTz?: boolean;
    includeMs?: boolean;
}): string;
/**
 * Format a date to a human-readable string like '2020-03-27'.
 *
 * @param date The date to format.
 * @param timeZone The time zone to use for formatting.
 * @returns Human-readable string representing the date.
 */
export declare function formatDateYMD(date: Date, timeZone: string): string;
/**
 * Format a date to a human-readable string like '2020-03-27 14:27'.
 *
 * @param date The date to format.
 * @param timeZone The time zone to use for formatting.
 * @returns Human-readable string representing the date.
 */
export declare function formatDateYMDHM(date: Date, timeZone: string): string;
