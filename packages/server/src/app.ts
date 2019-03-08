// @ts-check

import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import {
  PatientCtrl, PayerCtrl,
  ProviderCtrl, AdminCtrl
} from './controllers';
import * as bodyParser from 'body-parser';
import {
  PORT, USER, ORG, KEYSTORE,
  NETWORKPROFILE, CHANNEL, CHAINCODE,
  COUCHDB_PROTOCOL, COUCHDB_HOST, COUCHDB_PORT
} from './utils';

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

app.use('/admin', AdminCtrl);
app.use('/patient', PatientCtrl);
app.use('/payer', PayerCtrl);
app.use('/provider', ProviderCtrl);

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