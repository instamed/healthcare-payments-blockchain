// @ts-check

import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
// import { DrugCtrl } from './controllers';
import * as bodyParser from 'body-parser';

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

// app.use('/drug', DrugCtrl);

const user = process.env.USERCERT;
const org = process.env.ORGCERT;

console.log(`PORT=${process.env.PORT}`);
console.log(`USERCERT=${process.env.USERCERT}`);
console.log(`ORGCERT=${process.env.ORGCERT}`);
console.log(`KEYSTORE=${process.env.KEYSTORE}`);
console.log(`NETWORKPROFILE=${process.env.NETWORKPROFILE}`);
console.log(`CHANNEL=${process.env.CHANNEL}`);
console.log(`CHAINCODE=${process.env.CHAINCODE}`);
console.log(`COUCHDBVIEW=${process.env.COUCHDBVIEW}`);
console.log(`COUCHDB_PROTOCOL=${process.env.COUCHDB_PROTOCOL}`);
console.log(`COUCHDB_HOST=${process.env.COUCHDB_HOST}`);
console.log(`COUCHDB_PORT=${process.env.COUCHDB_PORT}`);

app.listen(port, () =>
  console.log(`Running as ${org}:${user} in port ${port}`));

module.exports = app;
