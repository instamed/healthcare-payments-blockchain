const os = require('os');
const fs = require('fs');
const path = require('path');
const homedir = os.homedir();

console.log('Replacing references in config.json');
const configFilePath = path.resolve(__dirname, 'chaincode.config.json');

try {
  const configFile = JSON.parse(fs.readFileSync(configFilePath));

  const updatedConfig = {
    ...configFile,
    keyStore: configFile.keyStore.replace(/^.+\/hyperledger-fabric-network/, path.resolve(homedir, 'hyperledger-fabric-network')),
    networkProfile: configFile.networkProfile.replace(/^.+\/hyperledger-fabric-network/, path.resolve(homedir, 'hyperledger-fabric-network')),
  };

  fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2));

  console.log('Paths updated successfully');
} catch (error) {
  console.error(`Error updating paths: ${error}`);
}
