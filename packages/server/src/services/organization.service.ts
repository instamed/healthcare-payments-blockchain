import { Init, Organization } from '../convectorUtils';

export async function create(newOrganization: Organization) {
    const ctrls = await Init();
    await ctrls.organization.create(newOrganization);
}
