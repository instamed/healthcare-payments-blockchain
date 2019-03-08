# Healthcare Payments in Blockchain FHIR Demo

This is a [Hyperledger Fabric](https://www.hyperledger.org/projects/fabric) project to represent the FHIR Financial module. It's built with [Convector](https://github.com/worldsibu/convector) and follows the [FHIR spec](https://www.hl7.org/fhir/).

## How to run the project

### Start from scratch

```bash
npm install

npm start

# Open the `Fhir Financial.postman_collection.json` with Postman and run a initial request.
# The first transaction in the server to the blockchain will take some seconds to start the containers for the very first time.

# Install views - this has to happen after making the first request since no database exists yet in CouchDB
npm run views:install
```

This will:

* Install a development *Hyperledger Fabric Network* (and remove any previous one) with [Hurley](https://github.com/worldsibu/hurley).
* Install the chaincode with the name `financial` in the network.
* Start the NodeJS server.
* Install CouchDB views.

### Individual tasks

* Just start the server in dev mode `npm run server:start`. Run this in case after the `npm start` you close the terminal. This won't install the network again, just the NodeJS server.

## Explore the project

### Code structure

* `packages/financial-cc`: contains the whole smart contract with all its models and controllers.
* `packages/server`: contains the server calling the blockchain.
* `chaincode.config.json`: links the controllers and packages the config for the smart contract.
* `dev-env` a folder containing development environment needed files like the CouchDB views and the installation script.
* `Fhir Financial.postman_collection.json`: import that into Postman to see the queries to the database, follow the numbers in the tasks to create a full flow.

### Running environment

* Check the CouchDB server provisioned at http://localhost:5084/_utils/#/database/ch1_financial/_all_docs

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
