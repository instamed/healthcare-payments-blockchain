VIEWS=$(dirname "$0")
SERVER=34.73.112.77:30042
CHAINCODE=fhirfinancial
DB=public_$CHAINCODE

curl -X PUT "http://$SERVER/$DB/_design/$CHAINCODE" \
  --upload-file $VIEWS/views.json
