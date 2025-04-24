import pg from 'pg';
export interface PostgresTestUtilsOptions {
    database: string;
    user?: string;
    host?: string;
    poolConfig?: Pick<pg.PoolConfig, 'max' | 'idleTimeoutMillis'>;
    defaultDatabase?: string;
    prepareAfterReset?: (client: pg.Client) => Promise<void>;
}
interface CreateDatabaseOptions {
    dropExistingDatabase?: boolean;
    database?: string;
    templateDatabase?: string;
    configurePool?: boolean;
    prepare?: (client: pg.Client) => Promise<void>;
}
interface DropDatabaseOptions {
    database?: string;
    force?: boolean;
    closePool?: boolean;
}
export interface PostgresTestUtils {
    createDatabase: (options?: CreateDatabaseOptions) => Promise<void>;
    resetDatabase: () => Promise<void>;
    dropDatabase: (options?: DropDatabaseOptions) => Promise<void>;
    getDatabaseNameForCurrentMochaWorker: () => string;
    getPoolConfig: () => pg.PoolConfig;
}
export declare function makePostgresTestUtils(options: PostgresTestUtilsOptions): PostgresTestUtils;
export {};
