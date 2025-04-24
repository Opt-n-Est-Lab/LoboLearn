export declare const SECOND_IN_MILLISECONDS = 1000;
export declare const MINUTE_IN_MILLISECONDS: number;
export declare const HOUR_IN_MILLISECONDS: number;
export declare const DAY_IN_MILLISECONDS: number;
/**
 * Format an interval (in milliseconds) to a human-readable string like '3 h 40 m'.
 *
 * @param interval Time interval in milliseconds.
 * @returns Human-readable string representing the interval.
 */
export declare function formatInterval(interval: number): string;
