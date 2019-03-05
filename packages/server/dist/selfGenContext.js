"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var path_1 = require("path");
var Client = require("fabric-client");
var SelfGenContext;
(function (SelfGenContext) {
    function getClient() {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contextPath;
            return tslib_1.__generator(this, function (_a) {
                contextPath = path_1.join(process.env.KEYSTORE + '/' + process.env.USERCERT);
                fs.readFile(contextPath, 'utf8', function (err, data) {
                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                        var client, cryptoSuite, store, privateKeyFile, cryptoContentOrgAdmin;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!err) return [3, 3];
                                    client = new Client();
                                    console.log('Setting up the cryptoSuite ..');
                                    cryptoSuite = Client.newCryptoSuite();
                                    cryptoSuite.setCryptoKeyStore(Client.newCryptoKeyStore({
                                        path: process.env.KEYSTORE
                                    }));
                                    client.setCryptoSuite(cryptoSuite);
                                    console.log('Setting up the keyvalue store ..');
                                    return [4, Client.newDefaultKeyValueStore({
                                            path: process.env.KEYSTORE
                                        })];
                                case 1:
                                    store = _a.sent();
                                    client.setStateStore(store);
                                    console.log('Creating the admin user context ..');
                                    privateKeyFile = fs.readdirSync(process.env.KEYSTORE + '/keystore')[0];
                                    cryptoContentOrgAdmin = {
                                        privateKey: process.env.KEYSTORE + '/keystore/' + privateKeyFile,
                                        signedCert: process.env.KEYSTORE + '/signcerts/cert.pem'
                                    };
                                    return [4, client.createUser({
                                            username: process.env.USERCERT,
                                            mspid: process.env.ORGCERT + "MSP",
                                            cryptoContent: cryptoContentOrgAdmin,
                                            skipPersistence: false
                                        })];
                                case 2:
                                    _a.sent();
                                    return [2, client];
                                case 3:
                                    console.log('Context exists');
                                    _a.label = 4;
                                case 4: return [2];
                            }
                        });
                    });
                });
                return [2];
            });
        });
    }
    SelfGenContext.getClient = getClient;
})(SelfGenContext = exports.SelfGenContext || (exports.SelfGenContext = {}));
//# sourceMappingURL=selfGenContext.js.map