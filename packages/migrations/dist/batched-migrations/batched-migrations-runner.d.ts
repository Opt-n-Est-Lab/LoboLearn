import { EventEmitter } from 'node:events';
interface BatchedMigrationRunnerOptions {
    project: string;
    directories: string[];
}
interface BatchedMigrationStartOptions {
    workDurationMs?: number;
    sleepDurationMs?: number;
}
interface BatchedMigrationFinalizeOptions {
    logProgress?: boolean;
}
export declare class BatchedMigrationsRunner extends EventEmitter {
    private readonly options;
    private readonly lockName;
    private running;
    private migrationFiles;
    private abortController;
    constructor(options: BatchedMigrationRunnerOptions);
    private lockNameForTimestamp;
    private getMigrationFiles;
    private getMigrationForIdentifier;
    /**
     * Loads the implementation for the migration with the given identifier. The identifier
     * must start with a 14-character timestamp. It may optionally be followed by
     * an underscore with additional characters, which are ignored. These should
     * typically be used to provide a human-readable name for the migration.
     */
    private loadMigrationImplementation;
    enqueueBatchedMigration(identifier: string): Promise<void>;
    finalizeBatchedMigration(identifier: string, options?: BatchedMigrationFinalizeOptions): Promise<void>;
    start(options?: BatchedMigrationStartOptions): void;
    loop({ workDurationMs, sleepDurationMs }: BatchedMigrationStartOptions): Promise<void>;
    private getOrStartMigration;
    maybePerformWork(durationMs: number): Promise<boolean>;
    stop(): Promise<void>;
}
export declare function initBatchedMigrations(options: BatchedMigrationRunnerOptions): BatchedMigrationsRunner;
export declare function startBatchedMigrations(options?: BatchedMigrationStartOptions): BatchedMigrationsRunner;
export declare function stopBatchedMigrations(): Promise<void>;
/**
 * Given a batched migration identifier like `20230406184103_migration`,
 * enqueues it for execution by creating a row in the `batched_migrations`
 * table.
 *
 * Despite taking a full identifier, only the timestamp is used to uniquely
 * identify the batched migration. The remaining part is just used to make
 * calls more human-readable.
 *
 * @param identifier The identifier of the batched migration to enqueue.
 */
export declare function enqueueBatchedMigration(identifier: string): Promise<void>;
/**
 * Given a batched migration identifier like `20230406184103_migration`,
 * synchronously runs it to completion. An error will be thrown if the final
 * status of the migration is not `succeeded`.
 *
 * @param identifier The identifier of the batched migration to finalize.
 * @param options Options for finalizing the batched migration.
 */
export declare function finalizeBatchedMigration(identifier: string, options?: BatchedMigrationFinalizeOptions): Promise<void>;
export {};
