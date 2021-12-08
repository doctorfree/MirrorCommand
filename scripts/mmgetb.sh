#!/bin/bash

apikey="xxx_Remote-Control-API-Key_xxxxx"

# Get the current brightness setting
usejq=`type -p jq`
if [ "$usejq" ]
then
    curl -X GET http://MM.M.M.MM:8080/api/brightness?apiKey=${apikey} 2> /dev/null | jq .
else
    curl -X GET http://MM.M.M.MM:8080/api/brightness?apiKey=${apikey}
    echo ""
fi
