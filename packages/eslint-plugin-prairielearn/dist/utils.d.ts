/**
 * Determines if the given identifier name corresponds to a client from the
 * given package.
 */
export declare function isIdentifierClient(identifierName: string, packageName: string): boolean;
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
export declare function getAwsClientNamesFromImportDeclaration(node: any): Set<string>;
