import {} from './types.js';
export * from './types.js';
const questionModules = {
    Calculation: await import('./calculation-subprocess.js'),
    Freeform: await import('./freeform.js'),
};
const effectiveQuestionTypes = {
    Calculation: 'Calculation',
    File: 'Calculation',
    Checkbox: 'Calculation',
    MultipleChoice: 'Calculation',
    MultipleTrueFalse: 'Calculation',
    Freeform: 'Freeform',
};
export function getEffectiveQuestionType(type) {
    if (type in effectiveQuestionTypes) {
        return effectiveQuestionTypes[type];
    }
    else {
        throw new Error('Unknown question type: ' + type);
    }
}
export function getModule(type) {
    return questionModules[getEffectiveQuestionType(type)];
}
//# sourceMappingURL=index.js.map