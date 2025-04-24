import { Stringifier, stringify } from 'csv-stringify';
import multipipe from 'multipipe';
import { transform } from 'stream-transform';
export { stringify, Stringifier };
/**
 * Streaming transform from an array of objects to a CSV that doesn't
 * block the event loop.
 */
export function stringifyNonblocking(data, options = {}) {
    const { batchSize = 100, ...stringifierOptions } = options;
    const stringifier = new Stringifier(stringifierOptions);
    process.nextTick(function () {
        let j = 0;
        function loop() {
            for (let i = 0; i < batchSize; i++) {
                if (j < data.length) {
                    stringifier.write(data[j]);
                    j += 1;
                }
                else {
                    stringifier.end();
                    return;
                }
            }
            setImmediate(loop);
        }
        loop();
    });
    return stringifier;
}
/**
 * Transforms an object stream into a CSV stream.
 *
 * This is a thin wrapper around `stringify` from the `csv-stringify` package
 * with added support for transforming the input stream.
 *
 * Works best when combined with the `pipeline` function from
 * `node:stream/promises`, which will help ensure that errors are handled properly.
 */
export function stringifyStream(options = {}) {
    const { transform: _transform, ...stringifierOptions } = options;
    const stringifier = new Stringifier(stringifierOptions);
    if (!_transform)
        return stringifier;
    // TODO: use native `node:stream#compose` once it's stable.
    return multipipe(transform(_transform), stringifier);
}
//# sourceMappingURL=index.js.map