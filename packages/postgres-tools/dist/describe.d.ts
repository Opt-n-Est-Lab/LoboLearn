interface ColumnDescription {
    name: string;
    type: string;
    notnull: boolean;
    default: any;
}
interface IndexDescription {
    name: string;
    isprimary: boolean;
    isunique: boolean;
    indexdef: string;
    constraintdef: string;
    contype: string;
}
interface ForeignKeyConstraintDescription {
    name: string;
    def: string;
}
interface ReferenceDescription {
    name: string;
    table: string;
    condef: string;
}
interface CheckConstraintDescription {
    name: string;
    def: string;
}
interface TableDescription {
    columns: ColumnDescription[];
    indexes: IndexDescription[];
    foreignKeyConstraints: ForeignKeyConstraintDescription[];
    references: ReferenceDescription[];
    checkConstraints: CheckConstraintDescription[];
}
export interface DatabaseDescription {
    tables: Record<string, TableDescription>;
    enums: Record<string, string[]>;
}
interface DescribeOptions {
    ignoreTables?: string[];
    ignoreColumns?: string[];
    ignoreEnums?: string[];
}
/**
 * Will produce a description of a given database's schema. This will include
 * information about tables, enums, constraints, indices, etc.
 */
export declare function describeDatabase(databaseName: string, options?: DescribeOptions): Promise<DatabaseDescription>;
export declare function formatDatabaseDescription(description: DatabaseDescription, options?: {
    coloredOutput: boolean;
}): {
    tables: Record<string, string>;
    enums: Record<string, string>;
};
export {};
