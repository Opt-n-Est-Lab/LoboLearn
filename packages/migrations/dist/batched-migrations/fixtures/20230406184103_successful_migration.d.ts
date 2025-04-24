declare const _default: {
    getParameters(): Promise<{
        min: bigint;
        max: bigint;
        batchSize: number;
    }>;
    execute(_min: bigint, _max: bigint): Promise<void>;
};
export default _default;
