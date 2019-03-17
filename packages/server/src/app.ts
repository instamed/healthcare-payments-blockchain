// @ts-check
import * as dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';
import express from 'express';

import * as bodyParser from 'body-parser';
import {
  PORT, CHANNEL, CHAINCODE,
  COUCHDB_PROTOCOL, COUCHDB_HOST, COUCHDB_PORT
} from './utils';
import {
  OrganizationCtrl, PaymentCtrl, ClaimCtrl, PatientCtrl, ProcedureCtrl,
  ParticipantCtrl, InvoiceCtrl, AccountCtrl
} from './controllers';
import { ChargeItemCtrl } from './controllers/chargeItem.controller';
import { ClaimResponseCtrl } from './controllers/claimResponse.controller';
import { EncounterCtrl } from './controllers/encounter.controller';
import { identity } from './utils/identity';
import { DefaultCtrl } from './controllers/default.controller';
import { join } from 'path';

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

app.use(express.static(join(__dirname, '../../../frontend/dist')));

// console.log(join(__dirname, 'index.html'));
// app.use('/', express.static(path.join(__dirname, 'index.html')));
app.use('/api/organization', OrganizationCtrl);
app.use('/api/payment', PaymentCtrl);
app.use('/api/claim', ClaimCtrl);
app.use('/api/patient', PatientCtrl);
app.use('/api/participant', ParticipantCtrl);
app.use('/api/invoice', InvoiceCtrl);
app.use('/api/account', AccountCtrl);
app.use('/api/procedure', ProcedureCtrl);
app.use('/api/chargeItem', ChargeItemCtrl);
app.use('/api/claimResponse', ClaimResponseCtrl);
app.use('/api/encounter', EncounterCtrl);
app.use('/*', DefaultCtrl); // catch all for frontend routes

const serverIdentity = identity();

app.listen(port, () =>
  console.log(`Running as ${serverIdentity.org}:${serverIdentity.user} in port ${port}`));

module.exports = app;

console.log(`PORT=${PORT}`);
console.log(`USERCERT=${serverIdentity.user}`);
console.log(`ORGCERT=${serverIdentity.org}`);
console.log(`KEYSTORE=${serverIdentity.keyStore}`);
console.log(`NETWORKPROFILE=${serverIdentity.networkProfile}`);
console.log(`CHANNEL=${CHANNEL}`);
console.log(`CHAINCODE=${CHAINCODE}`);
console.log(`COUCHDB_PROTOCOL=${COUCHDB_PROTOCOL}`);
console.log(`COUCHDB_HOST=${COUCHDB_HOST}`);
console.log(`COUCHDB_PORT=${COUCHDB_PORT}`);