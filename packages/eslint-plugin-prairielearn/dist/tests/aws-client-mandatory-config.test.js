"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const aws_client_mandatory_config_1 = require("../rules/aws-client-mandatory-config");
rule_tester_1.RuleTester.afterAll = after;
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('aws-client-mandatory-config', aws_client_mandatory_config_1.default, {
    valid: [
        {
            code: "import { S3 } from '@aws-sdk/client-s3'; new S3({ region: 'us-east-2' })",
        },
        {
            code: "import { S3Client } from '@aws-sdk/client-s3'; new S3Client({ region: 'us-east-2' })",
        },
        {
            code: "import { EC2 } from '@aws-sdk/client-ec2'; new EC2({ region: 'us-east-2' })",
        },
        {
            code: "import { EC2Client } from '@aws-sdk/client-ec2'; new EC2Client({ region: 'us-east-2' })",
        },
    ],
    invalid: [
        {
            code: "import { S3 } from '@aws-sdk/client-s3'; new S3()",
            errors: [{ messageId: 'missingConfig' }],
        },
    ],
});
//# sourceMappingURL=aws-client-mandatory-config.test.js.map