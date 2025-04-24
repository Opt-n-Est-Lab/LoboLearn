import type { RequestHandler } from 'express';
import { type HtmlSafeString } from '@prairielearn/html';
type AssetsManifest = Record<string, string>;
export interface CompiledAssetsOptions {
    /**
     * Whether the app is running in dev mode. If dev mode is enabled, then
     * assets will be built on the fly as they're requested. Otherwise, assets
     * should have been pre-compiled to the `buildDirectory` directory.
     */
    dev?: boolean;
    /** Root directory of assets. */
    sourceDirectory?: string;
    /** Directory where the built assets will be output to. */
    buildDirectory?: string;
    /** The path that assets will be served from, e.g. `/build/`. */
    publicPath?: string;
}
export declare function init(newOptions: Partial<CompiledAssetsOptions>): Promise<void>;
/**
 * Shuts down the development assets compiler if it is running.
 */
export declare function close(): Promise<void>;
export declare function assertConfigured(): void;
export declare function handler(): RequestHandler;
export declare function compiledScriptPath(sourceFile: string): string;
export declare function compiledStylesheetPath(sourceFile: string): string;
export declare function compiledScriptTag(sourceFile: string): HtmlSafeString;
export declare function compiledStylesheetTag(sourceFile: string): HtmlSafeString;
export declare function build(sourceDirectory: string, buildDirectory: string): Promise<AssetsManifest>;
export {};
