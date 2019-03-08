import { Init, Organization, couchQueryAll } from '../convectorUtils';

export async function create(newOrganization: Organization) {
    const ctrls = await Init();
    await ctrls.organization.create(newOrganization);
}

export async function getAll() {
    return await couchQueryAll('organizations_all', Organization);
}