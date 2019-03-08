# Healthcare Payments in Blockchain FHIR Demo

## How to run the project

### Start from scratch

This will:

* Install a development *Hyperledger Fabric Network* (and remove any previous one).
* Install the chaincode with the name `financial` in the network.
* Start the server and self-enroll a organization.

```bash
npm install

npm start
```

### Some individual tasks

* Just start the server in dev mode `npm run server:start`

## Tests

### Run unit tests

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
