"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var controllers_1 = require("./controllers");
var bodyParser = require("body-parser");
var utils_1 = require("./utils");
var app = express();
var port = process.env.PORT || 10100;
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '40mb'
}));
app.use(bodyParser.json({ limit: '40mb' }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/patient', controllers_1.PatientCtrl);
app.use('/payer', controllers_1.PayerCtrl);
app.use('/provider', controllers_1.ProviderCtrl);
app.listen(port, function () {
    return console.log("Running as " + utils_1.ORG + ":" + utils_1.USER + " in port " + port);
});
module.exports = app;
console.log("PORT=" + utils_1.PORT);
console.log("USERCERT=" + utils_1.USER);
console.log("ORGCERT=" + utils_1.ORG);
console.log("KEYSTORE=" + utils_1.KEYSTORE);
console.log("NETWORKPROFILE=" + utils_1.NETWORKPROFILE);
console.log("CHANNEL=" + utils_1.CHANNEL);
console.log("CHAINCODE=" + utils_1.CHAINCODE);
console.log("COUCHDB_PROTOCOL=" + utils_1.COUCHDB_PROTOCOL);
console.log("COUCHDB_HOST=" + utils_1.COUCHDB_HOST);
console.log("COUCHDB_PORT=" + utils_1.COUCHDB_PORT);
//# sourceMappingURL=app.js.map