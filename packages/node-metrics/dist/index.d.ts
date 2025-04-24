import { type CloudWatchClientConfig, type Dimension } from '@aws-sdk/client-cloudwatch';
interface NodeMetricsOptions {
    awsConfig: CloudWatchClientConfig;
    intervalSeconds: number;
    dimensions: Dimension[];
    onError: (err: Error) => void;
}
export declare function start(options: NodeMetricsOptions): void;
export declare function stop(): void;
export {};
