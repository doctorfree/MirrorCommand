#!/bin/bash
#
# Volume control script copied from https://dronkert.nl/rpi/vol.html
# Modified to accept card number, mode, and mute/restore arguments
#
# Usage:
# vol       Outputs the current volume as a number between 0 and 100
# vol +     Turn up the volume by $ADJ
# vol -     Turn down the volume by $ADJ
# vol 85    Set the volume to 85
# vol -c 2 ...    Get/Set volume on card number 2
# vol -q    Quiet mode
# vol -m    Mute volume
# vol -r    Restore volume to previous level setting

MIX=amixer
CARD=1
MUTE=
VERB=1
declare -i LO=0     # Minimum volume; try 10 to avoid complete silence
declare -i HI=100   # Maximum volume; try 95 to avoid distortion
declare -i ADJ=5    # Volume adjustment step size

usage ()
{
	echo "Usage: `basename $0` [-c cardnumber] [-m] [-q] [-u] [ - | + | N ]" >&2
	echo "  where N is a whole number between $LO and $HI, inclusive." >&2
	exit 1
}

EXE=$(which $MIX)
if [ -z "$EXE" ]; then
	echo "Error: $MIX not found. Try \"sudo apt-get install alsa-utils\" first." >&2
	exit 2
fi

while getopts c:mqu flag; do
    case $flag in
        c)
            CARD="$OPTARG"
            ;;
        m)
            # TODO: Get/Save volume setting
            MUTE=1
            ;;
        q)
            VERB=
            ;;
        u)
            usage
            ;;
	esac
done
shift $(( OPTIND - 1 ))

[ "${VERB}" ] && [ "${MUTE}" ] && echo "Muting volume"
# TODO: Restore previous volume level from saved setting

# Argument must be one of: empty, -, +, number
[[ $1 == ?(-|+|+([0-9])) ]] || {
	[ "${MUTE}" ] || usage
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

GET=$($EXE cget numid=$CARD)

declare -i MIN=$(echo $GET | /bin/grep -E -o -e ',min=[^,]+' | /bin/grep -E -o -e '[0-9-]+')
declare -i MAX=$(echo $GET | /bin/grep -E -o -e ',max=[^,]+' | /bin/grep -E -o -e '[0-9-]+')
declare -i VAL=$(echo $GET | /bin/grep -E -o -e ': values=[0-9+-]+' | /bin/grep -E -o -e '[0-9-]+')

if (( MIN >= MAX || VAL < MIN || VAL > MAX )); then
	echo "Error: could not get the right values from $MIX output." >&2
	exit 3
fi

declare -i LEN=0
(( LEN = MAX - MIN ))

declare -i ABS=0
(( ABS = VAL - MIN ))

declare -i PCT=0
(( PCT = 100 * ABS / LEN ))

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
		(( ABS = PCT * LEN / 100 ))
		(( VAL = MIN + ABS ))
		$EXE -q cset numid=$CARD -- $VAL
	fi
fi

[ "${VERB}" ] && echo $PCT
exit 0
