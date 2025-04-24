import { z } from 'zod';
import { logger } from '@prairielearn/logger';
import * as sqldb from '@prairielearn/postgres';
import * as Sentry from '@prairielearn/sentry';
import { checkSignedToken } from '@prairielearn/signed-token';
import { gradingJobStatus } from '../models/grading-job.js';
import { config } from './config.js';
import { GradingJobSchema, IdSchema } from './db-types.js';
import * as socketServer from './socket-server.js';
const sql = sqldb.loadSqlEquiv(import.meta.url);
const SubmissionForVariantSchema = z.object({
    id: IdSchema,
    grading_job: GradingJobSchema.nullable(),
});
const SubmissionForGradingJobSchema = z.object({
    id: IdSchema,
    grading_job: GradingJobSchema,
    variant_id: IdSchema,
});
let namespace;
// This module MUST be initialized after socket-server
export function init() {
    namespace = socketServer.io.of('/external-grading');
    namespace.on('connection', connection);
}
export function connection(socket) {
    socket.on('init', (msg, callback) => {
        if (!ensureProps(msg, ['variant_id', 'variant_token'])) {
            return callback(null);
        }
        if (!checkToken(msg.variant_token, msg.variant_id)) {
            return callback(null);
        }
        socket.join(`variant-${msg.variant_id}`);
        getVariantSubmissionsStatus(msg.variant_id).then((submissions) => {
            callback({
                variant_id: msg.variant_id,
                submissions: submissions.map((s) => ({
                    id: s.id,
                    grading_job_id: s.grading_job?.id,
                    grading_job_status: gradingJobStatus(s.grading_job),
                })),
            });
        }, (err) => {
            logger.error('Error getting variant submissions status', err);
            Sentry.captureException(err);
        });
    });
}
export async function getVariantSubmissionsStatus(variant_id) {
    return await sqldb.queryRows(sql.select_submissions_for_variant, { variant_id }, SubmissionForVariantSchema);
}
export async function gradingJobStatusUpdated(grading_job_id) {
    try {
        const submission = await sqldb.queryRow(sql.select_submission_for_grading_job, { grading_job_id }, SubmissionForGradingJobSchema);
        const eventData = {
            variant_id: submission.variant_id,
            submissions: [
                {
                    id: submission.id,
                    grading_job_id: submission.grading_job?.id,
                    grading_job_status: gradingJobStatus(submission.grading_job),
                },
            ],
        };
        namespace.to(`variant-${submission.variant_id}`).emit('change:status', eventData);
    }
    catch (err) {
        logger.error('Error selecting submission for grading job', err);
        Sentry.captureException(err);
    }
}
function ensureProps(data, props) {
    for (const prop of props) {
        if (!Object.hasOwn(data, prop)) {
            logger.error(`socket.io external grader connected without ${prop}`);
            Sentry.captureException(new Error(`socket.io external grader connected without property ${prop}`));
            return false;
        }
    }
    return true;
}
function checkToken(token, variantId) {
    const data = { variantId };
    const valid = checkSignedToken(token, data, config.secretKey, { maxAge: 24 * 60 * 60 * 1000 });
    if (!valid) {
        logger.error(`Token for variant ${variantId} failed validation.`);
        Sentry.captureException(new Error(`Token for variant ${variantId} failed validation.`));
    }
    return valid;
}
//# sourceMappingURL=externalGradingSocket.js.map