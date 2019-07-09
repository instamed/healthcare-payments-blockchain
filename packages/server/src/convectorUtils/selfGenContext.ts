/** Referenced from: https://github.com/ksachdeva/hyperledger-fabric-example/blob/c41fcaa352e78cbf3c7cfb210338ac0f20b8357e/src/client.ts */
import * as fs from 'fs';
import { join } from 'path';
import Client from 'fabric-client';
import { IEnrollmentRequest, IRegisterRequest } from 'fabric-ca-client';
import { identity } from '../utils/identity';

export type UserParams = IRegisterRequest;
export type AdminParams = IEnrollmentRequest;
const l = console.log;

export namespace SelfGenContext {

  interface IdentityFiles {
    privateKey: string;
    signedCert: string;
  }

  export async function getClient() {
    
    const keyStore = identity().keyStore;
    const user = identity().user;
    const org = identity().org;
    // Check if needed
    const contextPath = join(keyStore + '/' + user);

    fs.readFile(contextPath, 'utf8', async function (err, data) {
      if (err) {
        // doesnt exist! Create it.
        const client = new Client();

        l('Setting up the cryptoSuite ..');

        // ## Setup the cryptosuite (we are using the built in default s/w based implementation)
        const cryptoSuite = Client.newCryptoSuite();
        cryptoSuite.setCryptoKeyStore(Client.newCryptoKeyStore({
          path: keyStore
        }));

        client.setCryptoSuite(cryptoSuite);

        l('Setting up the keyvalue store ..');

        // ## Setup the default keyvalue store where the state will be stored
        const store = await Client.newDefaultKeyValueStore({
          path: keyStore
        });

        client.setStateStore(store);

        l('Creating the admin user context ..');

        const privateKeyFile = fs.readdirSync(keyStore + '/keystore')[0];

        // ###  GET THE NECESSRY KEY MATERIAL FOR THE ADMIN OF THE SPECIFIED ORG  ##
        const cryptoContentOrgAdmin: IdentityFiles = {
          privateKey: keyStore + '/keystore/' + privateKeyFile,
          signedCert: keyStore + '/signcerts/cert.pem'
        };

        await client.createUser({
          username: user,
          mspid: `${org}MSP`,
          cryptoContent: cryptoContentOrgAdmin,
          skipPersistence: false
        });

        return client;
      } else {
        l(`Context exists in ${contextPath}`);
      }
    });

  }

}
