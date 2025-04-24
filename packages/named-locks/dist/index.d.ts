import { type PoolConfig } from 'pg';
import { type PoolClient, PostgresPool } from '@prairielearn/postgres';
interface NamedLocksConfig {
    /**
     * How often to renew the lock in milliseconds. Defaults to 60 seconds.
     * Auto-renewal must be explicitly enabled on each lock where it is desired.
     *
     */
    renewIntervalMs?: number;
}
interface LockOptions {
    /** How many milliseconds to wait (anything other than a positive number means forever) */
    timeout?: number;
    /**
     * Whether or not this lock should automatically renew itself periodically.
     * By default, locks will not renew themselves.
     *
     * This is mostly useful for locks that may be held for longer than the idle
     * session timeout that's configured for the Postgres database. The lock is
     * "renewed" by making a no-op query.
     */
    autoRenew?: boolean;
}
interface WithLockOptions<T> extends LockOptions {
    onNotAcquired?: () => Promise<T> | T;
}
export declare const pool: PostgresPool;
/**
 * Initializes a new {@link PostgresPool} that will be used to acquire named locks.
 */
export declare function init(pgConfig: PoolConfig, idleErrorHandler: (error: Error, client: PoolClient) => void, namedLocksConfig?: NamedLocksConfig): Promise<void>;
/**
 * Shuts down the database connection pool that was used to acquire locks.
 */
export declare function close(): Promise<void>;
/**
 * Acquires the given lock, executes the provided function with the lock held,
 * and releases the lock once the function has executed.
 *
 * If the lock cannot be acquired, the function is not executed. If an `onNotAcquired`
 * function was provided, this function is called and its return value is returned.
 * Otherwise, an error is thrown to indicate that the lock could not be acquired.
 */
export declare function doWithLock<T, U = never>(name: string, options: WithLockOptions<U>, func: () => Promise<T>): Promise<T | U>;
export {};
