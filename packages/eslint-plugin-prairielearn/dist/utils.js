"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdentifierClient = isIdentifierClient;
exports.getAwsClientNamesFromImportDeclaration = getAwsClientNamesFromImportDeclaration;
/**
 * Determines if the given identifier name corresponds to a client from the
 * given package.
 */
function isIdentifierClient(identifierName, packageName) {
    // If the identifier ends with "Client", include it in the set.
    if (identifierName.endsWith('Client')) {
        return true;
    }
    // If the identifier matches the package name directly, include it in the set.
    const clientName = packageName.replace('@aws-sdk/client-', '');
    const packageIdentifier = clientName.replace(/-/g, '').toLowerCase();
    if (identifierName.toLowerCase() === packageIdentifier) {
        return true;
    }
    return false;
}
/**
 * Retrieves the names of AWS clients specified by the given import declaration.
 *
 * For instance, if the import declaration is:
 *
 * ```ts
 * import { S3, S3Client } from '@aws-sdk/client-s3';
 * ```
 *
 * then this function will return a set containing the strings "S3" and "S3Client".
 */
function getAwsClientNamesFromImportDeclaration(node) {
    const clientNames = new Set();
    const importSource = node.source.value;
    if (importSource.startsWith('@aws-sdk/client-')) {
        node.specifiers.forEach((specifier) => {
            if (specifier.type === 'ImportSpecifier') {
                const specifierName = specifier.imported.name;
                if (isIdentifierClient(specifierName, importSource)) {
                    clientNames.add(specifierName);
                }
            }
        });
    }
    return clientNames;
}
//# sourceMappingURL=utils.js.map