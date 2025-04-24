export function timed(fn, done) {
    const start = performance.now();
    const result = fn();
    if (result instanceof Promise) {
        return result.finally(() => {
            const duration = performance.now() - start;
            done(duration);
        });
    }
    else {
        const duration = performance.now() - start;
        done(duration);
        return result;
    }
}
//# sourceMappingURL=timed.js.map