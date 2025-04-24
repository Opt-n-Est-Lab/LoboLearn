export declare const logger: import("winston").Logger;
interface AddFileLoggingOptions {
    filename: string;
    level?: string;
}
export declare function addFileLogging(options: AddFileLoggingOptions): void;
export {};
