export interface MigrationFile {
    directory: string;
    filename: string;
    timestamp: string;
}
export declare function readAndValidateMigrationsFromDirectory(dir: string, extensions: string[]): Promise<MigrationFile[]>;
export declare function readAndValidateMigrationsFromDirectories(directories: string[], extensions: string[]): Promise<MigrationFile[]>;
export declare function sortMigrationFiles(migrationFiles: MigrationFile[]): MigrationFile[];
export declare function parseAnnotations(contents: string): Set<string>;
