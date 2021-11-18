#!/bin/bash

MOD_DIR="$HOME/MagicMirror/modules"

[ "$1" ] || {
  echo "Usage: module_update [module name]"
  exit 0
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
        npm run update
        ;;
    *)
        git pull
        npm install
        ;;
  esac
done
