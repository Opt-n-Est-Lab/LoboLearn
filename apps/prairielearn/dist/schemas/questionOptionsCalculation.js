import { z } from 'zod';
import { CommentJsonSchema } from './comment.js';
export const QuestionCalculationOptionsJsonSchema = z
    .object({
    comment: CommentJsonSchema.optional(),
})
    .passthrough()
    .describe('Options for a Calculation question.');
//# sourceMappingURL=questionOptionsCalculation.js.map