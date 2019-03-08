VIEWS=$(dirname "$0")
DB=ch1_financial

curl -X PUT "http://127.0.0.1:5084/$DB/_design/financial" \
  --upload-file $VIEWS/views.json

curl -X PUT "http://127.0.0.1:5184/$DB/_design/financial" \
  --upload-file $VIEWS/views.json
