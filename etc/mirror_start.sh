#!/bin/bash
#
MM=${HOME}/MagicMirror

[ -d ${MM}/config ] || {
      MM=
      for homedir in /usr/local /home/*
      do
          [ "${homedir}" == "/home/*" ] && continue
          [ -d ${homedir}/MagicMirror/config ] && {
              MM="${homedir}/MagicMirror"
              break
          }
      done
}

[ "${MM}" ] || {
    echo "Cannot locate MagicMirror installation directory. Exiting."
    exit 1
}

MS="${MM}/.mirrorscreen"
HAVE_PORT=

[ -f ${MS} ] && {
  . ${MS}
  grep PORTRAIT= ${MS} > /dev/null && HAVE_PORT=1
}

[ "${HAVE_PORT}" ] || {
  PORTRAIT=1
  SCREEN_RES=`xdpyinfo | awk '/dimensions/ {print $2}'`
  echo ${SCREEN_RES} | grep x > /dev/null && {
    SCREEN_WIDTH=`echo ${SCREEN_RES} | awk -F 'x' ' { print $1 } '`
    SCREEN_HEIGHT=`echo ${SCREEN_RES} | awk -F 'x' ' { print $2 } '`
  }
  if ! [[ "$SCREEN_WIDTH" =~ ^[0-9]+$ ]]
  then
    SCREEN_WIDTH=`xrandr | grep current | awk -F ',' ' { print $2 } ' | awk ' { print $2 } '`
  fi
  if ! [[ "$SCREEN_HEIGHT" =~ ^[0-9]+$ ]]
  then
    SCREEN_HEIGHT=`xrandr | grep current | awk -F ',' ' { print $2 } ' | awk ' { print $4 } '`
  fi
  [ ${SCREEN_WIDTH} -gt ${SCREEN_HEIGHT} ] && PORTRAIT=
}

CONF=${MM}/config

# If there is an existing config.js and we are in portrait mode
# then check if it is one that requires screen rotation
if [ -L ${CONF}/config.js ]
then
  config=`readlink ${CONF}/config.js`
  config=`basename ${config}`
  config=`echo $config | sed -e "s/\.js$//" -e "s/^config-//"`
else
  config="config"
fi

primary=`xrandr --query --verbose | grep connected | grep -v disconnected | grep primary > /dev/null`
if [ "${primary}" ]
then
  rotation=`xrandr --query --verbose | grep connected | grep -v disconnected | awk ' { print $6 } '`
else
  rotation=`xrandr --query --verbose | grep connected | grep -v disconnected | awk ' { print $5 } '`
fi
HDMI=`xrandr --listactivemonitors | grep 0: | awk ' { print $4 } '`

if [ "${PORTRAIT}" ]
then
  case ${config} in
    tantra|iframe|candy|fractalplaylist|hardzoom)
      [ "$rotation" == "normal" ] || {
        printf "\n${BOLD}Rotating screen display normal ${NORMAL}\n"
        [ "${HDMI}" ] && xrandr --output ${HDMI} --rotate normal
      }
      ;;
    *)
      [ "$rotation" == "right" ] || {
        printf "\n${BOLD}Rotating screen display right ${NORMAL}\n"
        [ "${HDMI}" ] && xrandr --output ${HDMI} --rotate right
      }
      ;;
  esac
else
  printf "\n${BOLD}Rotating screen display normal ${NORMAL}\n"
  [ "${HDMI}" ] && xrandr --output ${HDMI} --rotate normal
fi

cd ${MM}
DISPLAY=:0 npm start
