import { ESLintUtils } from '@typescript-eslint/utils';
/**
 * This rule will report things that look like template string interpolations
 * that were improperly converted to JSX. For example, the following code will
 * trigger an error:
 *
 * ```tsx
 * const a = <div>${message}</div>;
 * const b = <div>$ {message}</div>;
 * ```
 */
declare const _default: ESLintUtils.RuleModule<"dollarInterpolationNotAllowed", [], unknown, ESLintUtils.RuleListener>;
export default _default;
