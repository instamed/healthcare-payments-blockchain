"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convector_core_storage_1 = require("@worldsibu/convector-core-storage");
var convector_storage_couchdb_1 = require("@worldsibu/convector-storage-couchdb");
convector_core_storage_1.BaseStorage.current = new convector_storage_couchdb_1.CouchDBStorage({
    host: process.env.COUCHDB_HOST,
    protocol: process.env.COUCHDB_PROTOCOL,
    port: process.env.COUCHDB_PORT
}, process.env.COUCHDBVIEW);
//# sourceMappingURL=models.js.map