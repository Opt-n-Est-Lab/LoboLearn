export function onDocumentReady(fn) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', () => {
            fn();
        });
    }
}
//# sourceMappingURL=on-document-ready.js.map