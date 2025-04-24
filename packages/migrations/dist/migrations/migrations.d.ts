import { type MigrationFile } from '../load-migrations.js';
export declare function init(directories: string | string[], project: string): Promise<void>;
export declare function getMigrationsToExecute(migrationFiles: MigrationFile[], executedMigrations: {
    timestamp: string | null;
}[]): MigrationFile[];
export declare function initWithLock(directories: string[], project: string): Promise<void>;
