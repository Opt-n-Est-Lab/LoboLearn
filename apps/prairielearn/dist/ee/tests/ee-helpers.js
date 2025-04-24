import { config } from '../../lib/config.js';
export function enableEnterpriseEdition() {
    let originalIsEnterprise;
    before(() => {
        originalIsEnterprise = config.isEnterprise;
        config.isEnterprise = true;
    });
    after(() => {
        config.isEnterprise = originalIsEnterprise;
    });
}
export async function withoutEnterpriseEdition(fn) {
    const originalIsEnterprise = config.isEnterprise;
    try {
        config.isEnterprise = false;
        return await fn();
    }
    finally {
        config.isEnterprise = originalIsEnterprise;
    }
}
//# sourceMappingURL=ee-helpers.js.map