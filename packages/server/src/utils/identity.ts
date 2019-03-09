import identitiesDev from '../config/identities.json';
import identitiesProd from '../config/identities.prod.json';
import { NODE_ENV } from '../utils/env';
import { join, resolve } from 'path';
import * as os from 'os';
const homedir = os.homedir();

export function identity(user?: string) {
    const identities: ServerIdentity[] = NODE_ENV === 'dev' ? identitiesDev : identitiesProd;
    if (!identities) {
        throw new Error('No identities config .json found in path ./config');
    }
    let res: ServerIdentity;
    if (!user) {
        res = identities[0];
    } else {
        res = <ServerIdentity>identities.find(identity => identity.user === user);
    }

    // Fallback to Hurley's default paths
    res.networkProfile = res.networkProfile ? resolve(__dirname, res.networkProfile)
        : join(homedir, `hyperledger-fabric-network/network-profiles/${res.org}.network-profile.yaml`);
    res.keyStore = res.keyStore ? resolve(__dirname, res.keyStore)
        : join(homedir, `hyperledger-fabric-network/.hfc-${res.org}`);

    return res;
}

export class ServerIdentity {
    user: string;
    org: string;
    networkProfile?: string;
    keyStore?: string;
} 