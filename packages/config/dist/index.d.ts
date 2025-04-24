import { z } from 'zod';
type AbstractConfig = Record<string, unknown>;
interface ConfigSource {
    load: (existingConfig: AbstractConfig) => Promise<AbstractConfig>;
}
export declare function makeLiteralConfigSource(config: AbstractConfig): {
    load: () => Promise<AbstractConfig>;
};
export declare function makeFileConfigSource(path: string): ConfigSource;
export declare function makeSecretsManagerConfigSource(tagKey: string): ConfigSource;
export declare function makeImdsConfigSource(): ConfigSource;
export declare class ConfigLoader<Schema extends z.ZodTypeAny> {
    private readonly schema;
    private readonly resolvedConfig;
    constructor(schema: Schema);
    loadAndValidate(sources?: ConfigSource[]): Promise<void>;
    get config(): z.TypeOf<Schema>;
}
export {};
