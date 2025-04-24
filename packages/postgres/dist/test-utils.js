import pg from 'pg';
import * as defaultPool from './default-pool.js';
const POSTGRES_USER = 'postgres';
const POSTGRES_HOST = 'localhost';
const POSTGRES_DATABASE = 'postgres';
async function createDatabase(options, { dropExistingDatabase = true, configurePool = true, database, templateDatabase, prepare, } = {}) {
    const client = new pg.Client({
        ...getPoolConfig(options),
        database: options.defaultDatabase ?? POSTGRES_DATABASE,
    });
    await client.connect();
    const escapedDatabase = client.escapeIdentifier(database ?? getDatabaseNameForCurrentMochaWorker(options.database));
    if (dropExistingDatabase ?? true) {
        await client.query(`DROP DATABASE IF EXISTS ${escapedDatabase}`);
    }
    if (templateDatabase) {
        const escapedTemplateDatabase = client.escapeIdentifier(templateDatabase);
        await client.query(`CREATE DATABASE ${escapedDatabase} TEMPLATE ${escapedTemplateDatabase}`);
    }
    else {
        await client.query(`CREATE DATABASE ${escapedDatabase}`);
    }
    await client.end();
    await prepare?.(client);
    if (configurePool) {
        await defaultPool.initAsync({
            user: options.user ?? POSTGRES_USER,
            host: options.host ?? POSTGRES_HOST,
            database: getDatabaseNameForCurrentMochaWorker(options.database),
            // Offer sensible default, but these can be overridden by `options.poolConfig`.
            max: 10,
            idleTimeoutMillis: 30000,
            errorOnUnusedParameters: true,
            ...(options.poolConfig ?? {}),
        }, (err) => {
            throw err;
        });
    }
}
async function resetDatabase(options) {
    const client = new pg.Client(getPoolConfig(options));
    await client.connect();
    await client.query(`
    DO
    $func$
    BEGIN
      EXECUTE (
        SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' RESTART IDENTITY CASCADE'
          FROM pg_class
          WHERE relkind = 'r'
          AND relnamespace = 'public'::regnamespace
      );
    END
    $func$;
  `);
    await options.prepareAfterReset?.(client);
    await client.end();
}
async function dropDatabase(options, { closePool = true, force = false, database } = {}) {
    if (closePool) {
        await defaultPool.closeAsync();
    }
    const databaseName = database ?? getDatabaseNameForCurrentMochaWorker(options.database);
    if ('PL_KEEP_TEST_DB' in process.env && !force) {
        console.log(`PL_KEEP_TEST_DB environment variable set, not dropping database ${databaseName}`);
        return;
    }
    const client = new pg.Client({
        ...getPoolConfig(options),
        database: options.defaultDatabase ?? POSTGRES_DATABASE,
    });
    await client.connect();
    await client.query(`DROP DATABASE IF EXISTS ${client.escapeIdentifier(databaseName)}`);
    await client.end();
}
function getDatabaseNameForCurrentMochaWorker(namespace) {
    const workerId = process.env.MOCHA_WORKER_ID ?? '1';
    return `${namespace}_${workerId}`;
}
function getPoolConfig(options) {
    return {
        user: options.user ?? POSTGRES_USER,
        host: options.host ?? POSTGRES_HOST,
        database: getDatabaseNameForCurrentMochaWorker(options.database),
    };
}
export function makePostgresTestUtils(options) {
    return {
        createDatabase: (createOptions) => createDatabase(options, createOptions),
        resetDatabase: () => resetDatabase(options),
        dropDatabase: (dropOptions) => dropDatabase(options, dropOptions),
        getDatabaseNameForCurrentMochaWorker: () => getDatabaseNameForCurrentMochaWorker(options.database),
        getPoolConfig: () => getPoolConfig(options),
    };
}
//# sourceMappingURL=test-utils.js.map