import { FeatureManager } from './manager.js';
const featureNames = [
    'course-instance-billing',
    'enforce-plan-grants-for-questions',
    // Should only be applied to courses/institutions.
    'process-questions-in-server',
    'question-sharing',
    'consume-public-questions',
    'ai-grading',
    'disable-public-workspaces',
    'ai-question-generation',
    // Should only be applied to institutions.
    'lti13',
    // Should only be applied globally.
    'enhanced-navigation-user-toggle',
    // Can be applied to any context.
    'enhanced-navigation',
];
const features = new FeatureManager(featureNames);
export { features };
//# sourceMappingURL=index.js.map