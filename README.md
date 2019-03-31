# Healthcare Payments on Blockchain FHIR Demo

This is a [Hyperledger Fabric](https://www.hyperledger.org/projects/fabric) project to represent the FHIR Financial module. It's built with [Convector](https://github.com/worldsibu/convector) and follows the [FHIR spec](https://www.hl7.org/fhir/).

The live demo can be found at: https://blockchain-demo.instamed.com/

The live network block browser can be found at: https://blockchain-demo.instamed.com:8443/

A video describing this flow can be found at: https://vimeo.com/325931177/e21834462d

## Prerequisites

* [Node](https://nodejs.org/en/download/) 8.11.0
* [Docker Community Edition](https://www.docker.com/community-edition)
* [npx](https://www.npmjs.com/package/npx)

## How to run the project

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

```bash
# Go outside this folder and clone the repo
git clone https://github.com/worldsibu/byzantine-browser.git

cd byzantine-browser

npm install
```

Make sure you already started this (healthcare-payments-blockchain) project with `npm start` so a blockchain network is running on your computer with [Hurley](https://github.com/worldsibu/hurley).

Go to `$HOME/hyperledger-fabric-network/.hfc-org1`, copy all its contents and paste them into `./hfc-key-store` (inside the Byzantine Browser folder).

Replace the `.env` in the root of the Byzantine Browser folder (or create it if it doesn't exist).

```bash
USERID=user1
NETWORK_URL=grpc://localhost:7051
EVENT_URL=grpc://localhost:7052
```

Start the server

```bash
npm start
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

#### A practical example

Get the fingerprint of the user1 in the org1

```bash
$ npm run user:fingerprint -- $HOME/hyperledger-fabric-network/.hfc-org1/user1
A5:EB:E4:1E:8E:86:03:72:00:3F:EA:CA:D2:9D:98:08:CA:70:24:F6
```

Be sure that your server is using the identity of user1 in org1, defined in `./packages/server/src/config/identities.json`

Every transaction sent from the server will be signed with the user1 in org1 identity, so the chaincode can safely check for the fingerprint throught the `this.sender`

### Running environment

* Call the server located in `http://localhost:10100`
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
