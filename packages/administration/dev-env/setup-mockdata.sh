#!/bin/bash
set +e

FINGERPRINT=`node -e "console.log(JSON.parse(require('fs').readFileSync('$HOME/hyperledger-fabric-network/.hfc-org1/user1', 'utf8')).enrollment.identity.certificate)" | openssl x509 -fingerprint -noout | cut -d '=' -f2`

echo "Setup Organizations"

read -r -d '' basicOrganizations << EndOfMessage
[
"ABC_HEALTHCARE", "XYZ_PROVIDER", "InstaMed"
]
EndOfMessage

./node_modules/.bin/hurl invoke financial governance_updateOrganizationsList "$basicOrganizations"


echo "The mock data has been provisioned successfully"

# echo "Installing CouchDB views"
# npm run views:install
# echo "CouchDB views ready"