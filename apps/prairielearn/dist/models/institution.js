import { loadSqlEquiv, queryRow, queryRows } from '@prairielearn/postgres';
import { InstitutionSchema } from '../lib/db-types.js';
const sql = loadSqlEquiv(import.meta.url);
export async function selectInstitutionForCourse({ course_id, }) {
    return await queryRow(sql.select_institution_for_course, {
        course_id,
    }, InstitutionSchema);
}
export async function selectInstitutionForCourseInstance({ course_instance_id, }) {
    return await queryRow(sql.select_institution_for_course_instance, {
        course_instance_id,
    }, InstitutionSchema);
}
export async function selectAllInstitutions() {
    return await queryRows(sql.select_all_institutions, InstitutionSchema);
}
//# sourceMappingURL=institution.js.map