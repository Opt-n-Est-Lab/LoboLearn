import { type ECRClient } from '@aws-sdk/client-ecr';
export interface DockerAuth {
    username: string;
    password: string;
}
export declare function setupDockerAuth(ecr: ECRClient): Promise<DockerAuth>;
/**
 * Borrowed from https://github.com/apocas/dockerode/blob/master/lib/util.js
 * but turned into a class to manipulate which part of the docker image name
 * we need.
 */
export declare class DockerName {
    protected original: string;
    protected registry: string | undefined;
    protected repository: string;
    protected tag: string | undefined;
    constructor(name: string);
    setRegistry(registry: string | undefined): void;
    getRepository(): string;
    getTag(): string | undefined;
    getRegistryRepo(): string;
    getCombined(latestTag?: boolean): string;
}
