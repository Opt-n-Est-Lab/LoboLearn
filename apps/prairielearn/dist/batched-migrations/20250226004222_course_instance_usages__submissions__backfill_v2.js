import { z } from 'zod';
import { makeBatchedMigration } from '@prairielearn/migrations';
import { loadSqlEquiv, queryAsync, queryRow } from '@prairielearn/postgres';
const sql = loadSqlEquiv(import.meta.url);
const CUTOFF_DATE = '2025-02-15T00:00:00Z';
export default makeBatchedMigration({
    async getParameters() {
        // First delete usage data older than a hard-coded date
        await queryAsync(sql.delete_old_usages, { CUTOFF_DATE });
        // Only backfill from submissions that are older than the cutoff date
        const max = await queryRow(sql.select_bounds, { CUTOFF_DATE }, z.bigint({ coerce: true }).nullable());
        return { min: 1n, max, batchSize: 100_000 };
    },
    async execute(start, end) {
        await queryAsync(sql.update_course_instance_usages_for_submissions, { start, end });
    },
});
//# sourceMappingURL=20250226004222_course_instance_usages__submissions__backfill_v2.js.map