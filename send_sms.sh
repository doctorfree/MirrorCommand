#!/bin/bash

MESSAGE="$*"

curl -X "POST" "https://rest.nexmo.com/sms/json" \
     -d "from=xxxxxxx_Nexmo_From_xxxxxxxxxxx" \
     -d "text=${MESSAGE}" \
     -d "to=xxxxxxx_Nexmo_To_xxxxxxxxxxx" \
     -d "api_key=xxxxxxx_Nexmo_Key_xxxxxxxxxxx" \
     -d "api_secret=xxxxxxx_Nexmo_Secret_xxxxxxxxxxx"
