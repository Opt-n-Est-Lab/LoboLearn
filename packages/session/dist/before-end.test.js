import { assert } from 'chai';
import express, {} from 'express';
import fetch from 'node-fetch';
import { withServer } from '@prairielearn/express-test-utils';
import { beforeEnd } from './before-end.js';
describe('beforeEnd', () => {
    it('handles errors correctly', async () => {
        const app = express();
        app.use((_req, res, next) => {
            beforeEnd(res, next, async () => {
                throw new Error('oops');
            });
            next();
        });
        app.get('/', (_req, res) => res.sendStatus(200));
        let error = null;
        app.use((err, _req, _res, next) => {
            error = err;
            next();
        });
        await withServer(app, async ({ url }) => {
            const res = await fetch(url);
            assert.equal(res.status, 200);
            assert.equal(error?.message, 'oops');
        });
    });
});
//# sourceMappingURL=before-end.test.js.map