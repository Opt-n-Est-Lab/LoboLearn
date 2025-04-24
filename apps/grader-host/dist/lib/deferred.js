/**
 * Returns an object that can be used to resolve or reject a promise from
 * the outside.
 */
export function deferredPromise() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    if (resolve === undefined || reject === undefined) {
        throw new Error('resolve or reject is undefined');
    }
    return {
        resolve,
        reject,
        promise,
    };
}
//# sourceMappingURL=deferred.js.map