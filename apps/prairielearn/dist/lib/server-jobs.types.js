import { z } from 'zod';
import { JobSchema, JobSequenceSchema, UserSchema } from './db-types.js';
const JobRowSchema = JobSchema.extend({
    user_uid: UserSchema.shape.uid.nullable(),
    authn_user_uid: UserSchema.shape.uid.nullable(),
});
export const JobSequenceWithJobsSchema = JobSequenceSchema.extend({
    user_uid: UserSchema.shape.uid.nullable(),
    authn_user_uid: UserSchema.shape.uid.nullable(),
    job_count: z.coerce.number(),
    jobs: JobRowSchema.array(),
});
//# sourceMappingURL=server-jobs.types.js.map