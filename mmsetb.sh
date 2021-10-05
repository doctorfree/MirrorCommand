#!/bin/bash
#
# Set the MagicMirror brightness setting
#
IP="10.0.1.85"
PORT=8080
apikey="MMM-Remote-Control_API_Key"

usage() {
    echo "Usage: mmsetb [number]"
    echo "Where 'number' is an integer value in the range 0-200"
    exit 1
}

[ "$1" ] || usage

if [ "$1" -ge 0 ] && [ "$1" -le 200 ]
then
    usejq=`type -p jq`
    if [ "$usejq" ]
    then
        curl -X GET http://${IP}:${PORT}/api/brightness/$1?apiKey=${apikey} 2> /dev/null | jq .
    else
        curl -X GET http://${IP}:${PORT}/api/brightness/$1?apiKey=${apikey}
        echo ""
    fi
else
    echo "Brightness setting $1 out of range or not a number"
    echo "Valid brightness values are integer values [0-200]"
    usage
fi
