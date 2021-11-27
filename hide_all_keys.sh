#!/bin/bash

CONFDIR="$HOME/src/MirrorCommandLine/config"
BINDIR="$HOME/src/MirrorCommandLine/bin"

cd "${CONFDIR}"
echo "Hiding keys in $CONFDIR"
../hide_keys.sh
for i in Artists JAV Models Photos Photographers Templates YouTube
do
    [ -d $i ] && {
        cd $i
        echo "Hiding keys in $i"
        ../../hide_keys.sh
        cd ..
    }
done
cd "${CONFDIR}/NoTelegram"
echo "Hiding keys in $CONFDIR/NoTelegram"
../../hide_keys.sh
for i in Artists JAV Models Photos Photographers Templates YouTube
do
    [ -d $i ] && {
        cd $i
        echo "Hiding keys in NoTelegram/$i"
        ../../../hide_keys.sh
        cd ..
    }
done

cd "${BINDIR}"
echo "Hiding keys in $BINDIR"
../hide_bin_keys.sh
