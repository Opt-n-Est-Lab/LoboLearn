import { execa } from 'execa';
import fs from 'fs-extra';
import { z } from 'zod';
import { makeBatchedMigration } from '@prairielearn/migrations';
import { loadSqlEquiv, queryOneRowAsync, queryOptionalRow, queryRow } from '@prairielearn/postgres';
import { DateFromISOString, IdSchema } from '../lib/db-types.js';
const sql = loadSqlEquiv(import.meta.url);
async function getEarliestCommitDateForCourse(coursePath) {
    if (coursePath == null || !(await fs.pathExists(coursePath))) {
        return null;
    }
    const res = await execa('git', ['log', '--reverse', '--format=%cI', '--date=iso'], {
        cwd: coursePath,
    });
    const lines = res.stdout.trim().split('\n');
    return lines.length > 0 ? new Date(lines[0]) : null;
}
async function getEarliestJobSequenceDateForCourse(courseId) {
    const result = await queryRow(sql.select_earliest_job_sequence_for_course, { course_id: courseId }, DateFromISOString.nullable());
    return result;
}
function smallestDate(first, second) {
    if (first == null) {
        return second;
    }
    if (second == null) {
        return first;
    }
    return first < second ? first : second;
}
export default makeBatchedMigration({
    async getParameters() {
        const result = await queryOneRowAsync('SELECT MAX(id) as max from pl_courses;', {});
        return {
            min: 1n,
            max: result.rows[0].max,
            batchSize: 10,
        };
    },
    async execute(start, end) {
        for (let id = start; id <= end; id++) {
            const course = await queryOptionalRow(sql.select_course, { course_id: id }, 
            // CourseSchema isn't used to avoid problems if the schema changes in
            // the future. Only fields that are actually used are added here.
            z.object({
                created_at: DateFromISOString.nullable(),
                id: IdSchema,
                path: z.string().nullable(),
            }));
            if (course == null || course.created_at != null) {
                // This course does not exist, or it already has a created_at date.
                continue;
            }
            const earliestCommitDate = await getEarliestCommitDateForCourse(course.path);
            const earliestServerJobDate = await getEarliestJobSequenceDateForCourse(course.id);
            // Take the earlier of the two values.
            const createdAt = smallestDate(earliestCommitDate, earliestServerJobDate);
            if (!createdAt) {
                throw new Error(`Could not determine created_at date for course ${course.id}`);
            }
            await queryOneRowAsync(sql.update_course_created_at, {
                course_id: id,
                created_at: createdAt,
            });
        }
    },
});
//# sourceMappingURL=20230913181816_pl_courses_created_at.js.map