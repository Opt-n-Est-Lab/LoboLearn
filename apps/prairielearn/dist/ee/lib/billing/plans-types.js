export const PLAN_FEATURE_NAMES = [
    'course-instance-access',
    'external-grading',
    'workspaces',
];
export const PLAN_NAMES = ['basic', 'compute', 'everything'];
export const PLANS = {
    // Enabled when student billing for enrollments is enabled for a course instance.
    basic: {
        features: ['course-instance-access'],
    },
    // Enables workspaces and external grading. Can be used in combination with
    // the `basic` plan (for a course using student billing for enrollments) or
    // in isolation (a course instance's institution is paying for the basic plan
    // but the course instance wants to use workspaces and external grading).
    compute: {
        features: ['workspaces', 'external-grading'],
    },
    // All features that exist.
    everything: {
        features: ['workspaces', 'external-grading'],
    },
};
export function getFeaturesForPlans(plans) {
    const features = new Set();
    for (const plan of plans) {
        PLANS[plan].features.forEach((feature) => features.add(feature));
    }
    return Array.from(features);
}
export function planGrantsMatchPlanFeatures(grantedPlans, plans) {
    const planGrantsFeatures = getFeaturesForPlans(grantedPlans);
    const planFeatures = getFeaturesForPlans(plans);
    return (planGrantsFeatures.length === planFeatures.length &&
        planGrantsFeatures.every((feature) => planFeatures.includes(feature)));
}
//# sourceMappingURL=plans-types.js.map