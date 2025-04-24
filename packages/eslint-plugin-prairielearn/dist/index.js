"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const aws_client_mandatory_config_js_1 = require("./rules/aws-client-mandatory-config.js");
const aws_client_shared_config_js_1 = require("./rules/aws-client-shared-config.js");
const jsx_no_dollar_interpolation_js_1 = require("./rules/jsx-no-dollar-interpolation.js");
exports.rules = {
    'aws-client-mandatory-config': aws_client_mandatory_config_js_1.default,
    'aws-client-shared-config': aws_client_shared_config_js_1.default,
    'jsx-no-dollar-interpolation': jsx_no_dollar_interpolation_js_1.default,
};
//# sourceMappingURL=index.js.map