#!/bin/bash

MOD_DIR="$HOME/MagicMirror/modules"
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
    MMM-Detector|MMM-GoogleAssistant)
        if [ "${REBUILD}" ]
        then
            npm run rebuild
        else
            npm run update
        fi
        ;;
    *)
        git pull
        npm install
        ;;
  esac
done
