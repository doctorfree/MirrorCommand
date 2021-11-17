#!/bin/bash

apikey="xxx_Remote-Control-API-Key_xxxxx"

# Get the current brightness setting
usejq=`type -p jq`
if [ "$usejq" ]
then
    curl -X GET http://10.0.1.85:8080/api/brightness?apiKey=${apikey} 2> /dev/null | jq .
else
    curl -X GET http://10.0.1.85:8080/api/brightness?apiKey=${apikey}
    echo ""
fi
