import { z } from 'zod';
import { loadSqlEquiv, queryAsync, queryOptionalRow, queryRow, queryRows, } from '@prairielearn/postgres';
const sql = loadSqlEquiv(import.meta.filename);
export const BatchedMigrationStatusSchema = z.enum([
    'pending',
    'paused',
    'running',
    'finalizing',
    'failed',
    'succeeded',
]);
export const BatchedMigrationRowSchema = z.object({
    id: z.string(),
    project: z.string(),
    filename: z.string(),
    timestamp: z.string(),
    batch_size: z.number(),
    min_value: z.bigint({ coerce: true }),
    max_value: z.bigint({ coerce: true }),
    status: BatchedMigrationStatusSchema,
    created_at: z.date(),
    updated_at: z.date(),
    started_at: z.date().nullable(),
});
/**
 * Identity function that helps to write correct batched migrations.
 */
export function makeBatchedMigration(fns) {
    validateBatchedMigrationImplementation(fns);
    return fns;
}
export function validateBatchedMigrationImplementation(fns) {
    if (typeof fns.getParameters !== 'function') {
        throw new Error('getParameters() must be a function');
    }
    if (typeof fns.execute !== 'function') {
        throw new Error('execute() must be a function');
    }
}
/**
 * Inserts a new batched migration. If one already exists for the given
 * project/timestamp pair, returns null, otherwise returns the inserted row.
 */
export async function insertBatchedMigration(migration) {
    return await queryOptionalRow(sql.insert_batched_migration, migration, BatchedMigrationRowSchema);
}
export async function selectAllBatchedMigrations(project) {
    return await queryRows(sql.select_all_batched_migrations, { project }, BatchedMigrationRowSchema);
}
export async function selectBatchedMigration(project, id) {
    return await queryRow(sql.select_batched_migration, { project, id }, BatchedMigrationRowSchema);
}
export async function selectBatchedMigrationForTimestamp(project, timestamp) {
    return await queryRow(sql.select_batched_migration_for_timestamp, { project, timestamp }, BatchedMigrationRowSchema);
}
export async function updateBatchedMigrationStatus(id, status) {
    return await queryRow(sql.update_batched_migration_status, { id, status }, BatchedMigrationRowSchema);
}
export async function retryFailedBatchedMigrationJobs(project, id) {
    await queryAsync(sql.retry_failed_jobs, { project, id });
}
//# sourceMappingURL=batched-migration.js.map