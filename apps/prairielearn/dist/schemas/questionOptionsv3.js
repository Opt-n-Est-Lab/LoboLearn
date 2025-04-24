import { z } from 'zod';
import { CommentJsonSchema } from './comment.js';
export const QuestionOptionsv3JsonSchema = z
    .object({
    comment: CommentJsonSchema.optional(),
})
    .passthrough()
    .describe('Options for a v3 question.');
//# sourceMappingURL=questionOptionsv3.js.map