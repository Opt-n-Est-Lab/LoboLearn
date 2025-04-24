"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const jsx_no_dollar_interpolation_1 = require("../rules/jsx-no-dollar-interpolation");
rule_tester_1.RuleTester.afterAll = after;
const ruleTester = new rule_tester_1.RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});
ruleTester.run('jsx-no-dollar-interpolation', jsx_no_dollar_interpolation_1.default, {
    valid: [
        {
            code: '<div>hello</div>',
        },
        {
            code: '<div>100$</div>',
        },
        {
            code: '<div>$100</div>',
        },
        {
            code: '<div>$</div>',
        },
    ],
    invalid: [
        {
            // eslint-disable-next-line no-template-curly-in-string
            code: '<div>${message}</div>',
            errors: [
                {
                    messageId: 'dollarInterpolationNotAllowed',
                    line: 1,
                    column: 6,
                    endLine: 1,
                    endColumn: 16,
                },
            ],
        },
        {
            code: '<div>$ {message}</div>',
            errors: [
                {
                    messageId: 'dollarInterpolationNotAllowed',
                    line: 1,
                    column: 6,
                    endLine: 1,
                    endColumn: 17,
                },
            ],
        },
    ],
});
//# sourceMappingURL=jsx-no-dollar-interpolation.test.js.map