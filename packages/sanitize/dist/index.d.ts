/**
 * Recursively traverse an object and replace null bytes (\u0000) with the
 * literal string "\u0000". This produces a new object and does not modify the
 * provided object.
 *
 * @param value The object to be sanitized.
 * @return The sanitized object.
 */
export declare function sanitizeObject<T>(value: T): T;
/**
 * Escape special characters in a RegExp string
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
 *
 * @param str A literal string to act as a match for RegExp objects
 * @return A string literal ready to match
 */
export declare function escapeRegExp(str: string): string;
/**
 * Recursively truncates all strings in a value to a maximum length.
 */
export declare function recursivelyTruncateStrings<T>(value: T, maxLength: number): T;
