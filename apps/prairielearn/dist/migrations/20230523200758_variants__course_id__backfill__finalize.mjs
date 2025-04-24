import { finalizeBatchedMigration } from '@prairielearn/migrations';
export default async function () {
    await finalizeBatchedMigration('20230418190511_variants_course_id');
}
//# sourceMappingURL=20230523200758_variants__course_id__backfill__finalize.mjs.map