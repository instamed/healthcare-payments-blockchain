/*
 * Enroll a user
 */
const dotenv = require('dotenv');
dotenv.config();
const d = require('debug')('forma:helper');

d(`KEYSTORE=${process.env.KEYSTORE}`);
d(`NETWORKPROFILE=${process.env.NETWORKPROFILE}`);
d(`CA_ADDRESS=${process.env.CA_ADDRESS}`);
d(`organization=${process.argv[4]}`);
d(`username=${process.argv[2]}`);
d(`password=${process.argv[3]}`);

const Fabric_Client = require('fabric-client');
const Fabric_CA_Client = require('fabric-ca-client');

const os = require('os');
const path = require('path');

const fabric_client = new Fabric_Client();
let fabric_ca_client = null;
let admin_user = null;
let member_user = null;
const config = {
    keyStore: path.resolve(__dirname, process.env.KEYSTORE),
    networkProfile: path.resolve(__dirname, process.env.NETWORKPROFILE),
    caAddress: process.env.CA_ADDRESS,
    organization: process.argv[4],
    username: process.argv[2],
    password: process.argv[3],
};

d(`Enrolling user ${config.username} for organization ${config.organization}`);
// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
Fabric_Client.newDefaultKeyValueStore({
    path: config.keyStore
}).then((state_store) => {
    d('Keys will be stored in ' + config.keyStore);
    // assign the store to the fabric client
    fabric_client.setStateStore(state_store);
    const crypto_suite = Fabric_Client.newCryptoSuite();
    // use the same location for the state store (where the users' certificate are kept)
    // and the crypto store (where the users' keys are kept)
    const crypto_store = Fabric_Client.newCryptoKeyStore({ path: config.keyStore });

    crypto_suite.setCryptoKeyStore(crypto_store);
    fabric_client.setCryptoSuite(crypto_suite);

    // be sure to change the http to https when the CA is running TLS enabled
    fabric_ca_client = new Fabric_CA_Client(config.caAddress, null, '', crypto_suite);

    debugger;
    d(`Trying to enroll user ${config.username}`);
    return fabric_ca_client.enroll({
        enrollmentID: config.username,
        enrollmentSecret: config.password
    });
}).then((enrollment) => {
    d(`Enroll successfully ${config.username}`);
    return fabric_client.createUser({
        username: config.username,
        mspid: `${config.organization}MSP`,
        cryptoContent: {
            privateKeyPEM: enrollment.key.toBytes(),
            signedCertPEM: enrollment.certificate
        }
    });
}).then((user) => {
    member_user = user;
    return fabric_client.setUserContext(member_user);
}).then(() => {
    d(`${config.username} was successfully enrolled and the certificate data was stored in ${config.keyStore}`);
}).catch((err) => {
    d(`Failed to enroll user: ${config.username} - ${err}`);
    if (err.toString().indexOf('Authorization') > -1) {
        d('Looks like an authorization error. Check the password and CA address.');
    }
});



// const adapter = new FabricControllerAdapter({
//     user: config.username,
//     keyStore: config.keyStore,
//     networkProfile: config.networkProfile,
//     userMspPath: config.keyStore,
//     txTimeout: 100000
// });

// adapter.init().then(readyAdapter => {
//     const ca = readyAdapter.client.getCertificateAuthority();

//     return ca.enroll({
//         enrollmentID: config.username,
//         enrollmentSecret: config.password
//     })
// }).then((key, certificate) => {
//     d('Enrolled successfully');
// }).catch(ex => {
//     d(ex);
// });

