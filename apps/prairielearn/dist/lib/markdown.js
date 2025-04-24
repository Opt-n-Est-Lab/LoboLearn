import { visit } from 'unist-util-visit';
import { html, joinHtml } from '@prairielearn/html';
import { createProcessor } from '@prairielearn/markdown';
// The ? symbol is used to make the match non-greedy (i.e., match the shortest
// possible string that fulfills the regex). See
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers#types
const regex = /<markdown>(.*?)<\/markdown>/gms;
const escapeRegex = /(<\/?markdown)(#+)>/g;
const langRegex = /([^\\{]*)?(\{(.*)\})?/;
function visitCodeBlock(ast) {
    return visit(ast, 'code', (node, index, parent) => {
        const { lang, value } = node;
        const attrs = [];
        const res = lang?.match(langRegex);
        if (res) {
            const language = res[1];
            const highlightLines = res[3];
            if (language) {
                attrs.push(html `language="${language}"`);
            }
            if (highlightLines) {
                attrs.push(html `highlight-lines="${highlightLines}"`);
            }
        }
        const newNode = {
            type: 'html',
            value: html `<pl-code ${joinHtml(attrs, ' ')}>${value}</pl-code>`.toString(),
        };
        parent?.children.splice(index ?? 0, 1, newNode);
    });
}
// The question processor also includes the use of pl-code instead of pre,
// and does not sanitize scripts
const questionProcessor = createProcessor({ mdastVisitors: [visitCodeBlock], sanitize: false });
export function processQuestion(html) {
    return html.replace(regex, (_match, originalContents) => {
        // We'll handle escapes before we pass off the string to our Markdown pipeline
        const decodedContents = originalContents.replace(escapeRegex, (_match, prefix, hashes) => {
            return `${prefix}${'#'.repeat(hashes.length - 1)}>`;
        });
        const res = questionProcessor.processSync(decodedContents);
        return res.value.toString();
    });
}
//# sourceMappingURL=markdown.js.map