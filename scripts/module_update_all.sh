#!/bin/bash

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
MOD_DIR="${MMHOME}/modules"
REBUILD=

usage() {
  echo "Usage: module_update_all [-r]"
  exit 0
}

[ "$1" == "-r" ] && {
  REBUILD=1
  shift
}

[ -d  ${MOD_DIR} ] || {
  echo "Modules directory $MOD_DIR does not exist or is not a directory."
  echo "Exiting."
  exit 1
}

cd ${MOD_DIR}
for module in *
do
  [ -d "${module}/.git" ] || continue
  [ "${module}" == "default" ] && continue
  cd "${module}"
  case "${module}" in
    EXT-Detector)
        if [ "${REBUILD}" ]
        then
            npm run rebuild
        else
            npm run update
        fi
        ;;
    Gateway|EXT-Alert|MMM-GoogleAssistant)
        npm run update
        ;;
    *)
        git pull
        npm install
        ;;
  esac
  cd ..
done
