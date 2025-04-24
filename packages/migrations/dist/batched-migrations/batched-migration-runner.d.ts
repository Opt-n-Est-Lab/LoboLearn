import { type BatchedMigrationImplementation, type BatchedMigrationRow } from './batched-migration.js';
interface BatchedMigrationRunnerOptions {
    logProgress?: boolean;
}
export declare class BatchedMigrationRunner {
    private options;
    private migration;
    private migrationImplementation;
    private migrationStatus;
    constructor(migration: BatchedMigrationRow, migrationImplementation: BatchedMigrationImplementation, options?: BatchedMigrationRunnerOptions);
    private log;
    private hasIncompleteJobs;
    private hasFailedJobs;
    private refreshMigrationStatus;
    private finishRunningMigration;
    private getNextBatchBounds;
    private startJob;
    private serializeJobData;
    private finishJob;
    private getOrCreateNextMigrationJob;
    private runMigrationJob;
    run({ signal, iterations, durationMs, }?: {
        signal?: AbortSignal;
        iterations?: number;
        durationMs?: number;
    }): Promise<void>;
}
export {};
