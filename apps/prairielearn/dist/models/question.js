import { loadSqlEquiv, queryOptionalRow, queryRow } from '@prairielearn/postgres';
import { QuestionSchema } from '../lib/db-types.js';
const sql = loadSqlEquiv(import.meta.url);
export async function selectQuestionById(question_id) {
    return await queryRow(sql.select_question_by_id, { question_id }, QuestionSchema);
}
export async function selectQuestionByQid({ qid, course_id, }) {
    return await queryRow(sql.select_question_by_qid, { qid, course_id }, QuestionSchema);
}
export async function selectOptionalQuestionByQid({ qid, course_id, }) {
    return await queryOptionalRow(sql.select_question_by_qid, { qid, course_id }, QuestionSchema);
}
export async function selectQuestionByUuid({ course_id, uuid, }) {
    return await queryRow(sql.select_question_by_uuid, { course_id, uuid }, QuestionSchema);
}
export async function selectQuestionByInstanceQuestionId(instance_question_id) {
    return await queryRow(sql.select_question_by_instance_question_id, { instance_question_id }, QuestionSchema);
}
//# sourceMappingURL=question.js.map