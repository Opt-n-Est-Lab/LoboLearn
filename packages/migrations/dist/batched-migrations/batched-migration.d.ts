import { z } from 'zod';
export declare const BatchedMigrationStatusSchema: z.ZodEnum<["pending", "paused", "running", "finalizing", "failed", "succeeded"]>;
export type BatchedMigrationStatus = z.infer<typeof BatchedMigrationStatusSchema>;
export declare const BatchedMigrationRowSchema: z.ZodObject<{
    id: z.ZodString;
    project: z.ZodString;
    filename: z.ZodString;
    timestamp: z.ZodString;
    batch_size: z.ZodNumber;
    min_value: z.ZodBigInt;
    max_value: z.ZodBigInt;
    status: z.ZodEnum<["pending", "paused", "running", "finalizing", "failed", "succeeded"]>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    started_at: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    filename: string;
    timestamp: string;
    project: string;
    status: "pending" | "paused" | "running" | "finalizing" | "failed" | "succeeded";
    id: string;
    batch_size: number;
    min_value: bigint;
    max_value: bigint;
    created_at: Date;
    updated_at: Date;
    started_at: Date | null;
}, {
    filename: string;
    timestamp: string;
    project: string;
    status: "pending" | "paused" | "running" | "finalizing" | "failed" | "succeeded";
    id: string;
    batch_size: number;
    min_value: bigint;
    max_value: bigint;
    created_at: Date;
    updated_at: Date;
    started_at: Date | null;
}>;
export type BatchedMigrationRow = z.infer<typeof BatchedMigrationRowSchema>;
export interface BatchedMigrationParameters {
    min?: bigint | string | null;
    max: bigint | string | null;
    batchSize?: number;
}
export interface BatchedMigrationImplementation {
    getParameters(): Promise<BatchedMigrationParameters>;
    execute(start: bigint, end: bigint): Promise<void>;
}
/**
 * Identity function that helps to write correct batched migrations.
 */
export declare function makeBatchedMigration<T extends BatchedMigrationImplementation>(fns: T): T;
export declare function validateBatchedMigrationImplementation(fns: BatchedMigrationImplementation): asserts fns is BatchedMigrationImplementation;
type NewBatchedMigration = Pick<BatchedMigrationRow, 'project' | 'filename' | 'timestamp' | 'batch_size' | 'min_value' | 'max_value' | 'status'>;
/**
 * Inserts a new batched migration. If one already exists for the given
 * project/timestamp pair, returns null, otherwise returns the inserted row.
 */
export declare function insertBatchedMigration(migration: NewBatchedMigration): Promise<BatchedMigrationRow | null>;
export declare function selectAllBatchedMigrations(project: string): Promise<{
    filename: string;
    timestamp: string;
    project: string;
    status: "pending" | "paused" | "running" | "finalizing" | "failed" | "succeeded";
    id: string;
    batch_size: number;
    min_value: bigint;
    max_value: bigint;
    created_at: Date;
    updated_at: Date;
    started_at: Date | null;
}[]>;
export declare function selectBatchedMigration(project: string, id: string): Promise<BatchedMigrationRow>;
export declare function selectBatchedMigrationForTimestamp(project: string, timestamp: string): Promise<BatchedMigrationRow>;
export declare function updateBatchedMigrationStatus(id: string, status: BatchedMigrationStatus): Promise<BatchedMigrationRow>;
export declare function retryFailedBatchedMigrationJobs(project: string, id: string): Promise<void>;
export {};
