import { Writable } from 'node:stream';
import winston from 'winston';
import { config } from './config.js';
export class BufferedWritableStream extends Writable {
    buffer;
    maxBuffer;
    bufferSize;
    constructor(options) {
        super(options);
        this.buffer = [];
        this.maxBuffer = options?.maxBuffer ?? null;
        this.bufferSize = 0;
    }
    _write(chunk, _encoding, callback) {
        // If we've already reached the max buffer size, just drop the chunk.
        if (this.bufferSize === this.maxBuffer) {
            callback();
            return;
        }
        const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        if (this.maxBuffer && this.bufferSize + buffer.length > this.maxBuffer) {
            const remainingBytes = this.maxBuffer - this.bufferSize;
            this.buffer.push(buffer.subarray(0, remainingBytes));
            this.bufferSize = this.maxBuffer;
            callback();
            return;
        }
        this.bufferSize += buffer.length;
        this.buffer.push(buffer);
        callback();
    }
    getBuffer() {
        return Buffer.concat(this.buffer);
    }
}
export function makeJobLogger() {
    const transports = [];
    const bufferedStream = new BufferedWritableStream({
        // Collect at most 1MB of logs.
        maxBuffer: 1024 * 1024,
    });
    if (config.useConsoleLoggingForJobs) {
        transports.push(new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }));
    }
    transports.push(new winston.transports.Stream({
        stream: bufferedStream,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }));
    const logger = winston.createLogger({ transports });
    return Object.assign(logger, {
        getBuffer() {
            return bufferedStream.getBuffer();
        },
    });
}
//# sourceMappingURL=jobLogger.js.map