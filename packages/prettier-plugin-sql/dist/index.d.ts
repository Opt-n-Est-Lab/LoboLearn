import type { AstPath } from 'prettier';
export declare const languages: {
    name: string;
    parsers: string[];
    extensions: string[];
}[];
export declare const parsers: {
    sql: {
        parse: (text: string) => string;
        astFormat: string;
        locStart: () => number;
        locEnd: () => number;
    };
};
export declare const printers: {
    sql: {
        print(path: AstPath): string;
    };
};
export declare const options: {};
