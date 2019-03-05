const os = require('os');
const fs = require('fs');
const path = require('path');
const homedir = os.homedir();

console.log('Replacing references in config.json')
const configFilePath = path.join(__dirname, './org1.fhir.config.json');
const configFilePath2 = path.join(__dirname, './org2.fhir.config.json');

const configFile = require(configFilePath);
const configFile2 = require(configFilePath2);
fs.writeFileSync(configFilePath, JSON.stringify({
    ...configFile,
    keyStore: configFile.keyStore.replace(/^.+\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network')),
    networkProfile: configFile.networkProfile.replace(/^.+\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network'))
}, null, 2));
fs.writeFileSync(configFilePath2, JSON.stringify({
    ...configFile,
    keyStore: configFile.keyStore.replace(/^.+\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network')),
    networkProfile: configFile.networkProfile.replace(/^.+\/hyperledger-fabric-network/, path.join(homedir, 'hyperledger-fabric-network'))
}, null, 2));

console.log('Paths updated successfully')
