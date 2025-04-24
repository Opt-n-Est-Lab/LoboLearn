import { z } from 'zod';
/**
 * A Zod schema for a boolean from a single checkbox input in the body
 * parameters from a form. This will return a boolean with a value of `true` if
 * the checkbox is checked (the input is present) and `false` if it is not
 * checked.
 */
export declare const BooleanFromCheckboxSchema: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean, string | undefined>;
/**
 * A Zod schema for a PostgreSQL ID.
 *
 * We store IDs as BIGINT in PostgreSQL, which are passed to JavaScript as
 * either strings (if the ID is fetched directly) or numbers (if passed via
 * `to_jsonb()`). This schema coerces the ID to a string to ensure consistent
 * handling.
 *
 * The `refine` step is important to ensure that the thing we've coerced to a
 * string is actually a number. If it's not, we want to fail quickly.
 */
export declare const IdSchema: z.ZodEffects<z.ZodString, string, string>;
/**
 * A Zod schema for a PostgreSQL interval.
 *
 * This handles two representations of an interval:
 *
 * - A string like "1 year 2 days", which is how intervals will be represented
 *   if they go through `to_jsonb` in a query.
 * - A {@link PostgresIntervalSchema} object, which is what we'll get if a
 *   query directly returns an interval column. The interval will already be
 *   parsed by `postgres-interval` by way of `pg-types`.
 *
 * In either case, we convert the interval to a number of milliseconds.
 */
export declare const IntervalSchema: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
    years: z.ZodDefault<z.ZodNumber>;
    months: z.ZodDefault<z.ZodNumber>;
    days: z.ZodDefault<z.ZodNumber>;
    hours: z.ZodDefault<z.ZodNumber>;
    minutes: z.ZodDefault<z.ZodNumber>;
    seconds: z.ZodDefault<z.ZodNumber>;
    milliseconds: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}, {
    years?: number | undefined;
    months?: number | undefined;
    days?: number | undefined;
    hours?: number | undefined;
    minutes?: number | undefined;
    seconds?: number | undefined;
    milliseconds?: number | undefined;
}>]>, number, string | {
    years?: number | undefined;
    months?: number | undefined;
    days?: number | undefined;
    hours?: number | undefined;
    minutes?: number | undefined;
    seconds?: number | undefined;
    milliseconds?: number | undefined;
}>;
/**
 * A Zod schema for a date string in ISO format.
 *
 * Accepts either a string or a Date object. If a string is passed, it is
 * validated and parsed as an ISO date string.
 *
 * Useful for parsing dates from JSON, which are always strings.
 */
export declare const DateFromISOString: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, string | Date, string | Date>, Date, string | Date>;
