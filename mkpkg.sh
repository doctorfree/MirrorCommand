#!/bin/bash

PKG_NAME="MirrorCommandLine"
PKG_VER="2.1"
TOP="usr"
DESTDIR="${TOP}/local"
MM="${DESTDIR}/MagicMirror"
SRC=${HOME}/src
# Subdirectory in which to create the distribution files
OUT_DIR="dist/${PKG_NAME}_${PKG_VER}"

[ -d "${SRC}/${PKG_NAME}" ] || {
    echo "$SRC/$PKG_NAME does not exist or is not a directory. Exiting."
    exit 1
}

cd "${SRC}/${PKG_NAME}"
[ -d dist ] || mkdir dist
[ -d ${OUT_DIR} ] && rm -rf ${OUT_DIR}
mkdir ${OUT_DIR}
mkdir ${OUT_DIR}/DEBIAN
echo "Package: ${PKG_NAME}
Version: ${PKG_VER}
Section: base
Priority: optional
Architecture: armhf
Depends: qterminal (>= 0.14.1)
Maintainer: ${DEBFULLNAME} <${DEBEMAIL}>
Description: MagicMirror Command Line Tools
 Manage your MagicMirror from the command line" > ${OUT_DIR}/DEBIAN/control

for dir in "${TOP}" "${DESTDIR}" "${MM}" "${TOP}/share" "${TOP}/share/applications"
do
    [ -d ${OUT_DIR}/${dir} ] || mkdir ${OUT_DIR}/${dir}
done

for dir in bin etc css config modules
do
    [ -d ${OUT_DIR}/${MM}/${dir} ] && rm -rf ${OUT_DIR}/${MM}/${dir}
done

cp -a bin ${OUT_DIR}/${MM}/bin

for script in *.sh
do
    grep ${script} .gitignore > /dev/null || {
        dest=`echo ${script} | sed -e "s/\.sh//"`
        cp ${script} ${OUT_DIR}/${MM}/bin/${dest}
    }
done

cp *.desktop "${OUT_DIR}/${TOP}/share/applications"

cp -a config ${OUT_DIR}/${MM}/config
cp -a css ${OUT_DIR}/${MM}/css
cp -a etc ${OUT_DIR}/${MM}/etc
cp -a modules ${OUT_DIR}/${MM}/modules

[ -f .gitignore ] && {
    while read ignore
    do
        rm -f ${OUT_DIR}/${MM}/${ignore}
    done < .gitignore
}

chmod 755 ${OUT_DIR}/${MM}/bin/*

cd dist
dpkg-deb --build ${PKG_NAME}_${PKG_VER}
cd ${PKG_NAME}_${PKG_VER}
tar cf - usr | gzip -9 > ../${PKG_NAME}_${PKG_VER}-dist.tar.gz
