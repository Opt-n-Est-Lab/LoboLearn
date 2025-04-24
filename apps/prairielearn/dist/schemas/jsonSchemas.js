import {} from 'ajv';
import {} from 'zod';
import { ignoreOverride, zodToJsonSchema, } from 'zod-to-json-schema';
import { CommentJsonSchema } from './comment.js';
import { AdvanceScorePercJsonSchema, AssessmentAccessRuleJsonSchema, AssessmentJsonSchema, ForceMaxPointsJsonSchema, GroupRoleJsonSchema, PointsJsonSchema, PointsListJsonSchema, PointsSingleJsonSchema, QuestionAlternativeJsonSchema, QuestionIdJsonSchema, ZoneAssessmentJsonSchema, ZoneQuestionJsonSchema, } from './infoAssessment.js';
import { ColorJsonSchema, CourseJsonSchema } from './infoCourse.js';
import { CourseInstanceJsonSchema } from './infoCourseInstance.js';
import { ElementCoreJsonSchema } from './infoElementCore.js';
import { ElementCourseJsonSchema } from './infoElementCourse.js';
import { ElementExtensionJsonSchema } from './infoElementExtension.js';
import { NewsItemJsonSchema } from './infoNewsItem.js';
import { QuestionJsonSchema } from './infoQuestion.js';
import { QuestionCalculationOptionsJsonSchema, } from './questionOptionsCalculation.js';
import { QuestionCheckboxOptionsJsonSchema } from './questionOptionsCheckbox.js';
import { QuestionFileOptionsJsonSchema, } from './questionOptionsFile.js';
import { QuestionMultipleChoiceOptionsJsonSchema, } from './questionOptionsMultipleChoice.js';
import { QuestionMultipleTrueFalseOptionsJsonSchema, } from './questionOptionsMultipleTrueFalse.js';
import { QuestionOptionsv3JsonSchema } from './questionOptionsv3.js';
/**
 * Rewrite the group role annotation for canView and canSubmit fields.
 * zod-to-json-schema doesn't support a concept of unique items in an array (only sets),
 * so we need to override the schema.
 */
const rewriteGroupRoleAnnotation = (def, refs) => {
    const segment = refs.currentPath[refs.currentPath.length - 1];
    if (['canView', 'canSubmit'].includes(segment)) {
        const action = segment === 'canView' ? 'view' : 'submit';
        const inZone = refs.currentPath.includes('ZoneAssessmentJsonSchema');
        let annotation = `A list of group role names matching those in groupRoles that can ${action} the question. Only applicable for group assessments.`;
        if (inZone) {
            annotation = `A list of group role names that can ${action} questions in this zone. Only applicable for group assessments.`;
        }
        return {
            description: annotation,
            type: 'array',
            items: {
                type: 'string',
            },
            uniqueItems: true,
            default: [],
        };
    }
    return ignoreOverride;
};
const prairielearnZodToJsonSchema = (schema, options) => {
    const jsonSchema = zodToJsonSchema(schema, {
        ...options,
        override: rewriteGroupRoleAnnotation,
        // Many people have done insane things in their JSON files that don't pass
        // strict validation. For now, we'll be lenient and avoid the use of `.strict()`
        // in our Zod schemas in places where that could cause problems. In the
        // long run, we'll work towards getting all JSON compliant with strict schemas.
        removeAdditionalStrategy: 'strict',
    });
    // Traverse the schema: if `DEPRECATED` in the description, add a `deprecated`: true field.
    const traverse = (input) => {
        if (typeof input?.description === 'string' &&
            input?.description.toLowerCase().includes('deprecated')) {
            input.deprecated = true;
        }
        for (const value of Object.values(input)) {
            if (typeof value === 'object' && value !== null) {
                traverse(value);
            }
        }
    };
    traverse(jsonSchema);
    return jsonSchema;
};
export const infoNewsItem = prairielearnZodToJsonSchema(NewsItemJsonSchema, {
    name: 'News Item Info',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const infoAssessment = prairielearnZodToJsonSchema(AssessmentJsonSchema, {
    name: 'Assessment info',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: {
        PointsJsonSchema,
        PointsListJsonSchema,
        PointsSingleJsonSchema,
        QuestionIdJsonSchema,
        ForceMaxPointsJsonSchema,
        AssessmentAccessRuleJsonSchema,
        QuestionAlternativeJsonSchema,
        ZoneAssessmentJsonSchema,
        ZoneQuestionJsonSchema,
        GroupRoleJsonSchema,
        AdvanceScorePercJsonSchema,
        CommentJsonSchema,
    },
});
export const infoCourse = prairielearnZodToJsonSchema(CourseJsonSchema, {
    name: 'Course information',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { ColorJsonSchema, CommentJsonSchema },
});
export const infoCourseInstance = prairielearnZodToJsonSchema(CourseInstanceJsonSchema, {
    name: 'Course instance information',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const infoElementCore = prairielearnZodToJsonSchema(ElementCoreJsonSchema, {
    name: 'Element Info',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const infoElementCourse = prairielearnZodToJsonSchema(ElementCourseJsonSchema, {
    name: 'Element Info',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const infoElementExtension = prairielearnZodToJsonSchema(ElementExtensionJsonSchema, {
    name: 'Element Extension Info',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const infoQuestion = prairielearnZodToJsonSchema(QuestionJsonSchema, {
    name: 'Question Info',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: {
        CommentJsonSchema,
    },
});
export const questionOptionsCalculation = prairielearnZodToJsonSchema(QuestionCalculationOptionsJsonSchema, {
    name: 'Calculation question options',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const questionOptionsCheckbox = prairielearnZodToJsonSchema(QuestionCheckboxOptionsJsonSchema, {
    name: 'Checkbox question options',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const questionOptionsFile = prairielearnZodToJsonSchema(QuestionFileOptionsJsonSchema, {
    name: 'File question options',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const questionOptionsMultipleChoice = prairielearnZodToJsonSchema(QuestionMultipleChoiceOptionsJsonSchema, {
    name: 'MultipleChoice question options',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const questionOptionsMultipleTrueFalse = prairielearnZodToJsonSchema(QuestionMultipleTrueFalseOptionsJsonSchema, {
    name: 'MultipleTrueFalse question options',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const questionOptionsv3 = prairielearnZodToJsonSchema(QuestionOptionsv3JsonSchema, {
    name: 'v3 question options',
    nameStrategy: 'title',
    target: 'jsonSchema7',
    definitions: { CommentJsonSchema },
});
export const ajvSchemas = {
    infoNewsItem,
    infoAssessment,
    infoCourse,
    infoCourseInstance,
    infoElementCore,
    infoElementCourse,
    infoElementExtension,
    infoQuestion,
    questionOptionsCalculation,
    questionOptionsCheckbox,
    questionOptionsFile,
    questionOptionsMultipleChoice,
    questionOptionsMultipleTrueFalse,
    questionOptionsv3,
};
//# sourceMappingURL=jsonSchemas.js.map