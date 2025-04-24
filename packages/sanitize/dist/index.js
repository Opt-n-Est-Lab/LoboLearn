/**
 * Recursively traverse an object and replace null bytes (\u0000) with the
 * literal string "\u0000". This produces a new object and does not modify the
 * provided object.
 *
 * @param value The object to be sanitized.
 * @return The sanitized object.
 */
export function sanitizeObject(value) {
    if (value === null) {
        return null;
    }
    else if (Array.isArray(value)) {
        return value.map(sanitizeObject);
    }
    else if (typeof value === 'string') {
        return value.replaceAll('\u0000', '\\u0000');
    }
    else if (typeof value === 'object') {
        const sanitized = Object.entries(value).map(([key, value]) => {
            return [key, sanitizeObject(value)];
        });
        return sanitized.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    }
    else {
        return value;
    }
}
/**
 * Escape special characters in a RegExp string
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
 *
 * @param str A literal string to act as a match for RegExp objects
 * @return A string literal ready to match
 */
export function escapeRegExp(str) {
    return str.replace(/[.*+\-?^${}()|[\]\\/]/g, '\\$&');
}
/**
 * Recursively truncates all strings in a value to a maximum length.
 */
export function recursivelyTruncateStrings(value, maxLength) {
    if (value === null) {
        return null;
    }
    else if (typeof value === 'string') {
        if (value.length <= maxLength) {
            return value;
        }
        return (value.substring(0, maxLength) + '...[truncated]');
    }
    else if (Array.isArray(value)) {
        return value.map((value) => recursivelyTruncateStrings(value, maxLength));
    }
    else if (typeof value === 'object') {
        return Object.entries(value).reduce((acc, [key, value]) => {
            acc[key] = recursivelyTruncateStrings(value, maxLength);
            return acc;
        }, {});
    }
    else {
        return value;
    }
}
//# sourceMappingURL=index.js.map