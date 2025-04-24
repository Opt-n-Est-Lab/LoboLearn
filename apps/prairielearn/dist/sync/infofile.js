export function hasUuid(infoFile) {
    return !!infoFile.uuid;
}
export function hasErrors(infoFile) {
    return infoFile.errors.length > 0;
}
export function hasWarnings(infoFile) {
    return infoFile.warnings.length > 0;
}
export function hasErrorsOrWarnings(infoFile) {
    return hasErrors(infoFile) || hasWarnings(infoFile);
}
export function stringifyErrors(infoFile) {
    return infoFile.errors.join('\n');
}
export function stringifyWarnings(infoFile) {
    return infoFile.warnings.join('\n');
}
export function addError(infoFile, error) {
    infoFile.errors.push(error);
}
export function addErrors(infoFile, errors) {
    infoFile.errors = infoFile.errors.concat(errors);
}
export function addWarning(infoFile, warning) {
    infoFile.warnings.push(warning);
}
export function addWarnings(infoFile, warnings) {
    infoFile.warnings = infoFile.warnings.concat(warnings);
}
export function makeInfoFile(infoFile = {}) {
    return { ...infoFile, errors: [], warnings: [] };
}
export function makeError(error) {
    return { errors: [error], warnings: [] };
}
export function makeWarning(warning) {
    return { warnings: [warning], errors: [] };
}
//# sourceMappingURL=infofile.js.map