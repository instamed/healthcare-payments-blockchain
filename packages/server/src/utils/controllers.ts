/**
 * This file is in charge of building a controller (or set of controllers made up)
 * of the baseline logic you designed on your chaincode project, but replacing the logic
 * with your own for NodeJS. We inject here the `convector-adapter-fabric` which calls
 * the blockchain based on your own configuration.
 */

/** The client is the component in charge of bringing the "interface" of your business
 * logic right from the chaincode project.
 * Implementation will depend on this layer. In this case, what we want to do at this layer
 * is to call the backend peers.
 */
import { resolve } from 'path';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
// import { DrugControllerClient } from '@worldsibu/convector-example-dsc-cc-drug/dist/client';
import { ParticipantControllerClient, Participant } from '@worldsibu/convector-example-dsc-cc-participant/dist/client';

import { Models } from './models';
import { SelfGenContext } from '../selfGenContext';

/**
 * Building this adapter allows you to communicate with the
 * test env created by `convector-tool-dev-env`.
 */
// export namespace DrugController {
//   export async function init(): Promise<DrugControllerClient> {
//     const user = process.env.USERCERT || 'user1';
//     const org = process.env.ORGCERT || 'org1';

//     await SelfGenContext.getClient();

//     const adapter = new FabricControllerAdapter({
//       txTimeout: 300000,
//       user: user,
//       // set it later to enable Mutual TLS
//       channel: process.env.CHANNEL,
//       chaincode: process.env.CHAINCODE,
//       keyStore: resolve(__dirname, process.env.KEYSTORE),
//       networkProfile: resolve(__dirname, process.env.NETWORKPROFILE),
//       userMspPath: process.env.KEYSTORE
//     });

//     await adapter.init();
//     return new DrugControllerClient(adapter);
//   }
// }

// export namespace ParticipantController {


//   export async function init(): Promise<ParticipantControllerClient> {
//     const user = process.env.USERCERT || 'user1';
//     const org = process.env.ORGCERT || 'org1';

//     await SelfGenContext.getClient();

//     const adapter = new FabricControllerAdapter({
//       user,
//       txTimeout: 300000,
//       // set it later to enable Mutual TLS
//       channel: process.env.CHANNEL,
//       chaincode: process.env.CHAINCODE,
//       keyStore: resolve(__dirname, process.env.KEYSTORE),
//       networkProfile: resolve(__dirname, process.env.NETWORKPROFILE),
//       userMspPath: process.env.KEYSTORE
//     });

//     await adapter.init();

//     const participantCtrl = new ParticipantControllerClient(adapter);

//     const users = await Models.getAllParticipants();
//     console.log(users);
//     if (!users.find(u => u.id === user && u.msp === `${org}MSP`)) {
//       await participantCtrl.register(user)
//     }

//     return participantCtrl;
//   }
// }
