#!/bin/bash

MOD_DIR="$HOME/MagicMirror/modules"
REBUILD=

[ "$1" ] || {
  echo "Usage: module_update [-r] [module name]"
  exit 0
}

[ "$1" == "-r" ] && {
  REBUILD=1
  shift
}

for module in $*
do
  [ -d ${MOD_DIR}/${module} ] || {
    trymodule="MMM-${module}"
    [ -d ${MOD_DIR}/${trymodule} ] || {
      echo "Cannot locate module ${module}, skipping"
      continue
    }
    module=${trymodule}
  }
  cd ${MOD_DIR}/${module}
  case ${module} in
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