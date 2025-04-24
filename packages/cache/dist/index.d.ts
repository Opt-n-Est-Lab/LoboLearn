import { Redis } from 'ioredis';
import { LRUCache } from 'lru-cache';
export declare class Cache {
    enabled: boolean;
    type: string;
    memoryCache?: LRUCache<string, string>;
    redisClient?: Redis;
    keyPrefix: string;
    init(config: {
        type: 'none' | 'memory' | 'redis';
        keyPrefix: string;
        redisUrl?: string | null;
    }): Promise<void>;
    set(key: string, value: any, maxAgeMS: number): void;
    del(key: string): Promise<void>;
    /**
     * Returns the value for the corresponding key if it exists in the cache; null otherwise.
     */
    get(key: string): Promise<any>;
    /**
     * Clear all entries from the cache.
     */
    reset(): Promise<void>;
    /**
     * Releases any connections associated with the cache.
     */
    close(): Promise<void>;
}
export declare const cache: Cache;
