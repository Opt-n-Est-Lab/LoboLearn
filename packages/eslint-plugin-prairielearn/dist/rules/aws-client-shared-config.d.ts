import { ESLintUtils } from '@typescript-eslint/utils';
/**
 * This ESLint rules enforces that we always provide a "shared" config to AWS
 * clients.
 *
 * This rule is extremely opinionated: it checks that the first argument to an
 * AWS client constructor consists of a function call to a function named
 * `makeAwsClientConfig()` (or `makeS3ClientConfig()` for S3 clients). This
 * is our convention to ensure that all clients will reuse credential providers,
 * which is important for ensuring that we don't overload IMDS with requests
 * for credentials if we construct a lot of clients in rapid succession.
 *
 * This is perhaps less than ideal, but the risk of misconfiguring a client is
 * high enough that we err towards being extremely prescriptive about how we
 * configure them.
 *
 * This rules works in tandem with `aws-client-mandatory-config` to ensure that
 * we're properly configuring AWS SDK clients.
 */
declare const _default: ESLintUtils.RuleModule<"improperConfig" | "unknownConfig", [], unknown, ESLintUtils.RuleListener>;
export default _default;
