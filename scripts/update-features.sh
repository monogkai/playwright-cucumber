#!/bin/bash
XRAY_PROJECT_KEY='KEY'

echo "Get Token"
TOKEN=$(curl -k --location --request POST "https://xray.cloud.getxray.app/api/v2/authenticate" \
--header "Content-Type: application/json" \
--data-raw "{ \"client_id\": \"$XRAY_USERNAME\", \"client_secret\": \"$XRAY_CLIENT_SECRET\"}"
)

TOKEN=$(echo $TOKEN | tr -d '""')

zip -r -q features.zip e2e/features

curl -k --location --request POST "https://xray.cloud.getxray.app/api/v2/import/feature?projectKey=$XRAY_PROJECT_KEY" \
--header "Authorization: Bearer $TOKEN" \
--form "file=@\"features.zip\""

rm features.zip