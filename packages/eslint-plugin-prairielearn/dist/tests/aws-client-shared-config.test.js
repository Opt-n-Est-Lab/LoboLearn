"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const aws_client_shared_config_1 = require("../rules/aws-client-shared-config");
rule_tester_1.RuleTester.afterAll = after;
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('aws-client-shared-config', aws_client_shared_config_1.default, {
    valid: [
        {
            code: "import { S3 } from '@aws-sdk/client-s3'; new S3(makeS3ClientConfig());",
        },
        {
            code: "import { S3Client } from '@aws-sdk/client-s3'; new S3Client(makeS3ClientConfig());",
        },
        {
            code: "import { EC2 } from '@aws-sdk/client-ec2'; new EC2(makeAwsClientConfig());",
        },
        {
            code: "import { EC2Client } from '@aws-sdk/client-ec2'; new EC2Client(makeAwsClientConfig());",
        },
        {
            code: "import { EC2 } from '@aws-sdk/client-ec2'; new EC2(aws.makeAwsClientConfig());",
        },
    ],
    invalid: [
        {
            code: "import { S3 } from '@aws-sdk/client-s3'; new S3({ region: 'us-east-2' });",
            errors: [{ messageId: 'improperConfig' }],
        },
        {
            code: "import { EC2 } from '@aws-sdk/client-ec2'; new EC2({ region: 'us-east-2' });",
            errors: [{ messageId: 'improperConfig' }],
        },
        {
            code: "import { S3 } from '@aws-sdk/client-s3'; new S3(wrongFunction());",
            errors: [{ messageId: 'improperConfig' }],
        },
    ],
});
//# sourceMappingURL=aws-client-shared-config.test.js.map