import { Emitter } from '@socket.io/redis-emitter';
import { Redis } from 'ioredis';
import { config } from './config.js';
export let io;
let client;
export function init() {
    client = new Redis(config.redisUrl);
    io = new Emitter(client);
}
export async function close() {
    await client?.quit();
}
//# sourceMappingURL=socket-server.js.map