import * as os from 'os';
import { join } from 'path';

export const ORG_USER = process.env.ORG_USER || 'org1:user1';
export const PORT = process.env.PORT || 3000;
export const CHANNEL = process.env.CHANNEL || 'ch1';
export const CHAINCODE = process.env.CHAINCODE || 'financial';
export const COUCHDB_PROTOCOL = process.env.COUCHDB_PROTOCOL || 'http';
export const COUCHDB_HOST = process.env.COUCHDB_HOST || 'localhost';
export const COUCHDB_PORT = process.env.COUCHDB_PORT || '5084';

const homedir = os.homedir();

console.log(ORG_USER);
if (!ORG_USER.includes(':')) {
    throw new Error(`Incorrect .env variable ORG_USER. A valid example is org1:user1`);
}

export const ORG = ORG_USER.split(':')[0];
export const USER = ORG_USER.split(':')[1];

/* Automatically built from env var ORG_USER */
export const KEYSTORE = join(homedir, `hyperledger-fabric-network/.hfc-${ORG}`); 
/* Automatically built from env var ORG_USER */
export const NETWORKPROFILE = join(homedir, `hyperledger-fabric-network/network-profiles/${ORG}.network-profile.yaml`);