#!/bin/bash
#
MMHOME=${HOME}/MagicMirror
[ -d ${MMHOME}/config ] || {
    MMHOME=
    for homedir in /usr/local /home/*
    do
        [ "${homedir}" == "/home/*" ] && continue
        [ -d ${homedir}/MagicMirror/config ] && {
            MMHOME="${homedir}/MagicMirror"
            break
        }
    done
}
CONFDIR=${MMHOME}/config
[ -d ${CONFDIR} ] || {
    echo "$CONFDIR does not exist or is not a directory. Exiting."
    exit 1
}

cd ${CONFDIR}
if [ "$1" == "all" ]
then
    current=`ls -l config.js | awk ' { print $11 } '`
    echo "Saving $current MagicMirror configuration"
    for config in config-*.js */config-*.js
    do
        [ "$config" == "config-*.js" ] && {
            echo "No MagicMirror configuration files found in $CONFDIR"
            continue
        }
        [ "$config" == "*/config-*.js" ] && {
            echo "No MagicMirror configuration files found in $CONFDIR subdirs"
            continue
        }
        rm -f config.js
        ln -s ${config} config.js
        echo "Checking ${config} ..."
        npm run --silent config:check
        echo "Done"
    done
    echo "Restoring $current MagicMirror configuration"
    rm -f config.js
    ln -s ${current} config.js
else
    npm run --silent config:check
fi
