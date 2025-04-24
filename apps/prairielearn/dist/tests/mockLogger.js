import * as stream from 'stream';
import winston from 'winston';
export function makeMockLogger() {
    const logStream = new stream.Writable();
    const messages = [];
    logStream._write = (chunk, encoding, next) => {
        const logString = chunk.toString('utf8');
        const logObject = JSON.parse(logString);
        messages.push(logObject.message);
        next();
    };
    const streamTransport = new winston.transports.Stream({ stream: logStream });
    const logger = winston.createLogger({ transports: [streamTransport] });
    const getOutput = () => {
        return messages.join('\n');
    };
    return { logger, getOutput };
}
//# sourceMappingURL=mockLogger.js.map