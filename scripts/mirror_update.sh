#!/bin/bash

MIR_DIR="$HOME/MagicMirror"

[ -d ${MIR_DIR} ] || {
  trymirror="MMM-${module}"
  for trymirror in /home/*
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
