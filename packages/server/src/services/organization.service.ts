import { Init, Organization, couchQueryAll } from '../convectorUtils';

export async function create(newOrganization: Organization, fingerprint: string) {
    const ctrls = await Init();
    await ctrls.organization.create(newOrganization, fingerprint);
}

export async function getAll() {
    return await couchQueryAll('organizations_all', Organization);
}