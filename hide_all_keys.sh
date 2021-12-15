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
cd "${CONFDIR}/../config-landscape"
echo "Hiding keys in $CONFDIR/../config-landscape"
../hide_keys.sh
for i in Artists JAV Models Photos Photographers Templates YouTube
do
    [ -d $i ] && {
        cd $i
        echo "Hiding keys in ../config-landscape/$i"
        ../../hide_keys.sh
        cd ..
    }
done
cd "${CONFDIR}/../config-notelegram"
echo "Hiding keys in $CONFDIR/../config-notelegram"
../hide_keys.sh
for i in Artists JAV Models Photos Photographers Templates YouTube
do
    [ -d $i ] && {
        cd $i
        echo "Hiding keys in ../config-notelegram/$i"
        ../../hide_keys.sh
        cd ..
    }
done
cd "${CONFDIR}/../config-landscape-notelegram"
echo "Hiding keys in $CONFDIR/../config-landscape-notelegram"
../hide_keys.sh
for i in Artists JAV Models Photos Photographers Templates YouTube
do
    [ -d $i ] && {
        cd $i
        echo "Hiding keys in ../config-landscape-notelegram/$i"
        ../../hide_keys.sh
        cd ..
    }
done

cd "${BINDIR}"
echo "Hiding keys in $BINDIR"
../hide_bin_keys.sh
