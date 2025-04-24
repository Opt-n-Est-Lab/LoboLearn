interface CheckOptions {
    maxAge?: number;
}
export declare function generateSignedToken(data: any, secretKey: string): string;
export declare function getCheckedSignedTokenData(token: string, secretKey: string, options?: CheckOptions): any;
export declare function checkSignedToken(token: string, data: any, secretKey: string, options?: CheckOptions): boolean;
export {};
