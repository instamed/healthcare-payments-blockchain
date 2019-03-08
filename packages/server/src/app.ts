// @ts-check

import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';

import * as bodyParser from 'body-parser';
import {
  PORT, USER, ORG, KEYSTORE,
  NETWORKPROFILE, CHANNEL, CHAINCODE,
  COUCHDB_PROTOCOL, COUCHDB_HOST, COUCHDB_PORT
} from './utils';
import {
  OrganizationCtrl, PaymentCtrl, ClaimCtrl, PatientCtrl, ProcedureCtrl,
  ParticipantCtrl, InvoiceCtrl, AccountCtrl
} from './controllers';
import { ChargeItemCtrl } from './controllers/chargeItem.controller';
import { ClaimResponseCtrl } from './controllers/claimResponse.controller';
import { EncounterCtrl } from './controllers/encounter.controller';

const app: express.Application = express();
const port = process.env.PORT || 10100;

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '40mb'
}));

app.use(bodyParser.json({ limit: '40mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/organization', OrganizationCtrl);
app.use('/payment', PaymentCtrl);
app.use('/claim', ClaimCtrl);
app.use('/patient', PatientCtrl);
app.use('/participant', ParticipantCtrl);
app.use('/invoice', InvoiceCtrl);
app.use('/account', AccountCtrl);
app.use('/procedure', ProcedureCtrl);
app.use('/chargeItem', ChargeItemCtrl);
app.use('/claimResponse', ClaimResponseCtrl);
app.use('/encounter', EncounterCtrl);

app.listen(port, () =>
  console.log(`Running as ${ORG}:${USER} in port ${port}`));

module.exports = app;

console.log(`PORT=${PORT}`);
console.log(`USERCERT=${USER}`);
console.log(`ORGCERT=${ORG}`);
console.log(`KEYSTORE=${KEYSTORE}`);
console.log(`NETWORKPROFILE=${NETWORKPROFILE}`);
console.log(`CHANNEL=${CHANNEL}`);
console.log(`CHAINCODE=${CHAINCODE}`);
console.log(`COUCHDB_PROTOCOL=${COUCHDB_PROTOCOL}`);
console.log(`COUCHDB_HOST=${COUCHDB_HOST}`);
console.log(`COUCHDB_PORT=${COUCHDB_PORT}`);