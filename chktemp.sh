#!/bin/bash
#
# chktemp - Get the Raspberry Pi temperature and SMS that using Nexmo, shutdown if too hot

TEMPC=`vcgencmd measure_temp | egrep -o '[0-9]*\.[0-9]*'`
TEMPF=`echo "scale=2; 1.8 * ${TEMPC} + 32" | bc`
DATE=`date "+%b %d, %Y"`
TIME=`date "+%T"`
QUIET=

sendsms() {
    MESSAGE="$*"

    curl -X "POST" "https://rest.nexmo.com/sms/json" \
         -d "from=xxxxxxx_Nexmo_From_xxxxxxxxxxx" \
         -d "text=${MESSAGE}" \
         -d "to=xxxxxxx_Nexmo_To_xxxxxxxxxxx" \
         -d "api_key=xxxxxxx_Nexmo_Key_xxxxxxxxxxx" \
         -d "api_secret=xxxxxxx_Nexmo_Secret_xxxxxxxxxxx"
}

[ "$1" == "-q" ] && QUIET=1

[ "${QUIET}" ] || printf "\n${DATE}:${TIME} Temp = ${TEMPF}F\t${TEMPC}C\n"

[ "${QUIET}" ] || sendsms On ${DATE} at ${TIME} the Raspberry Pi temp is ${TEMPF}F ${TEMPC}C

# Shutdown if temperature exceeds some reasonable threshold
if [ "${TEMPC}" ]
then
    [ $(echo "${TEMPC} > 75.0" | bc -l) ] || {
        sendsms Raspberry Pi temperature of ${TEMPC} exceeds heat threshold. Shutting down.
        /usr/local/bin/shutdown
    }
else
    if [ "${TEMPF}" ]
    then
        [ $(echo "${TEMPF} > 167.0" | bc -l) ] || {
            sendsms Raspberry Pi temperature of ${TEMPF} exceeds heat threshold. Shutting down.
            /usr/local/bin/shutdown
        }
    else
        [ "${QUIET}" ] || echo "Unable to retrieve non-empty temperature for Raspberry Pi"
    fi
fi
