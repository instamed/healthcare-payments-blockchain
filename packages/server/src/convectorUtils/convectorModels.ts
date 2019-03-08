import { BaseStorage } from '@worldsibu/convector-core-storage';
import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';
// import { FinancialController } from 'financial-cc';
import { Env } from './env';
import {
  CHAINCODE, COUCHDB_HOST,
  COUCHDB_PROTOCOL, COUCHDB_PORT, CHANNEL
} from '../utils';

/**
 * Route to the CouchDB
 */
BaseStorage.current = new CouchDBStorage({
  host: COUCHDB_HOST,
  protocol: COUCHDB_PROTOCOL,
  port: COUCHDB_PORT
}, `${CHANNEL}_${CHAINCODE}`);

export async function couchQueryAll(view: string, type: any, queryOptions?: {}) {
  const channel = CHANNEL;
  const cc = CHAINCODE;
  const dbName = `${channel}_${cc}`;
  const viewUrl = `_design/financial/_view/${view}`;
  const options = queryOptions || { startKey: [''], endKey: [''] };

  try {
    const results = <any[]>(await type.query(type, dbName, viewUrl, queryOptions));
    return results.map(result => result.toJSON());
  } catch (err) {
    console.log(err);
    if (err.code === 'EDOCMISSING') {
      return [];
    } else {
      throw err;
    }
  }
}

export {
  Patient, CreateClaim, AdjudicateClaim,
  Organization
} from 'financial-cc';