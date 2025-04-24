import { enqueueBatchedMigration } from '@prairielearn/migrations';
export default async function () {
    await enqueueBatchedMigration('20230418190511_variants_course_id');
}
//# sourceMappingURL=20230418190511_variants__course_id__backfill.mjs.map