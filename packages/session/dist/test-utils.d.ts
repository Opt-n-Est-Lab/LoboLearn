import { type Server } from 'node:http';
import { type Express } from 'express';
interface WithServerContext {
    server: Server;
    port: number;
    url: string;
}
export declare function withServer(app: Express, fn: (ctx: WithServerContext) => Promise<void>): Promise<void>;
export {};
