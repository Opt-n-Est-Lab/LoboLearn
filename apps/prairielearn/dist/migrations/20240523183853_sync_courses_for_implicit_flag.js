import { enqueueBatchedMigration } from '@prairielearn/migrations';
export default async function () {
    await enqueueBatchedMigration('20240523183853_sync_courses_for_implicit_flag');
}
//# sourceMappingURL=20240523183853_sync_courses_for_implicit_flag.js.map