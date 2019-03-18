set +e

echo "Attempt to start the servers. Ignore the following error ------"
./node_modules/.bin/hurl invoke financial init || null

echo "------ Ignore the previews error"

echo "Installing CouchDB views"
npm run views:install
echo "CouchDB views ready"

FINGERPRINT=`node -e "console.log(JSON.parse(require('fs').readFileSync('$HOME/hyperledger-fabric-network/.hfc-org1/user1', 'utf8')).enrollment.identity.certificate)" | openssl x509 -fingerprint -noout | cut -d '=' -f2`

echo "User1 Org1 user fingerprint is $FINGERPRINT"

echo "STEP 1: Creating Organization first Provider"

read -r -d '' orgXZYProvider << EndOfMessage
{
"resourceType": "Organization",
        "id": "resource:org.fhir.core.Organization#Southbend_Flu_Clinic",
        "identifier": [
            {
                "use": "usual",
                "system": "Blockchain:Provider",
                "value": "resource:org.fhir.core.Organization#Southbend_Flu_Clinic"
            }
        ],
        "active": true,
        "type_": [
            {
                "coding": [
                    {
                        "system": "http://hl7.org/fhir/organization-type",
                        "code": "prov",
                        "display": "Healthcare Provider"
                    }
                ]
            }
        ],
        "name": "XYZ Health Services",
        "telecom": [
            {
                "system": "phone",
                "value": "098-765 4321"
            }
        ],
        "address": [
            {
                "line": [
                    "Somewhere Newport Beach"
                ]
            }
        ],
        "contact": [
            {
                "purpose": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                            "code": "ADMIN"
                        }
                    ]
                },
                "name": {
                    "text": "Dr. Provida"
                },
                "telecom": [
                    {
                        "system": "phone",
                        "value": "022-655 2321"
                    },
                    {
                        "system": "email",
                        "value": "dr@XYZ_Provider.com"
                    },
                    {
                        "system": "fax",
                        "value": "022-655 2322"
                    }
                ],
                "address": {
                    "line": [
                        "Somewhere Newport Beach"
                    ]
                }
            }
        ]
        }
EndOfMessage

./node_modules/.bin/hurl invoke financial organization_create "$orgXZYProvider" "$FINGERPRINT"

echo "STEP 1: Completed Creating Organization first Provider"

echo "STEP 2: Creating Organization fist Payer"

read -r -d '' orgABC_Healthcare << EndOfMessage
{
        "resourceType": "Organization",
        "id": "resource:org.fhir.core.Organization#All_American_Health",
        "identifier": [
            {
                "use": "usual",
                "system": "Blockchain:Payer",
                "value": "resource:org.fhir.core.Organization#All_American_Health"
            }
        ],
        "active": true,
        "type_": [
            {
                "coding": [
                    {
                        "system": "http://hl7.org/fhir/organization-type",
                        "code": "ins",
                        "display": "Insurance Company"
                    }
                ]
            }
        ],
        "name": "ABC Healthcare Insurance",
        "telecom": [
            {
                "system": "phone",
                "value": "098-765 4321"
            }
        ],
        "address": [
            {
                "line": [
                    "Somewhere Newport Beach"
                ]
            }
        ],
        "contact": [
            {
                "purpose": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                            "code": "ADMIN"
                        }
                    ]
                },
                "name": {
                    "text": "Insurance Management Guy"
                },
                "telecom": [
                    {
                        "system": "phone",
                        "value": "1-234-567-8910"
                    },
                    {
                        "system": "email",
                        "value": "cool_guy@insura.com"
                    },
                    {
                        "system": "fax",
                        "value": "022-655 2322"
                    }
                ],
                "address": {
                    "line": [
                        "Somewhere Newport Beach"
                    ]
                }
            }
        ]
    }
EndOfMessage


./node_modules/.bin/hurl invoke financial organization_create "$orgABC_Healthcare" "$FINGERPRINT"


echo "STEP 2: Completed Creating Organization first Payer"
echo "STEP 3: Creating Participant Bob"

read -r -d '' partBob << EndOfMessage 
{
        "id": "Consumer::Bob"
    }
EndOfMessage

./node_modules/.bin/hurl invoke financial participant_createConsumer "$partBob" "$FINGERPRINT"

echo "STEP 3: Completed Creating Participant Bob"

echo "STEP 4: Creating Participant Payer"

read -r -d '' payerInsura << EndOfMessage 
{
    "id": "Payer::Insura",
    "payerUid": "resource:org.fhir.core.Organization#All_American_Health"
}
EndOfMessage

./node_modules/.bin/hurl invoke financial participant_createPayer "$payerInsura"

echo "STEP 4: Completed Creating Participant Payer"
echo "STEP 5: Creating Participant Provider"

read -r -d '' providerProvida << EndOfMessage 
{
    "id": "Provider::Provida",
    "providerUid": "resource:org.fhir.core.Organization#Southbend_Flu_Clinic"
}
EndOfMessage

./node_modules/.bin/hurl invoke financial participant_createProvider "$providerProvida"
echo "STEP 5: Completed Creating Participant Provider"

echo "The mock data has been provisioned successfully"