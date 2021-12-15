#!/bin/bash

CONFDIR="$HOME/src/MirrorCommandLine/config"
BINDIR="$HOME/src/MirrorCommandLine/bin"

cd "${CONFDIR}"
echo "Showing keys in $CONFDIR"
../show_keys.sh
for i in Artists JAV Models Photos Photographers Templates YouTube
do
    [ -d $i ] && {
        cd $i
        echo "Showing keys in $i"
        ../../show_keys.sh
        cd ..
    }
done
cd "${CONFDIR}/../config-landscape"
echo "Showing keys in $CONFDIR/../config-landscape"
../show_keys.sh
for i in Artists JAV Models Photos Photographers Templates YouTube
do
    [ -d $i ] && {
        cd $i
        echo "Showing keys in ../config-landscape/$i"
        ../../show_keys.sh
        cd ..
    }
done
cd "${CONFDIR}/../config-notelegram"
echo "Showing keys in $CONFDIR/../config-notelegram"
../show_keys.sh
for i in Artists JAV Models Photos Photographers Templates YouTube
do
    [ -d $i ] && {
        cd $i
        echo "Showing keys in ../config-notelegram/$i"
        ../../show_keys.sh
        cd ..
    }
done
cd "${CONFDIR}/../config-landscape-notelegram"
echo "Showing keys in $CONFDIR/../config-landscape-notelegram"
../show_keys.sh
for i in Artists JAV Models Photos Photographers Templates YouTube
do
    [ -d $i ] && {
        cd $i
        echo "Showing keys in ../config-landscape-notelegram/$i"
        ../../show_keys.sh
        cd ..
    }
done

cd "${BINDIR}"
echo "Showing keys in $BINDIR"
../show_bin_keys.sh
