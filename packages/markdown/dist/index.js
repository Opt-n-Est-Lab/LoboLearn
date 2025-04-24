import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
/**
 * This visitor is used for inline markdown processing, particularly for cases where the result is
 * expected to be shown in a single line without a block. In essence, if the result of the
 * conversion contains a single paragraph (`p`) with some content, it replaces the paragraph itself
 * with the content of the paragraph.
 */
function visitCheckSingleParagraph(ast) {
    return visit(ast, 'root', (node) => {
        if (node.children.length === 1) {
            const child = node.children[0];
            if (child.tagName === 'p') {
                node.children = child.children;
            }
        }
    });
}
/**
 * By default, `remark-math` installs compilers to transform the AST back into
 * HTML, which ends up wrapping the math in unwanted spans and divs. Since all
 * math will be rendered on the client, we have our own visitor that will replace
 * any `math` or `inlineMath` nodes with raw text values wrapped in the appropriate
 * fences.
 */
function visitMathBlock(ast) {
    return visit(ast, ['math', 'inlineMath'], (node, index, parent) => {
        const startFence = node.type === 'math' ? '$$\n' : '$';
        const endFence = node.type === 'math' ? '\n$$' : '$';
        const text = {
            type: 'text',
            value: startFence + node.value + endFence,
        };
        parent?.children.splice(index ?? 0, 1, text);
    });
}
function makeHandler(visitor) {
    return () => (ast, vFile, callback) => {
        visitor(ast);
        if (typeof callback === 'function') {
            return callback(undefined, ast, vFile);
        }
        return ast;
    };
}
export function createProcessor({ mdastVisitors, hastVisitors, sanitize = true, } = {}) {
    const htmlConversion = (mdastVisitors ?? [])
        .reduce((processor, visitor) => processor.use(makeHandler(visitor)), unified().use(remarkParse).use(remarkMath))
        .use(makeHandler(visitMathBlock))
        .use(remarkGfm)
        .use(remark2rehype, { allowDangerousHtml: true })
        .use(rehypeRaw);
    return (hastVisitors ?? [])
        .reduce((processor, visitor) => processor.use(makeHandler(visitor)), sanitize ? htmlConversion.use(rehypeSanitize) : htmlConversion)
        .use(rehypeStringify);
}
const defaultProcessor = createProcessor();
const inlineProcessor = createProcessor({ hastVisitors: [visitCheckSingleParagraph] });
/**
 * Converts markdown to HTML. If `inline` is true, and the result fits a single
 * paragraph, the content is returned inline without the paragraph tag.
 */
export async function markdownToHtml(original, { inline } = {}) {
    return (await (inline ? inlineProcessor : defaultProcessor).process(original)).value.toString();
}
//# sourceMappingURL=index.js.map