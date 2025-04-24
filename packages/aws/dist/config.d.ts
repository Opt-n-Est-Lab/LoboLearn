import { type AwsCredentialIdentityProvider } from '@smithy/types';
interface AwsClientConfig {
    region: string;
    [key: string]: any;
}
export declare function makeAwsConfigProvider({ credentials, getClientConfig, getS3ClientConfig, }: {
    credentials: AwsCredentialIdentityProvider;
    getClientConfig: () => AwsClientConfig;
    getS3ClientConfig?: () => Record<string, any>;
}): {
    makeAwsClientConfig: <T extends Record<string, any>>(extraConfig?: T) => {
        region: string;
        endpoint: string | undefined;
        credentials: import("@smithy/types").MemoizedProvider<import("@smithy/types").AwsCredentialIdentity>;
    } & T;
    makeS3ClientConfig: <T extends Record<string, any>>(extraConfig?: T) => {
        region: string;
        endpoint: string | undefined;
        credentials: import("@smithy/types").MemoizedProvider<import("@smithy/types").AwsCredentialIdentity>;
    } & {
        [x: string]: any;
    } & T;
};
export {};
