import type { Root as HastRoot } from 'hast';
import type { Root as MdastRoot } from 'mdast';
import { type Processor } from 'unified';
export declare function createProcessor({ mdastVisitors, hastVisitors, sanitize, }?: {
    mdastVisitors?: ((ast: MdastRoot) => undefined)[];
    hastVisitors?: ((ast: HastRoot) => undefined)[];
    sanitize?: boolean;
}): Processor<MdastRoot, MdastRoot, HastRoot, HastRoot, string>;
/**
 * Converts markdown to HTML. If `inline` is true, and the result fits a single
 * paragraph, the content is returned inline without the paragraph tag.
 */
export declare function markdownToHtml(original: string, { inline }?: {
    inline?: boolean;
}): Promise<string>;
