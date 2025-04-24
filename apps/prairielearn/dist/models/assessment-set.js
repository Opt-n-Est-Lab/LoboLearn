import { loadSqlEquiv, queryRow } from '@prairielearn/postgres';
import { AssessmentSetSchema } from '../lib/db-types.js';
const sql = loadSqlEquiv(import.meta.url);
export async function selectAssessmentSetById(assessment_set_id) {
    return await queryRow(sql.select_assessment_set_by_id, { assessment_set_id }, AssessmentSetSchema);
}
//# sourceMappingURL=assessment-set.js.map