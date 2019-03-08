# Healthcare Payments in Blockchain FHIR Demo

## How to run the project

### Start from scratch

This will:

* Install a development *Hyperledger Fabric Network* (and remove any previous one).
* Install the chaincode with the name `financial` in the network.
* Start the server and self-enroll a organization.

```bash
npm install
```

## Tests

```bash
# Include npx if you use NPX for package management
[npx] lerna run test --scope financial-cc --stream
```

--

Edits are done by InstaMed Development user
