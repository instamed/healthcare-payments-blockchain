# Deployment Flow

This project is optimized to be deployed to a [Forma](https://worldsibu.tech/forma) Network. The following steps will walk you through what is needed to deploy this project.

## 1. Steps - With a new Network

### 1.1 Prerequisites

* You will need to first login/signup to Forma [here](https://forma.worldsibu.com).
* Create a blockchain network.
* Enter into the details of your network and the default Ledger created for you (channel).
* Deploy the chaincode through the user interface. Be sure to take notes of the name you give the chaincode, we recommend you set the name to `fhirfinancial`.

### 1.2 Run the server and configure the Network

#### 1.2.1 Get a Network Profile

A network profile maps the network topology, addresses, and in the case of Forma, also includes the public certificates for TLS. A Network Profile is associated to 1 identity, therefore you need this file to connect and send transactions.

* Go to the details of your network through the button "Your nodes environment and identities" in the home page after login.

![Nodes Environment](images/nodesenvironment.png?raw=true "Nodes Environment")

* If you want the server to run in with a new identity, go to the section "Service accounts" and click "New service account". Be sure to take notes of the password, you won't be able to recover it after you set it. A new Certificate Authority user will be created for you.
* Once the account is created, you need a network profile. In the table below the title "Service accounts" select the Project you'd like to access and click the download button.

#### 1.2.2 Configure the server

* Copy the network profile file you just downloaded, and paste it in a new folder located at `./packages/server/config`.
* Name the file as the identity you are using, i.e.: from `networkprofile.yaml` to `<username>.networkprofile.yaml`.
* Edit the network profile and map the credential store to the folder that will host the private key and configurations.

```yaml
credentialStore:
    path: ./
    cryptoStore:
        path: ./
```

In this instructions, to map to the folder `./packages/server/config` replace the values of both paths to `./config/`.

```yaml
credentialStore:
    path: ./config/
    cryptoStore:
        path: ./config/
```

* Now, rename the file `.env.prod` to `.env` and replace the values of the `CHAINCODE`, `COUCHDB_HOST`, and `COUCHDB_PORT` for the values of your network.

```bash
CHANNEL=public
CHAINCODE=fhirfinancial # The name you set when creating the smart contract
COUCHDB_HOST=34.73.112.77 # Go to your Network's nodes environment and pick the IP in the section "Public External Cluster Address"
COUCHDB_PORT=30042 # Go to your Network's nodes environment and pick the port by clicking "Details" in the tile for the "worldstate-peer1"
```

#### 1.2.3 Server identities

The NodeJS server was made to support multiple identities. The server relies on the identities json located in `./packages/server/src/config/identities.prod.json`. By default the function `identity` in the file `./packages/server/src/utils/identity.ts` will return the first result of that json if no value is passed. If you pass a value, the function will return the item that matches that name in the json.

Be sure to replace the values of the fields `user` (the identity you created before), `org` (organisation), `networkProfile`, and `keyStore` accordingly.

Find the org name in your Network's Nodes environment.

![Organization ID](images/organizationid.png?raw=true "Organization ID")

```json
[
    {
        "user": "<username>",
        "org": "<organization>",
        "networkProfile": "../../../config/<username>.networkprofile.yaml",
        "keyStore": "../../../config/"
    }
]
```

The default example considers the default folder structure. Change it if needed.

#### 1.2.4 Enroll the user to get the private key

Since you already created an identity, now you can enroll it to get a private key to make transactions. You will need the name of the identity and the password you set before. The profile configuration will be generated in the folder `./packages/server/config`.

To enroll, you can use the Forma Helper located in the folder `./packages/administration/enroll.js`.

Before running the following command, be sure to change the CA address to point to your ICA's IP and Port: `CA_ADDRESS=X.X.X.X`. You can find both values in your Nodes Environment.

![CA Address](images/CA.png?raw=true "CA Address")

```bash
# Enroll the user and get its certificate
npx lerna run start --stream --scope administration  -- <username> <password> <organisation>
```

You can use this library to enroll any identity you need to.

#### 1.2.5 Make the first transaction to start the containers

Now you can simply start the server and make a first call through [Postman](https://www.getpostman.com).

```bash
npx lerna run start:dev --scope server --stream
```

Import the file `Fhir Financial.postman_collection.json` in Postman and execute the request "1. Create Provider Organization".

### 1.3 Install the views

CouchDB views are used for some queries to the ledger. This project uses it to list all items of each type.

* Go to `./packages/administration/prod-env/installer.sh` and replace the values `SERVER` (the same IP you changed before), `CHAINCODE` (the name you gave to the chaincode i.e.: `fhirfinancial`), `DB` (the name of your Ledger, by default it's `public`).
* Run `npm run views:install:prod` to install the views on each CouchDB server. If you want to install it in other CouchDB servers, run the script again pointing to them.

## 2. Steps - With an existing Network

Repeat steps `1.2.1` to `1.2.4`.

Just like step `1.2.5`, run the server and use the Postman configuration file to make calls to the network.

```bash
npx lerna run start:dev --scope server --stream
```