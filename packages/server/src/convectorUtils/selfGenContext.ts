/** Referenced from: https://github.com/ksachdeva/hyperledger-fabric-example/blob/c41fcaa352e78cbf3c7cfb210338ac0f20b8357e/src/client.ts */
import * as fs from 'fs';
import { join } from 'path';
import * as Client from 'fabric-client';
import { IEnrollmentRequest, IRegisterRequest } from 'fabric-ca-client';

export type UserParams = IRegisterRequest;
export type AdminParams = IEnrollmentRequest;

export namespace SelfGenContext {

  interface IdentityFiles {
    privateKey: string;
    signedCert: string;
  }

  export async function getClient() {
    // Check if needed
    const contextPath = join(process.env.KEYSTORE + '/' + process.env.USERCERT);

    fs.readFile(contextPath, 'utf8', async function (err, data) {
      if (err) {
        // doesnt exist! Create it.
        const client = new Client();

        console.log('Setting up the cryptoSuite ..');

        // ## Setup the cryptosuite (we are using the built in default s/w based implementation)
        const cryptoSuite = Client.newCryptoSuite();
        cryptoSuite.setCryptoKeyStore(Client.newCryptoKeyStore({
          path: process.env.KEYSTORE
        }));

        client.setCryptoSuite(cryptoSuite);

        console.log('Setting up the keyvalue store ..');

        // ## Setup the default keyvalue store where the state will be stored
        const store = await Client.newDefaultKeyValueStore({
          path: process.env.KEYSTORE
        });

        client.setStateStore(store);

        console.log('Creating the admin user context ..');

        const privateKeyFile = fs.readdirSync(process.env.KEYSTORE + '/keystore')[0];

        // ###  GET THE NECESSRY KEY MATERIAL FOR THE ADMIN OF THE SPECIFIED ORG  ##
        const cryptoContentOrgAdmin: IdentityFiles = {
          privateKey: process.env.KEYSTORE + '/keystore/' + privateKeyFile,
          signedCert: process.env.KEYSTORE + '/signcerts/cert.pem'
        };

        await client.createUser({
          username: process.env.USERCERT,
          mspid: `${process.env.ORGCERT}MSP`,
          cryptoContent: cryptoContentOrgAdmin,
          skipPersistence: false
        });

        return client;
      } else {
        console.log('Context exists');
      }
    });

  }

}
