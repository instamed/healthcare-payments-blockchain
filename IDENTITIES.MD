# Run this on you terminal

```bash
set -e
PAYER="$(node -e "console.log(JSON.parse(require('fs').readFileSync(require('path').resolve(require('os').homedir(), 'hyperledger-fabric-network/.hfc-org1/user1'), 'utf8')).enrollment.identity.certificate)" | openssl x509 -fingerprint -noout | cut -d '=' -f2 )"
PATIENT="$(node -e "console.log(JSON.parse(require('fs').readFileSync(require('path').resolve(require('os').homedir(), 'hyperledger-fabric-network/.hfc-org2/user1'), 'utf8')).enrollment.identity.certificate)" | openssl x509 -fingerprint -noout | cut -d '=' -f2 )"
PROVIDER="$(node -e "console.log(JSON.parse(require('fs').readFileSync(require('path').resolve(require('os').homedir(), 'hyperledger-fabric-network/.hfc-org3/user1'), 'utf8')).enrollment.identity.certificate)" | openssl x509 -fingerprint -noout | cut -d '=' -f2 )"

set +e
echo "payer finterprint" $PAYER
echo "patient finterprint" $PATIENT
echo "provider finterprint" $PROVIDER
```


## For production


```bash
set -e
PAYER="$(node -e "console.log(JSON.parse(require('fs').readFileSync(require('path').resolve('./packages/server/config/payer'), 'utf8')).enrollment.identity.certificate)" | openssl x509 -fingerprint -noout | cut -d '=' -f2 )"
PATIENT="$(node -e "console.log(JSON.parse(require('fs').readFileSync(require('path').resolve('./packages/server/config/instamed'), 'utf8')).enrollment.identity.certificate)" | openssl x509 -fingerprint -noout | cut -d '=' -f2 )"
PROVIDER="$(node -e "console.log(JSON.parse(require('fs').readFileSync(require('path').resolve('./packages/server/config/provider'), 'utf8')).enrollment.identity.certificate)" | openssl x509 -fingerprint -noout | cut -d '=' -f2 )"

set +e
echo "payer finterprint" $PAYER
echo "patient finterprint" $PATIENT
echo "provider finterprint" $PROVIDER
```
