import * as os from 'os';
import { join } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'dev';
export const PORT = process.env.PORT || 3000;

export const CHANNEL = process.env.CHANNEL || 'ch1';
export const CHAINCODE = process.env.CHAINCODE || 'financial';
export const COUCHDB_PROTOCOL = process.env.COUCHDB_PROTOCOL || 'http';
export const COUCHDB_HOST = process.env.COUCHDB_HOST || 'localhost';
export const COUCHDB_PORT = process.env.COUCHDB_PORT || '5084';