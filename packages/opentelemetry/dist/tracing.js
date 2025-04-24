import { SpanStatusCode, trace } from '@opentelemetry/api';
export async function instrumented(name, fn) {
    return trace
        .getTracer('default')
        .startActiveSpan(name, async (span) => {
        try {
            const result = await fn(span);
            span.setStatus({ code: SpanStatusCode.OK });
            return result;
        }
        catch (e) {
            span.setStatus({
                code: SpanStatusCode.ERROR,
                message: e.message,
            });
            span.recordException(e);
            throw e;
        }
        finally {
            span.end();
        }
    });
}
//# sourceMappingURL=tracing.js.map