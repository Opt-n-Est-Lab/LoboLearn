import { ESLintUtils } from '@typescript-eslint/utils';
/**
 * This rule enforces that we always explicitly provide a config to AWS clients.
 * This helps ensure that we always construct a client with a specific region.
 *
 * This rules works in tandem with `aws-client-shared-config` to ensure that
 * we're properly configuring AWS SDK clients.
 */
declare const _default: ESLintUtils.RuleModule<"missingConfig", [], unknown, ESLintUtils.RuleListener>;
export default _default;
