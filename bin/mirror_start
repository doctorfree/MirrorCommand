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

CONF=${MM}/config

# If there is an existing config.js then check
# if it is one that requires screen rotation
[ -L ${CONF}/config.js ] && {
    config=`readlink ${CONF}/config.js`
    config=`basename ${config}`
    config=`echo $config | sed -e "s/\.js$//" -e "s/^config-//"`
    rotation=`xrandr | grep connected | awk ' { print $5 } '`
    HDMI=`xrandr --listactivemonitors | grep 0: | awk ' { print $4 } '`
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
}

cd ${MM}
DISPLAY=:0 npm start
