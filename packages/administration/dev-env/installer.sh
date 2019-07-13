VIEWS=$(dirname "$0")

DB=ch1_financial

DB_PAYER_PATIENT_PROVIDER="ch1_financial\$\$pabc_healthcare-instamed-xyz_provider"
DB_PAYER_PATIENT="ch1_financial\$\$pabc_healthcare-instamed"
DB_PAYER_PROVIDER="ch1_financial\$\$pabc_healthcare-xyz_provider"
DB_PATIENT_PROVIDER="ch1_financial\$\$pinstamed-xyz_provider"

DBS=( $DB $DB_PAYER_PATIENT_PROVIDER $DB_PAYER_PATIENT $DB_PAYER_PROVIDER $DB_PATIENT_PROVIDER )

echo "All views  ${DBS[*]}"

for var in "${DBS[@]}"
do
  echo "Installing for DB=${var}"

  curl -X PUT "http://127.0.0.1:5084/$var/_design/financial" \
  --upload-file $VIEWS/views.json

  curl -X PUT "http://127.0.0.1:5184/$var/_design/financial" \
    --upload-file $VIEWS/views.json

  curl -X PUT "http://127.0.0.1:5284/$var/_design/financial" \
  --upload-file $VIEWS/views.json
done

