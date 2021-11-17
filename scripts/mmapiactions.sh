#!/bin/bash

apikey="xxx_Remote-Control-API-Key_xxxxx"

curl -X GET http://10.0.1.85:8080/api/modules?apiKey=${apikey} | jq .
