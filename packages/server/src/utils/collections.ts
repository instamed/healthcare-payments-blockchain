import { PrivateCollectionsRoutes } from 'financial-cc';
import organizations from '../config/organizations.json';

export async function collections() {
    const collections = new PrivateCollectionsRoutes(
        organizations[1], organizations[2],
        organizations[0]);
    await collections.load();
    return collections;
}