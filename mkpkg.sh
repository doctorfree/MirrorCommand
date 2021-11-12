#!/bin/bash
PKG="mirrorcommandline"
PKG_NAME="MirrorCommandLine"
PKG_VER="2.2"
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
sudo rm -rf dist
mkdir dist

[ -d ${OUT_DIR} ] && rm -rf ${OUT_DIR}
mkdir ${OUT_DIR}
cp -a pkg ${OUT_DIR}/DEBIAN

echo "Package: ${PKG}
Version: ${PKG_VER}
Section: misc
Priority: optional
Architecture: armhf
Depends: qterminal (>= 0.14.1), git (>= 2.20.1)
Maintainer: ${DEBFULLNAME} <${DEBEMAIL}>
Build-Depends: debhelper (>= 11)
Standards-Version: 4.1.3
Homepage: https://gitlab.com/doctorfree/MirrorCommandLine
Description: MagicMirror Command Line Tools
 Manage your MagicMirror from the command line" > ${OUT_DIR}/DEBIAN/control

for dir in "${TOP}" "${DESTDIR}" "${MM}" "${TOP}/share" "${TOP}/share/applications" \
            "${TOP}/share/doc" "${TOP}/share/doc/${PKG}"
do
    [ -d ${OUT_DIR}/${dir} ] || sudo mkdir ${OUT_DIR}/${dir}
    sudo chown root:root ${OUT_DIR}/${dir}
done

for dir in bin etc css config modules pics
do
    [ -d ${OUT_DIR}/${MM}/${dir} ] && sudo rm -rf ${OUT_DIR}/${MM}/${dir}
done

sudo cp -a bin ${OUT_DIR}/${MM}/bin
sudo cp -a pics ${OUT_DIR}/${MM}/pics

for script in *.sh
do
    grep ${script} .gitignore > /dev/null || {
        dest=`echo ${script} | sed -e "s/\.sh//"`
        sudo cp ${script} ${OUT_DIR}/${MM}/bin/${dest}
    }
done

sudo cp *.desktop "${OUT_DIR}/${TOP}/share/applications"
sudo cp AUTHORS ${OUT_DIR}/${TOP}/share/doc/${PKG}/AUTHORS
sudo cp LICENSE ${OUT_DIR}/${TOP}/share/doc/${PKG}/copyright
sudo cp CHANGELOG.md ${OUT_DIR}/${TOP}/share/doc/${PKG}/changelog
sudo cp README.md ${OUT_DIR}/${TOP}/share/doc/${PKG}/README
sudo gzip -9 ${OUT_DIR}/${TOP}/share/doc/${PKG}/changelog

sudo cp -a config ${OUT_DIR}/${MM}/config
sudo cp -a css ${OUT_DIR}/${MM}/css
sudo cp -a etc ${OUT_DIR}/${MM}/etc
sudo cp -a modules ${OUT_DIR}/${MM}/modules

[ -f .gitignore ] && {
    while read ignore
    do
        sudo rm -f ${OUT_DIR}/${MM}/${ignore}
    done < .gitignore
}

sudo chmod 755 ${OUT_DIR}/${MM}/bin/*

cd dist
echo "Building ${PKG_NAME}_${PKG_VER} package"
sudo dpkg-deb --build ${PKG_NAME}_${PKG_VER}
cd ${PKG_NAME}_${PKG_VER}
echo "Creating compressed tar archive of ${PKG_NAME} ${PKG_VER} distribution"
tar cf - usr | gzip -9 > ../${PKG_NAME}_${PKG_VER}-dist.tar.gz
echo "Creating zip archive of ${PKG_NAME} ${PKG_VER} distribution"
zip -q -r ../${PKG_NAME}_${PKG_VER}-dist.zip usr

cd "${SRC}/${PKG_NAME}"

PKG="mirror-images"
PKG_NAME="MirrorImages"
SRC=${HOME}/src
# Subdirectory in which to create the distribution files
OUT_DIR="dist/${PKG_NAME}_${PKG_VER}"

[ -d ${OUT_DIR} ] && rm -rf ${OUT_DIR}
mkdir ${OUT_DIR}
cp -a pkgimg ${OUT_DIR}/DEBIAN

echo "Package: ${PKG}
Version: ${PKG_VER}
Section: misc
Priority: optional
Architecture: armhf
Depends: mirrorcommandline (>= 2.2)
Maintainer: ${DEBFULLNAME} <${DEBEMAIL}>
Build-Depends: debhelper (>= 11)
Standards-Version: 4.1.3
Homepage: https://gitlab.com/doctorfree/MirrorCommandLine
Description: MagicMirror Images
 Images for a MagicMirror using the MirrorCommandLine configs" > ${OUT_DIR}/DEBIAN/control

for dir in "${TOP}" "${TOP}/share" "${TOP}/share/doc" "${TOP}/share/doc/${PKG}"
do
    [ -d ${OUT_DIR}/${dir} ] || sudo mkdir ${OUT_DIR}/${dir}
    sudo chown root:root ${OUT_DIR}/${dir}
done

sudo cp AUTHORS ${OUT_DIR}/${TOP}/share/doc/${PKG}/AUTHORS
sudo cp LICENSE ${OUT_DIR}/${TOP}/share/doc/${PKG}/copyright
sudo cp CHANGELOG.md ${OUT_DIR}/${TOP}/share/doc/${PKG}/changelog
sudo cp README.md ${OUT_DIR}/${TOP}/share/doc/${PKG}/README
sudo gzip -9 ${OUT_DIR}/${TOP}/share/doc/${PKG}/changelog

cd dist
echo "Building ${PKG_NAME}_${PKG_VER} package"
sudo dpkg-deb --build ${PKG_NAME}_${PKG_VER}

[ -d ../releases ] || mkdir ../releases
[ -d ../releases/${PKG_VER} ] || mkdir ../releases/${PKG_VER}
sudo cp *.deb *.gz *.zip ../releases/${PKG_VER}
