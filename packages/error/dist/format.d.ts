/**
 * Recursively formats an error into a string. Correctly handles both the
 * `.cause` property and `AggregateError` instances.
 */
export declare function formatErrorStack(err: any, depth?: number, prefix?: string): string;
/**
 * This is a version of {@link formatErrorStack} that won't error in the case
 * of an unexpected error object. We'll use the original function if it works,
 * but if it fails for any reason, we'll just return the plain stack, whatever
 * it might be.
 */
export declare function formatErrorStackSafe(err: any): string;
