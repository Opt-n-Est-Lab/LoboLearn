import { finalizeBatchedMigration } from '@prairielearn/migrations';
export default async function () {
    await finalizeBatchedMigration('20241018171312_questions__share_publicly__backfill');
}
//# sourceMappingURL=20241029204638_questions__share_publicly_backfill__finalize.js.map