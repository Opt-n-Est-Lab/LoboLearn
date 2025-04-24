import {} from 'node:http';
import {} from 'express';
export async function withServer(app, fn) {
    const server = app.listen();
    await new Promise((resolve, reject) => {
        server.on('listening', () => resolve());
        server.on('error', (err) => reject(err));
    });
    try {
        await fn({
            server,
            port: getServerPort(server),
            url: `http://localhost:${getServerPort(server)}`,
        });
    }
    finally {
        server.close();
    }
}
function getServerPort(server) {
    const address = server.address();
    // istanbul ignore next
    if (!address)
        throw new Error('Server is not listening');
    // istanbul ignore next
    if (typeof address === 'string')
        throw new Error('Server is listening on a pipe');
    return address.port;
}
//# sourceMappingURL=test-utils.js.map