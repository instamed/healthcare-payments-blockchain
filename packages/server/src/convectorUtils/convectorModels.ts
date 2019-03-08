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

export namespace ModelHelpers {
  // export async function formatParticipant(participant: Participant): Promise<any> {
  //   const participantObj = participant.toJSON();
  //   return participantObj;
  // }

  // export async function getAllDrugs() {
  //   const channel = Env.channel;
  //   const cc = Env.drugCC;
  //   const dbName = `${channel}_${cc}`;
  //   const viewUrl = '_design/drugs/_view/all';

  //   const queryOptions = { startKey: [''], endKey: [''] };

  //   try {
  //     const result = <DrugModel[]>(await Drug.query(Drug, dbName, viewUrl, queryOptions));
  //     return await Promise.all(result.map(ModelHelpers.formatDrug));
  //   } catch (err) {
  //     console.log(err);
  //     if (err.code === 'EDOCMISSING') {
  //       return [];
  //     } else {
  //       throw err;
  //     }
  //   }
  // }

  // export async function getAllTransport() {
  //   const channel = Env.channel;
  //   const cc = Env.drugCC;
  //   const dbName = `${channel}_${cc}`;
  //   const viewUrl = '_design/transports/_view/all';

  //   const queryOptions = { startKey: [''], endKey: [''] };

  //   try {
  //     const result = <TransportModel[]>(await Transport.query(Transport, dbName, viewUrl, queryOptions));
  //     return await Promise.all(result.map(ModelHelpers.formatTransport));
  //   } catch (err) {
  //     console.log(err);
  //     if (err.code === 'EDOCMISSING') {
  //       return [];
  //     } else {
  //       throw err;
  //     }
  //   }
  // }

  // export async function getAllParticipants() {
  //   const channel = Env.channel;
  //   const cc = Env.drugCC;
  //   const dbName = `${channel}_${cc}`;
  //   const viewUrl = '_design/participants/_view/all';

  //   const queryOptions = { startKey: [''], endKey: [''] };

  //   try {
  //     const result = <Participant[]>(await Participant.query(Participant, dbName, viewUrl, queryOptions));
  //     return await Promise.all(result.map(formatParticipant));
  //   } catch (err) {
  //     console.log(err);
  //     if (err.code === 'EDOCMISSING') {
  //       return [];
  //     } else {
  //       throw err;
  //     }
  //   }
  // }
}

// export { Participant } from 'participant-cc';
export {
  Patient, CreateClaim, AdjudicateClaim,
  Organization
} from 'financial-cc';