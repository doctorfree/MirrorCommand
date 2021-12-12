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
MIR_DIR="${MMHOME}"

[ -d ${MIR_DIR} ] || {
  trymirror="MMM-${module}"
  for trymirror in /usr/local /home/*
  do
    [ -d ${trymirror}/MagicMirror ] && {
      MIR_DIR=${trymirror}/MagicMirror
      break
    }
  done
  echo "Cannot locate MagicMirror home. Exiting."
  exit 1
}

cd ${MIR_DIR}
git pull
npm install
