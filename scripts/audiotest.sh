#!/bin/bash

CARD=1
DEVICE=0
INPDIR="/usr/share/sounds/alsa"
INPUTS="Side_Left.wav \
         Side_Right.wav \
         Front_Center.wav \
         Front_Left.wav \
         Front_Right.wav \
         Noise.wav \
         Rear_Center.wav \
         Rear_Left.wav \
         Rear_Right.wav"

usage() {
    printf "\nUsage: audiotest [-c card] [-d device] [-u]"
    printf "\nDefaults: card 1, device 0\n\n"
    [ -f ${HOME}/.asoundrc ] && {
        printf "Current ALSA settings in $HOME/.asoundrc :\n\n"
        cat ${HOME}/.asoundrc
        printf "\n"
    }
    exit 1
}

while getopts "c:d:u" flag; do
    case $flag in
        c)
            CARD="$OPTARG"
            ;;
        d)
            DEVICE="$OPTARG"
            ;;
        u)
            usage
            ;;
    esac
done

for input in ${INPUTS}
do
    aplay -D plughw:${CARD},${DEVICE} ${INPDIR}/${input}
done
