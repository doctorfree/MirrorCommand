#!/bin/bash

PKG_NAME="MirrorCommandLine"
PKG_VER="2.1"
SRC="${HOME}/src"
DEB="${SRC}/${PKG_NAME}/dist/${PKG_NAME}_${PKG_VER}.deb"

[ -f "${DEB}" ] || {
    echo "$DEB not found. Exiting."
    exit 1
}

# Versions of apt prior to 1.1 do not support install by Debian filename
# You should probably be running a more recent version of apt
# On these early versions, install with the following:
#
# sudo dpkg -i "${DEB}"
# sudo apt-get install -f

sudo apt install "${DEB}"
