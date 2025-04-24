interface DiffOptions {
    coloredOutput?: boolean;
}
export declare function diffDatabases(database1: string, database2: string, options: DiffOptions): Promise<string>;
export declare function diffDatabaseAndDirectory(database: string, directory: string, options: DiffOptions): Promise<string>;
export declare function diffDirectoryAndDatabase(directory: string, database: string, options: DiffOptions): Promise<string>;
export declare function diffDirectories(directory1: string, directory2: string, options: DiffOptions): Promise<string>;
export {};
