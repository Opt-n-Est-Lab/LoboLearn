import { z } from 'zod';
import { loadSqlEquiv, queryRows } from '@prairielearn/postgres';
const sql = loadSqlEquiv(import.meta.filename);
export const BatchedMigrationJobStatusSchema = z.enum(['pending', 'failed', 'succeeded']);
export const BatchedMigrationJobRowSchema = z.object({
    id: z.string(),
    batched_migration_id: z.string(),
    min_value: z.bigint({ coerce: true }),
    max_value: z.bigint({ coerce: true }),
    status: BatchedMigrationJobStatusSchema,
    attempts: z.number(),
    created_at: z.date(),
    updated_at: z.date(),
    started_at: z.date().nullable(),
    finished_at: z.date().nullable(),
    data: z.unknown(),
});
export async function selectRecentJobsWithStatus(batchedMigrationId, status, limit) {
    return await queryRows(sql.select_recent_jobs_with_status, { batched_migration_id: batchedMigrationId, status, limit }, BatchedMigrationJobRowSchema);
}
//# sourceMappingURL=batched-migration-job.js.map