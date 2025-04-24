import fetch from 'node-fetch';
import { z } from 'zod';
const IMDS_URI = 'http://169.254.169.254';
const TOKEN_PATH = '/latest/api/token';
const TOKEN_TTL = 21_600; // 6 hours
const InstanceIdentitySchema = z.object({
    availabilityZone: z.string(),
    privateIp: z.string(),
    version: z.string(),
    instanceId: z.string(),
    instanceType: z.string(),
    accountId: z.string(),
    imageId: z.string(),
    pendingTime: z.string(),
    architecture: z.string(),
    region: z.string(),
});
let cachedToken = null;
let cachedTokenExpiration = 0;
async function getToken() {
    if (cachedToken && Date.now() < cachedTokenExpiration) {
        return cachedToken;
    }
    cachedTokenExpiration = Date.now() + TOKEN_TTL * 1000;
    const tokenRes = await fetch(`${IMDS_URI}${TOKEN_PATH}`, {
        method: 'PUT',
        headers: {
            'X-aws-ec2-metadata-token-ttl-seconds': TOKEN_TTL.toString(),
        },
        signal: AbortSignal.timeout(5_000),
    });
    if (!tokenRes.ok) {
        throw new Error(`Failed to get IMDS token: ${tokenRes.status} ${tokenRes.statusText}`);
    }
    cachedToken = await tokenRes.text();
    return cachedToken;
}
export async function fetchImdsText(path) {
    const token = await getToken();
    const res = await fetch(`${IMDS_URI}${path}`, {
        headers: {
            'X-aws-ec2-metadata-token': token,
        },
        signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch IMDS path ${path}: ${res.status} ${res.statusText}`);
    }
    return res.text();
}
export async function fetchImdsJson(path) {
    const json = await fetchImdsText(path);
    return JSON.parse(json);
}
export async function fetchInstanceHostname() {
    return fetchImdsText('/latest/meta-data/local-hostname');
}
export async function fetchInstanceIdentity() {
    const json = await fetchImdsJson('/latest/dynamic/instance-identity/document');
    return InstanceIdentitySchema.parse(json);
}
//# sourceMappingURL=index.js.map