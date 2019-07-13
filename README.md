# Healthcare Payments on Blockchain

__This is a prototype useful for exploring blockchain or as a basis for a project. It is not intended for production use without further modification and testing.__

In the InstaMed Innovation Lab, we built a blockchain prototype focused on healthcare payments among providers, payers and patients. One of the prototype’s purposes is to evaluate the value of blockchain in driving a better healthcare payments experience for all stakeholders. [Learn more about the project](https://developers.instamed.com/healthcare-payments-blockchain/)

This is a [Hyperledger Fabric](https://www.hyperledger.org/projects/fabric) blockchain project that implements the FHIR Financial module. It is built with [Convector](https://github.com/worldsibu/convector) and follows the [FHIR spec](https://www.hl7.org/fhir/). A Vuejs demo frontend app is included in the project in /packages/frontend. 

The live demo can be found at: https://blockchain-demo.instamed.com/

The live network block browser can be found at: https://blockchain-demo.instamed.com:8443/

A video describing this flow can be found at: https://vimeo.com/325931177/e21834462d

## Prerequisites

* [Node](https://nodejs.org/en/download/) 8.11.0
* [Docker Community Edition](https://www.docker.com/community-edition)
* [npx](https://www.npmjs.com/package/npx) (Typically installed automatically with Node)

## How to run the project

Detailed instructions for installing on Ubuntu can be found here: https://developers.instamed.com/healthcare-payments-blockchain/install-blockchain-on-linux/

### Start from scratch

```bash
# Install dependencies
npm install

# Start the blockchain and the server
npm start

# Create some mock data automatically
npm run mockData

# Start the server
npm run server:start
```

This will:

* Install a development *Hyperledger Fabric Network* (and remove any previous one) with [Hurley](https://github.com/worldsibu/hurley).
* Install the chaincode with the name `financial` in the network.
* Start the NodeJS server.
* Install CouchDB views.
* Instantiate the chaincode servers.
* Create some mock data for you.

### Individual tasks

* Just start the server in dev mode `npm run server:start`. Run this in case after the `npm start` you close the terminal. This won't install the network again, just the NodeJS server.

### Enable the block browser capabilities

The front end project makes it possible to visualize blocks in the network as well as its contents.

![Blocks](/images/blocks.png)

The current project uses the [Byzantine Browser](https://github.com/in-the-keyhole/byzantine-browser)'s API to get the blocks from the transactions to the ledger in realtime. For now it uses a fork from [WorldSibu that enables TLS in the server](https://github.com/worldsibu/byzantine-browser).

Make sure you already started the blockchain (healthcare-payments-blockchain) with `npm start` so a blockchain network is running on your computer with [Hurley](https://github.com/worldsibu/hurley).

You have to run npm install twice for the backend and the frontend.

```bash
# Go outside this folder and clone the repo
git clone https://github.com/worldsibu/byzantine-browser.git
cd byzantine-browser
npm install
cd ui
npm install
npm run build
cd ..
```
Copy the keys from the hyperledger-fabric-network directory. We're assuming here you have installed the byzantine-browser in that same parent directory as the blockchain.


```
cp $HOME/hyperledger-fabric-network/.hfc-org1/* ./hfc-key-store
```

Replace the `.env` in the root of the Byzantine Browser folder (or create it if it doesn't exist) with the information below. 

```bash
USERID=user1
NETWORK_URL=grpc://localhost:7051
EVENT_URL=grpc://localhost:7052
```

Use your favorite text editor or use Nano

```
nano .env
(copy text from above and right click to paste into terminal)
control-O
control-X

```

Run the Byzantine server

```
./runApiServer.sh

```


## Explore the project

### Code structure

* `packages/financial-cc`: contains the whole smart contract with all its models and controllers.
* `packages/server`: contains the server calling the blockchain.
* `chaincode.config.json`: links the controllers and packages the config for the smart contract.
* `dev-env` a folder containing development environment needed files like the CouchDB views and the installation script.
* `Fhir Financial.postman_collection.json`: import this file into Postman to see the queries to the database, follow the numbers in the tasks to create a full flow.

### Identities on the project

`Payer Organizations`, `Provider Organizations`, and `Consumer Participants` are identified in the blockchain through a **fingerprint** of a certificate generated from the Certificate authority.

The logic goes as follows:

* A identity (user) is created in the Certificate Authority.
* That user is enrolled in the blockchain network (in the case of the development environment the identity is registered and then enrolled by default).
* Extract the fingerprint from the cert by calling:

```bash
# I.e.: npm run user:fingerprint -- $HOME/hyperledger-fabric-network/.hfc-org1/user1
npm run user:fingerprint -- $HOME/hyperledger-fabric-network/.hfc-<org>/<user>
```

* The result fingerprint looks like `A5:EB:E4:1E:8E:86:03:72:00:3F:EA:CA:D2:9D:98:08:CA:70:24:F6`.
* That same fingerprint will be validated when a transaction is signed by a identity from the blockchain.
* Be sure to pass it throught Postman when registering a new `Payer Organization`, `Provider Organization`, or `Consumer Participant` as a param called `fingerprint`. Transactions will validate that the right identity is trying to perform requests.
* For example, to create a Consumer Participant, the following JSON is valid:

```json
{
    "participant": {
        "id": "Consumer::Bob"
    },
    "fingerprint": "A5:EB:E4:1E:8E:86:03:72:00:3F:EA:CA:D2:9D:98:08:CA:70:24:F6"
}
```

You will need two different identities. One can be shared between the Payer and InstaMed (working on behalf of the pacients) and the other one for a provider. The reason for this is that some data is stored only accessible to some identities (look for Private Collections later in this document), therefore a switch in the identity is made.

Go to the Postman collection settings and set the value to the variable `fingerprint` to use the same for every transaction after you run `npm run user:fingerprint -- $HOME/hyperledger-fabric-network/.hfc-org1/user1` and go and set the value of `providerFingerprint` to `npm run user:fingerprint -- $HOME/hyperledger-fabric-network/.hfc-org2/user1`.

#### Private Collections

For this project running locally, organizations are related to **Hurley organizations** in the followin order:

|Organization|Hurley Org|
|---|---|
|ABC_HEALTHCARE|org1MSP|
|INSTAMED|org2MSP|
|XYZ_PROVIDER|org3MSP|

#### A practical example

Get the fingerprint of the user1 in the org1

```bash
$ npm run user:fingerprint -- $HOME/hyperledger-fabric-network/.hfc-org1/user1
A5:EB:E4:1E:8E:86:03:72:00:3F:EA:CA:D2:9D:98:08:CA:70:24:F6
```

Be sure that your server is using the identity of user1 in org1, defined in `./packages/server/src/config/identities.json`

Every transaction sent from the server will be signed with the user1 in org1 identity, so the chaincode can safely check for the fingerprint through the `this.sender`

Except for the transaction made by the provider (mark the payment as made) through another certificate in `org2`.

### Running environment

* Call the server located in `http://localhost:8080`
* Check the CouchDB server provisioned at http://localhost:5084/_utils/#/database/ch1_financial/_all_docs

## Architecture

![Development Environment](images/devenv.png?raw=true "Development Environment")

![Production Environment](images/prodenv.png?raw=true "Production Environment")

## Tests

### Run unit tests

#### Optional - debugging

By default the project will run unit tests in debug mode. To explore the code go to a new Chrome window and put the address to `chrome://inspect`. Add the server as a connection in the tab (top of the screen) "Connection", then click the button "Add Connection" and add `localhost:9229`.

Write `debugger;` in the code line you'd like the debugger to stop and run the tests.

#### Start unit tests

```bash
# Include npx if you use NPX for package management
[npx] lerna run test --scope financial-cc --stream
```

### Install in the blockchain

```bash
# Be sure you started the blockchain before with `npm run env:restart`
npm run cc:start
```

### Upgrade your chaincode to the blockchain

```bash
# I.e.: npm run cc:upgrade -- 1.2
npm run cc:upgrade -- <version>
```

--

Edits are done by InstaMed Development user
