import { callAsync, callRow, loadSqlEquiv, queryOptionalRow, queryRow, runInTransactionAsync, } from '@prairielearn/postgres';
import { GradingJobSchema, IdSchema, SubmissionSchema, } from '../lib/db-types.js';
const sql = loadSqlEquiv(import.meta.url);
export function gradingJobStatus(gradingJob) {
    if (gradingJob == null)
        return 'none';
    if (gradingJob.grading_request_canceled_at != null)
        return 'canceled';
    if (gradingJob.graded_at != null)
        return 'graded';
    if (gradingJob.grading_received_at != null)
        return 'grading';
    if (gradingJob.grading_submitted_at != null)
        return 'queued';
    return 'requested';
}
/**
 * Select a grading job by ID, returning null if it does not exist.
 *
 * @param grading_job_id The grading job ID.
 * @returns The grading job, or null if it does not exist.
 */
export async function selectOptionalGradingJobById(grading_job_id) {
    return await queryOptionalRow(sql.select_grading_job, { grading_job_id }, GradingJobSchema);
}
export async function insertGradingJob({ submission_id, authn_user_id, }) {
    return await runInTransactionAsync(async () => {
        await callAsync('submissions_lock', [submission_id]);
        const { assessment_instance_id, credit, ...grading_job } = await queryRow(sql.insert_grading_job, { submission_id, authn_user_id }, GradingJobSchema.extend({
            assessment_instance_id: IdSchema.nullable(),
            credit: SubmissionSchema.shape.credit,
        }));
        if (assessment_instance_id != null) {
            await callAsync('assessment_instances_grade', [
                assessment_instance_id,
                authn_user_id,
                credit,
            ]);
        }
        return grading_job;
    });
}
export async function updateGradingJobAfterGrading({ grading_job_id, received_time, start_time, finish_time, submitted_answer, format_errors, gradable, broken, params, true_answer, feedback, partial_scores, score, v2_score, }) {
    return await callRow('grading_jobs_update_after_grading', [
        grading_job_id,
        received_time,
        start_time,
        finish_time,
        submitted_answer,
        format_errors,
        gradable,
        broken,
        params,
        true_answer,
        feedback,
        partial_scores,
        score,
        v2_score,
    ], GradingJobSchema);
}
//# sourceMappingURL=grading-job.js.map