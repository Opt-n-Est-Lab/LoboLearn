import pg, { type QueryResult } from 'pg';
import Cursor from 'pg-cursor';
import { z } from 'zod';
export type QueryParams = Record<string, any> | any[];
export interface CursorIterator<T> {
    iterate: (batchSize: number) => AsyncGenerator<T[]>;
    stream: (batchSize: number) => NodeJS.ReadWriteStream;
}
export interface PostgresPoolConfig extends pg.PoolConfig {
    errorOnUnusedParameters?: boolean;
}
export declare class PostgresError extends Error {
    data: Record<string, any>;
    constructor(message: string, data: Record<string, any>);
}
export declare class PostgresPool {
    /** The pool from which clients will be acquired. */
    private pool;
    /**
     * We use this to propagate the client associated with the current transaction
     * to any nested queries. In the past, we had some nasty bugs associated with
     * the fact that we tried to acquire new clients inside of transactions, which
     * ultimately lead to a deadlock.
     */
    private alsClient;
    private searchSchema;
    /** Tracks the total number of queries executed by this pool. */
    private _queryCount;
    private errorOnUnusedParameters;
    /**
     * Creates a new connection pool and attempts to connect to the database.
     */
    initAsync(pgConfig: PostgresPoolConfig, idleErrorHandler: (error: Error, client: pg.PoolClient) => void): Promise<void>;
    /**
     * Creates a new connection pool and attempts to connect to the database.
     */
    init: (arg1: PostgresPoolConfig, arg2: (error: Error, client: pg.PoolClient) => void, callback: (err: NodeJS.ErrnoException) => void) => void;
    /**
     * Closes the connection pool.
     */
    closeAsync(): Promise<void>;
    /**
     * Closes the connection pool.
     */
    close: (callback: (err: NodeJS.ErrnoException) => void) => void;
    /**
     * Gets a new client from the connection pool. If `err` is not null
     * then `client` and `done` are undefined. If `err` is null then
     * `client` is valid and can be used. The caller MUST call `done()` to
     * release the client, whether or not errors occurred while using
     * `client`. The client can call `done(truthy_value)` to force
     * destruction of the client, but this should not be used except in
     * unusual circumstances.
     */
    getClientAsync(): Promise<pg.PoolClient>;
    /**
     * Gets a new client from the connection pool.
     */
    getClient(callback: (error: Error | null, client?: pg.PoolClient, done?: () => void) => void): void;
    /**
     * Performs a query with the given client.
     */
    queryWithClientAsync(client: pg.PoolClient, sql: string, params: QueryParams): Promise<pg.QueryResult>;
    /**
     * Performs a query with the given client.
     */
    queryWithClient: (arg1: pg.PoolClient, arg2: string, arg3: QueryParams, callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Performs a query with the given client. Errors if the query returns more
     * than one row.
     */
    queryWithClientOneRowAsync(client: pg.PoolClient, sql: string, params: QueryParams): Promise<pg.QueryResult>;
    /**
     * Performs a query with the given client. Errors if the query returns more
     * than one row.
     */
    queryWithClientOneRow: (arg1: pg.PoolClient, arg2: string, arg3: QueryParams, callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Performs a query with the given client. Errors if the query returns more
     * than one row.
     */
    queryWithClientZeroOrOneRowAsync(client: pg.PoolClient, sql: string, params: QueryParams): Promise<QueryResult>;
    /**
     * Performs a query with the given client. Errors if the query returns more
     * than one row.
     */
    queryWithClientZeroOrOneRow: (arg1: pg.PoolClient, arg2: string, arg3: QueryParams, callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Rolls back the current transaction for the given client.
     */
    rollbackWithClientAsync(client: pg.PoolClient): Promise<void>;
    /**
     * Rolls back the current transaction for the given client.
     */
    rollbackWithClient(client: pg.PoolClient, _done: (release?: any) => void, callback: (err: Error | null) => void): void;
    /**
     * Begins a new transaction.
     */
    beginTransactionAsync(): Promise<pg.PoolClient>;
    /**
     * Commits the transaction if err is null, otherwise rollbacks the transaction.
     * Also releases the client.
     */
    endTransactionAsync(client: pg.PoolClient, err: Error | null | undefined): Promise<void>;
    /**
     * Commits the transaction if err is null, otherwise rollbacks the transaction.
     * Also releases the client.
     */
    endTransaction(client: pg.PoolClient, _done: (rollback?: any) => void, err: Error | null | undefined, callback: (error: Error | null) => void): void;
    /**
     * Runs the specified function inside of a transaction. The function will
     * receive a database client as an argument, but it can also make queries
     * as usual, and the correct client will be used automatically.
     *
     * The transaction will be rolled back if the function throws an error, and
     * will be committed otherwise.
     */
    runInTransactionAsync<T>(fn: (client: pg.PoolClient) => Promise<T>): Promise<T>;
    /**
     * Executes a query with the specified parameters.
     */
    queryAsync(sql: string, params: QueryParams): Promise<QueryResult>;
    /**
     * Executes a query with the specified parameters.
     */
    query: (arg1: string, arg2: QueryParams, callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Executes a query with the specified parameters. Errors if the query does
     * not return exactly one row.
     */
    queryOneRowAsync(sql: string, params: QueryParams): Promise<pg.QueryResult>;
    /**
     * Executes a query with the specified parameters. Errors if the query does
     * not return exactly one row.
     */
    queryOneRow: (arg1: string, arg2: QueryParams, callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Executes a query with the specified parameters. Errors if the query
     * returns more than one row.
     */
    queryZeroOrOneRowAsync(sql: string, params: QueryParams): Promise<pg.QueryResult>;
    /**
     * Executes a query with the specified parameters. Errors if the query
     * returns more than one row.
     */
    queryZeroOrOneRow: (arg1: string, arg2: QueryParams, callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Calls the given function with the specified parameters.
     */
    callAsync(functionName: string, params: any[]): Promise<pg.QueryResult>;
    /**
     * Calls the given function with the specified parameters.
     */
    call: (arg1: string, arg2: any[], callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Calls the given function with the specified parameters. Errors if the
     * function does not return exactly one row.
     */
    callOneRowAsync(functionName: string, params: any[]): Promise<pg.QueryResult>;
    /**
     * Calls the given function with the specified parameters. Errors if the
     * function does not return exactly one row.
     */
    callOneRow: (arg1: string, arg2: any[], callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Calls the given function with the specified parameters. Errors if the
     * function returns more than one row.
     */
    callZeroOrOneRowAsync(functionName: string, params: any[]): Promise<pg.QueryResult>;
    /**
     * Calls the given function with the specified parameters. Errors if the
     * function returns more than one row.
     */
    callZeroOrOneRow: (arg1: string, arg2: any[], callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Calls a function with the specified parameters using a specific client.
     */
    callWithClientAsync(client: pg.PoolClient, functionName: string, params: any[]): Promise<pg.QueryResult>;
    /**
     * Calls a function with the specified parameters using a specific client.
     */
    callWithClient: (arg1: pg.PoolClient, arg2: string, arg3: any[], callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Calls a function with the specified parameters using a specific client.
     * Errors if the function does not return exactly one row.
     */
    callWithClientOneRowAsync(client: pg.PoolClient, functionName: string, params: any[]): Promise<pg.QueryResult>;
    /**
     * Calls a function with the specified parameters using a specific client.
     * Errors if the function does not return exactly one row.
     */
    callWithClientOneRow: (arg1: pg.PoolClient, arg2: string, arg3: any[], callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Calls a function with the specified parameters using a specific client.
     * Errors if the function returns more than one row.
     */
    callWithClientZeroOrOneRowAsync(client: pg.PoolClient, functionName: string, params: any[]): Promise<pg.QueryResult>;
    /**
     * Calls a function with the specified parameters using a specific client.
     * Errors if the function returns more than one row.
     */
    callWithClientZeroOrOneRow: (arg1: pg.PoolClient, arg2: string, arg3: any[], callback: (err: NodeJS.ErrnoException | null, result: pg.QueryResult<any>) => void) => void;
    /**
     * Wrapper around {@link queryAsync} that parses the resulting rows with the
     * given Zod schema. Returns only the rows of the query.
     */
    queryValidatedRows<Model extends z.ZodTypeAny>(query: string, params: QueryParams, model: Model): Promise<z.infer<Model>[]>;
    /**
     * Wrapper around {@link queryOneRowAsync} that parses the resulting row with
     * the given Zod schema. Returns only a single row of the query.
     */
    queryValidatedOneRow<Model extends z.ZodTypeAny>(query: string, params: QueryParams, model: Model): Promise<z.infer<Model>>;
    /**
     * Wrapper around {@link queryZeroOrOneRowAsync} that parses the resulting row
     * (if any) with the given Zod schema. Returns either a single row or `null`.
     */
    queryValidatedZeroOrOneRow<Model extends z.ZodTypeAny>(query: string, params: QueryParams, model: Model): Promise<z.infer<Model> | null>;
    /**
     * Wrapper around {@link queryAsync} that validates that only one column is
     * returned and parses the data in it with the given Zod schema. Returns only
     * the single column of the query as an array.
     */
    queryValidatedSingleColumnRows<Model extends z.ZodTypeAny>(query: string, params: QueryParams, model: Model): Promise<z.infer<Model>[]>;
    /**
     * Wrapper around {@link queryOneRowAsync} that validates that only one column
     * is returned and parses the data in it with the given Zod schema. Returns
     * only the single entry.
     */
    queryValidatedSingleColumnOneRow<Model extends z.ZodTypeAny>(query: string, params: QueryParams, model: Model): Promise<z.infer<Model>>;
    /**
     * Wrapper around {@link queryZeroOrOneRowAsync} that validates that only one
     * column is returned and parses the data in it (if any) with the given Zod
     * schema. Returns either the single row of the query or `null`.
     */
    queryValidatedSingleColumnZeroOrOneRow<Model extends z.ZodTypeAny>(query: string, params: QueryParams, model: Model): Promise<z.infer<Model> | null>;
    /**
     * Wrapper around {@link callAsync} that parses the resulting rows with the
     * given Zod schema. Returns only the rows.
     */
    callValidatedRows<Model extends z.ZodTypeAny>(sprocName: string, params: any[], model: Model): Promise<z.infer<Model>[]>;
    /**
     * Wrapper around {@link callOneRowAsync} that parses the resulting rows with
     * the given Zod schema. Returns only a single row.
     */
    callValidatedOneRow<Model extends z.ZodTypeAny>(sprocName: string, params: any[], model: Model): Promise<z.infer<Model>>;
    /**
     * Wrapper around {@link callZeroOrOneRowAsync} that parses the resulting row
     * (if any) with the given Zod schema. Returns at most a single row.
     */
    callValidatedZeroOrOneRow<Model extends z.ZodTypeAny>(sprocName: string, params: any[], model: Model): Promise<z.infer<Model> | null>;
    queryRows<Model extends z.ZodTypeAny>(sql: string, model: Model): Promise<z.infer<Model>[]>;
    queryRows<Model extends z.ZodTypeAny>(sql: string, params: QueryParams, model: Model): Promise<z.infer<Model>[]>;
    queryRow<Model extends z.ZodTypeAny>(sql: string, model: Model): Promise<z.infer<Model>>;
    queryRow<Model extends z.ZodTypeAny>(sql: string, params: QueryParams, model: Model): Promise<z.infer<Model>>;
    queryOptionalRow<Model extends z.ZodTypeAny>(sql: string, model: Model): Promise<z.infer<Model> | null>;
    queryOptionalRow<Model extends z.ZodTypeAny>(sql: string, params: QueryParams, model: Model): Promise<z.infer<Model> | null>;
    callRows<Model extends z.ZodTypeAny>(sql: string, model: Model): Promise<z.infer<Model>[]>;
    callRows<Model extends z.ZodTypeAny>(sql: string, params: any[], model: Model): Promise<z.infer<Model>[]>;
    callRow<Model extends z.ZodTypeAny>(sql: string, model: Model): Promise<z.infer<Model>>;
    callRow<Model extends z.ZodTypeAny>(sql: string, params: any[], model: Model): Promise<z.infer<Model>>;
    callOptionalRow<Model extends z.ZodTypeAny>(sql: string, model: Model): Promise<z.infer<Model> | null>;
    callOptionalRow<Model extends z.ZodTypeAny>(sql: string, params: any[], model: Model): Promise<z.infer<Model> | null>;
    /**
     * Returns a {@link Cursor} for the given query. The cursor can be used to
     * read results in batches, which is useful for large result sets.
     */
    queryCursorWithClient(client: pg.PoolClient, sql: string, params: QueryParams): Promise<Cursor>;
    /**
     * Returns an {@link CursorIterator} that can be used to iterate over the
     * results of the query in batches, which is useful for large result sets.
     */
    queryCursor<Model extends z.ZodTypeAny>(sql: string, params: QueryParams): Promise<CursorIterator<z.infer<Model>>>;
    /**
     * Returns an {@link CursorIterator} that can be used to iterate over the
     * results of the query in batches, which is useful for large result sets.
     * Each row will be parsed by the given Zod schema.
     */
    queryValidatedCursor<Model extends z.ZodTypeAny>(sql: string, params: QueryParams, model: Model): Promise<CursorIterator<z.infer<Model>>>;
    private queryValidatedCursorInternal;
    /**
     * Set the schema to use for the search path.
     *
     * @param schema The schema name to use (can be "null" to unset the search path)
     */
    setSearchSchema(schema: string): Promise<void>;
    /**
     * Get the schema that is currently used for the search path.
     *
     * @return schema in use (may be `null` to indicate no schema)
     */
    getSearchSchema(): string | null;
    /**
     * Generate, set, and return a random schema name.
     *
     * @param prefix The prefix of the new schema, only the first 28 characters will be used (after lowercasing).
     * @returns The randomly-generated search schema.
     */
    setRandomSearchSchemaAsync(prefix: string): Promise<string>;
    /**
     * Generate, set, and return a random schema name.
     */
    setRandomSearchSchema: (arg1: string, callback: (err: NodeJS.ErrnoException, result: string) => void) => void;
    /** The number of established connections. */
    get totalCount(): number;
    /** The number of idle connections. */
    get idleCount(): number;
    /** The number of queries waiting for a connection to become available. */
    get waitingCount(): number;
    /** The total number of queries that have been executed by this pool. */
    get queryCount(): number;
}
