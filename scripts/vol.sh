#!/bin/bash
#
# Volume control script copied from https://dronkert.nl/rpi/vol.html
# Modified by Ronald Joe Record to:
#    - accept card number, quiet mode
#    - mute/unmute/save/restore volume
#    - No need to calculate percentage, use ##% format to specify a percentage
#
# Usage:
# vol       Outputs the current volume as a number between 0 and 100
# vol +     Turn up the volume by $ADJ percent
# vol -     Turn down the volume by $ADJ percent
# vol 85    Set the volume to 85%
# vol -c 2 ...    Get/Set volume on card number 2
# vol -q    Quiet mode
# vol -m    Mute/Unmute volume
# vol -r    Restore volume to previous level setting
# vol -s    Save current volume setting

MIXER=amixer
MIRROR_VOLUME=$HOME/.mirror_volume

# Set this to the card number you wish to control by default
# Use 'aplay -l' to get a listing of the supported cards
# Use 'vol -c # ..." to specify an alternate card on the command line
CARD=1
MUTE=
REST=
SAVE=
VERB=1
# Adjust these to your preference
declare -i LO=0     # Minimum volume; try 10 to avoid complete silence
declare -i HI=100   # Maximum volume; try 95 to avoid distortion
declare -i ADJ=3    # Volume adjustment step size

usage ()
{
	echo "Usage: `basename $0` [-c cardnumber] [-mqrsu] [ - | + | N ]" >&2
	echo "  Where N is a whole number percentage between $LO and $HI, inclusive." >&2
	echo "  -m toggles volume mute/unmute" >&2
	echo "  -q indicates quiet mode, do not output messages" >&2
	echo "  -r indicates restore saved volume setting" >&2
	echo "  -s indicates save current volume setting in ${MIRROR_VOLUME}" >&2
	echo "  +/- increase/decrease the volume setting by ${ADJ}%" >&2
	exit 1
}

EXE=$(which $MIXER)
if [ -z "$EXE" ]; then
	echo "Error: $MIXER not found. Try \"sudo apt-get install alsa-utils\" first." >&2
	exit 2
fi

while getopts c:mqrsu flag; do
    case $flag in
        c)
            CARD="$OPTARG"
            ;;
        m)
            MUTE=1
            ;;
        q)
            VERB=
            ;;
        r)
            REST=1
            ;;
        s)
            SAVE=1
            ;;
        u)
            usage
            ;;
	esac
done
shift $(( OPTIND - 1 ))

# Argument must be one of: empty, -, +, number
[[ $1 == ?(-|+|+([0-9])) ]] || {
	[ "${MUTE}" ] || usage
}

# Restore volume if requested
[ "${REST}" ] && {
    if [ -f ${MIRROR_VOLUME} ]
    then
        [ "${VERB}" ] && echo "Restoring saved volume setting"
	    ARG=`cat ${MIRROR_VOLUME}`
		vol ${ARG}
    else
        [ "${VERB}" ] && {
	        echo "Previous volume setting not saved. Unable to restore volume level."
	    }
        exit 1
    fi
    exit 0
}

if [ "${MUTE}" ]
then
    ARG="${LO}"
else
    ARG="$1"
fi

# Number argument
if [[ $ARG == +([0-9]) ]]; then
	# Strip leading zeros
	while [[ $ARG == 0+([0-9]) ]]; do
		ARG=${ARG#0}
	done
	# Must be between LO and HI
	(( ARG >= LO && ARG <= HI )) || usage
fi

GET=$($EXE cget numid=$CARD | /bin/grep -v dBminmax)

declare -i MIN=$(echo $GET | /bin/grep -E -o -e ',min=[^,]+' | /bin/grep -E -o -e '[0-9-]+')
declare -i MAX=$(echo $GET | /bin/grep -E -o -e ',max=[^,]+' | /bin/grep -E -o -e '[0-9-]+')
declare -i VAL=$(echo $GET | /bin/grep -E -o -e ': values=[0-9+-]+' | /bin/grep -E -o -e '[0-9-]+')

if (( MIN >= MAX || VAL < MIN || VAL > MAX )); then
	echo "Error: could not get the right values from $MIXER output." >&2
	exit 3
fi

declare -i LEN=0
(( LEN = MAX - MIN ))

declare -i ABS=0
(( ABS = VAL - MIN ))

declare -i PCT=0
(( PCT = 100 * ABS / LEN ))

[ "${SAVE}" ] && {
    [ "${VERB}" ] && echo "Saving current volume setting = ${PCT}"
	echo "${PCT}" > ${MIRROR_VOLUME}
	exit 0
}

[ "${MUTE}" ] && {
    if [ ${PCT} -eq ${LO} ]
	then
        [ "${VERB}" ] && echo "Unmuting volume"
		if [ -f ${MIRROR_VOLUME} ]
		then
			ARG=`cat ${MIRROR_VOLUME}`
		else
            [ "${VERB}" ] && {
			    echo "Previous volume setting not saved. Restoring to maximum volume"
			}
			vol ${HI}
		    exit 0
		fi
	else
        [ "${VERB}" ] && echo "Muting volume"
	fi
}

if [ ! -z "$ARG" ]; then

	declare -i OLD=$PCT

	if [[ "$ARG" == "+" ]]; then
		(( PCT += ADJ ))
	elif [[ "$ARG" == "-" ]]; then
		(( PCT -= ADJ ))
	else
		PCT=$ARG
	fi

	if [[ "$PCT" != "$OLD" ]]; then
		$EXE -q cset numid=$CARD -- ${PCT}%
		[ "${MUTE}" ] || echo "${PCT}" > ${MIRROR_VOLUME}
	fi
fi

[ "${VERB}" ] && echo "Volume set to $PCT%"
exit 0
