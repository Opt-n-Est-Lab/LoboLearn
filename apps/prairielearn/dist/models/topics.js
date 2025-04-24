import { loadSqlEquiv, queryRows } from '@prairielearn/postgres';
import { TopicSchema } from '../lib/db-types.js';
const sql = loadSqlEquiv(import.meta.url);
export async function selectTopicsByCourseId(course_id) {
    return await queryRows(sql.select_topics, { course_id }, TopicSchema);
}
//# sourceMappingURL=topics.js.map