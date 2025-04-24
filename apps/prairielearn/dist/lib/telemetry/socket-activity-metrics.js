import {} from 'node:net';
import * as opentelemetry from '@prairielearn/opentelemetry';
export class SocketActivityMetrics {
    sockets = new Set();
    bytesRead = 0;
    bytesWritten = 0;
    socketCounter;
    activeSocketsCounter;
    bytesReadCounter;
    bytesWrittenCounter;
    constructor(meter, prefix) {
        this.socketCounter = opentelemetry.getCounter(meter, `${prefix}.sockets`, {
            valueType: opentelemetry.ValueType.INT,
        });
        this.activeSocketsCounter = opentelemetry.getObservableCounter(meter, `${prefix}.sockets.active`, {
            valueType: opentelemetry.ValueType.INT,
        });
        this.bytesReadCounter = opentelemetry.getObservableCounter(meter, `${prefix}.sockets.bytes_read`, {
            valueType: opentelemetry.ValueType.INT,
        });
        this.bytesWrittenCounter = opentelemetry.getObservableCounter(meter, `${prefix}.sockets.bytes_written`, {
            valueType: opentelemetry.ValueType.INT,
        });
    }
    start() {
        this.activeSocketsCounter.addCallback(this.observeSocketCount);
        this.bytesReadCounter.addCallback(this.observeBytesRead);
        this.bytesWrittenCounter.addCallback(this.observeBytesWritten);
    }
    stop() {
        this.activeSocketsCounter.removeCallback(this.observeSocketCount);
        this.bytesReadCounter.removeCallback(this.observeBytesRead);
        this.bytesWrittenCounter.removeCallback(this.observeBytesWritten);
    }
    addSocket(socket) {
        if (this.sockets.has(socket)) {
            return;
        }
        this.sockets.add(socket);
        this.socketCounter.add(1);
        socket.on('close', () => {
            this.sockets.delete(socket);
            this.bytesRead += socket.bytesRead;
            this.bytesWritten += socket.bytesWritten;
        });
    }
    observeSocketCount = (observableResult) => {
        observableResult.observe(this.sockets.size);
    };
    observeBytesRead = (observableResult) => {
        let bytesRead = this.bytesRead;
        for (const socket of this.sockets) {
            bytesRead += socket.bytesRead;
        }
        observableResult.observe(bytesRead);
    };
    observeBytesWritten = (observableResult) => {
        let bytesWritten = this.bytesWritten;
        for (const socket of this.sockets) {
            bytesWritten += socket.bytesWritten;
        }
        observableResult.observe(bytesWritten);
    };
}
//# sourceMappingURL=socket-activity-metrics.js.map