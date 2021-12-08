#!/bin/bash

apikey="xxx_Remote-Control-API-Key_xxxxx"

curl -X GET http://MM.M.M.MM:8080/api/modules?apiKey=${apikey} | jq .
