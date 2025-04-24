import { finalizeBatchedMigration } from '@prairielearn/migrations';
export default async function () {
    await finalizeBatchedMigration('20230913181816_pl_courses_created_at');
}
//# sourceMappingURL=20230922173830_pl_courses__created_at__backfill__finalize.mjs.map