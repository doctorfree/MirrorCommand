#!/bin/bash
#
## @file mirror.sh
## @brief Convenience script to manage multiple MagicMirror configurations
## @author Ronald Joe Record (rr at ronrecord dot com)
## @copyright Copyright (c) 2020-2022, Ronald Joe Record, all rights reserved.
## @date Written 1-feb-2020
## @version 4.0.1
##
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# The Software is provided "as is", without warranty of any kind, express or
# implied, including but not limited to the warranties of merchantability,
# fitness for a particular purpose and noninfringement. In no event shall the
# authors or copyright holders be liable for any claim, damages or other
# liability, whether in an action of contract, tort or otherwise, arising from,
# out of or in connection with the Software or the use or other dealings in
# the Software.
#
# User configurable settings. Make sure these are correct for your system.
# -----------------------------------------------------------------------
# Set this to your MagicMirror installation directory, typically $HOME/MagicMirror
MM="__MagicMirror_Home__"
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
[ "${MM}" ] || MM="${HOME}/MagicMirror"

# Set the IP and PORT to the values on your system
# IP is the IP address of your MagicMirror Raspberry Pi or 'localhost'
IP="MM.M.M.MM"
# PORT is the port your MMM-Remote-Control module is running on
PORT="8080"
#
# Set you MMM-Remote-Control API Key here or leave blank if you have not configured one
#
# Replace with your MMM-Remote-Control API Key
apikey="xxx_Remote-Control-API-Key_xxxxx"
# Uncomment this line if you have not configured an MMM-Remote-Control API Key
# apikey=
#
# By default, the mirror script uses the PM2 process named "MagicMirror" to
# stop/start/restart and get the status of MagicMirror. If you have setup
# PM2 to manage your MagicMirror process then either name that PM2 process
# "MagicMirror" or change the setting below to your MagicMirror PM2 process name.
#
# Replace with your PM2 MagicMirror process name
PM2_PROCESS_NAME="MagicMirror"
#
modurl="http://${IP}:${PORT}/api/module"
apiurl="http://${IP}:${PORT}/api/notification"

MCL_HOME="/usr/local/MirrorCommand"
[ -d ${MCL_HOME}/bin ] && {
    export PATH=${PATH}:${MCL_HOME}/bin
}

fake_vcgencmd=
have_vcgencmd=`type -p vcgencmd`
[ "${have_vcgencmd}" == "${MCL_HOME}/bin/vcgencmd" ] && fake_vcgencmd=1

# Set this to the X11 DISPLAY you are using. DISPLAY=:0 works for most systems.
export DISPLAY=${DISPLAY:=:0}

MIRRORSCREEN="${MCL_HOME}/etc/mirrorscreen"
HAVE_PORT=
have_xdpyinfo=`type -p xdpyinfo`
[ -f ${MIRRORSCREEN} ] || MIRRORSCREEN="${MM}/.mirrorscreen"
[ -f ${MIRRORSCREEN} ] && {
  . ${MIRRORSCREEN}
  screen=SCREEN_${MM_SCREEN}[mode]
  [ ${!screen+_} ] && {
    PORTRAIT=${!screen}
    HAVE_PORT=1
  }
}
[ "${HAVE_PORT}" ] || {
  PORTRAIT=1
  if [ "${have_xdpyinfo}" ]
  then
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
  else
    SCREEN_WIDTH=`xrandr | grep current | awk -F ',' ' { print $2 } ' | awk ' { print $2 } '`
    SCREEN_HEIGHT=`xrandr | grep current | awk -F ',' ' { print $2 } ' | awk ' { print $4 } '`
  fi
  [ ${SCREEN_WIDTH} -gt ${SCREEN_HEIGHT} ] && PORTRAIT=
}

device=SCREEN_${MM_SCREEN}[hdmi]
if [ ${!device+_} ]
then
  HDMI=${!device}
else
  HDMI=`xrandr --listactivemonitors | grep ${MM_SCREEN}: | awk ' { print $4 } '`
fi

# -----------------------------------------------------------------------
CONFDIR="${MM}/config"
CSSDIR="${MM}/css"
# MagicMirror configuration files organized into subdirectories listed here
CONF_SUBDIRS="Artists JAV Models Photos Photographers YouTube test"
MMCFMSG="MagicMirror configuration file"
SLISDIR="${MCL_HOME}/pics"
ARTIST_TEMPLATE="${CONFDIR}/Templates/config-artist-template.js"
JAV_TEMPLATE="${CONFDIR}/Templates/config-jav-template.js"
MODEL_TEMPLATE="${CONFDIR}/Templates/config-model-template.js"
PHOTO_TEMPLATE="${CONFDIR}/Templates/config-photo-template.js"
WHVN_TEMPLATE="${CONFDIR}/Templates/config-whvn-template.js"
WHVNDIR="Pictures/Wallhaven"
CONFS=
PLEASE="Please enter your MagicMirror"
NUMPROMPT="Enter either a number or text of one of the menu entries"
SUBDIR_CONFS=
START_DEV=
TELEGRAM=
ERROR_EXIT=1
INFO="all"
BOLD=$(tput bold)
NORMAL=$(tput sgr0)
usejq=`type -p jq`
usepm2=`type -p pm2`

# Need this if not using PM2 because MagicMirror does not have a 'stop' npm script
mirror_stop() {
  ps -ef | grep pocket | grep -v "grep"  | awk '{print $2}' | while read pocketpid
  do
    sudo kill -9 ${pocketpid} > /dev/null 2>&1
  done

  ps -ef | grep node | grep -v "grep"  | awk '{print $2}' | while read nodepid
  do
    sudo kill -9 ${nodepid} > /dev/null 2>&1
  done

  ps -ef | grep chromium-browser | grep -v "grep"  | awk '{print $2}' | while read chromepid
  do
    sudo kill -9 ${chromepid} > /dev/null 2>&1
  done
}

pm2msg() {
    printf "\nPM2 is installed but no PM2 process named ${PM2_PROCESS_NAME}"
    printf "\nwas found. Reverting to direct use of npm to manage MagicMirror."
    printf "\nIf you wish to use PM2 to manage your MagicMirror via this script"
    printf "\nthen create a PM2 process named ${PM2_PROCESS_NAME} that can be"
    printf "\nused to start/stop/restart MagicMirror."
    printf "\n\nContinuing but some functionality disabled.\n"
    usepm2=
}

[ "${usepm2}" ] && {
  if [ "${usejq}" ]
  then
    pm2 jlist | jq .[].name | grep ${PM2_PROCESS_NAME} > /dev/null || pm2msg
  else
    pm2 list | grep ${PM2_PROCESS_NAME} > /dev/null || pm2msg
  fi
}

echo "${apikey}" | grep _Remote-Control-API-Key_ > /dev/null && {
    printf "\nMMM-Remote-Control API Key is not configured."
    printf "\nEither add your key or comment out the empty setting"
    printf "\nfor 'apikey' near the beginning of this script."
    printf "\n\nContinuing but some functionality disabled.\n"
}

[ -d "${CONFDIR}" ] || {
    printf "\nCONFDIR does not exist or is not a directory. Exiting.\n"
    exit ${ERROR_EXIT}
}
cd "${CONFDIR}"

check_config() {
    if [ "$1" == "all" ]
    then
        current=`ls -l config.js | awk ' { print $11 } '`
        echo "Saving $current MagicMirror configuration"
        for config in config-*.js
        do
            [ "$config" == "config-*.js" ] && {
                echo "No ${MMCFMSG}s config-*.js found in $CONFDIR"
                continue
            }
            rm -f config.js
            ln -s ${config} config.js
            echo "Checking ${config} ..."
            npm run --silent config:check
            echo "Done"
        done
        echo "Restoring $current MagicMirror configuration"
        rm -f config.js
        if [ -f ${current} ]
        then
            ln -s ${current} config.js
        else
            echo "Config file ${current} does not exist. Using default."
            setconf default
        fi
    else
        if [ -L config.js ] && [ -f config.js ]
        then
            npm run --silent config:check
        else
            if [ -f config.js ]
            then
                npm run --silent config:check
            else
                echo "Config file config.js is a broken symbolic link. Removing."
                rm -f config.js
                echo "Installing default config file, config-default.js"
                setconf default
            fi
        fi
    fi
}

display_status() {
    vcgencmd display_power | egrep 'display_power=1|On' > /dev/null && \
        echo 'Display ON' || echo 'Display OFF'
}

getconfs() {
    numconfs=0
    CONFS=
    for i in config-*.js
    do
        j=`echo $i | sed -e "s/config-//" -e "s/.js//"`
        CONFS="${CONFS} $j"
        [ "$1" == "usage" ] && {
            numconfs=`expr $numconfs + 1`
            [ $numconfs -gt 8 ] && {
                CONFS="${CONFS}\n\t"
                numconfs=0
            }
        }
    done
    [ "$1" == "usage" ] || {
        CONFS=`echo "${CONFS}" | tr ' ' '\n' | LC_ALL=C sort  | tr '\n' ' '`
    }
}

list_mods() {
    [ "$1" ] || {
        printf "\nArgument of 'active', 'installed', or 'configs' required to list modules."
        list_usage
    }
    if [ "$1" == "active" ]
    then
      printf "\n${BOLD}Listing Active MagicMirror modules${NORMAL}\n\n"
      if [ "${TELEGRAM}" ]
      then
        if [ "$usejq" ]
        then
          if [ "${apikey}" ]
          then
            curl -X GET ${modurl}?apiKey=${apikey} 2> /dev/null | jq '.data | .[] | .name'
          else
            curl -X GET ${modurl} 2> /dev/null | jq '.data | .[] | .name'
          fi
        else
          printf "\nInstall jq to list active MagicMirror modules\n"
        fi
      else
        if [ "$usejq" ]
        then
          if [ "${apikey}" ]
          then
            curl -X GET ${modurl}?apiKey=${apikey} 2> /dev/null | jq .
          else
            curl -X GET ${modurl} 2> /dev/null | jq .
          fi
        else
          if [ "${apikey}" ]
          then
            curl -X GET ${modurl}?apiKey=${apikey}
          else
            curl -X GET ${modurl}
          fi
          echo ""
        fi
      fi
    else
        if [ "$1" == "installed" ]
        then
          printf "\n${BOLD}Listing Installed MagicMirror modules${NORMAL}\n\n"
          if [ "${TELEGRAM}" ]
          then
            if [ "$usejq" ]
            then
              if [ "${apikey}" ]
              then
                curl -X GET ${modurl}/installed?apiKey=${apikey} 2> /dev/null | jq '.data | .[] | .longname'
              else
                curl -X GET ${modurl}/installed 2> /dev/null | jq '.data | .[] | .longname'
              fi
            else
              printf "\nInstall jq to list installed MagicMirror modules\n"
            fi
          else
            if [ "$usejq" ]
            then
              if [ "${apikey}" ]
              then
                curl -X GET ${modurl}/installed?apiKey=${apikey} 2> /dev/null | jq .
              else
                curl -X GET ${modurl}/installed 2> /dev/null | jq .
              fi
            else
              if [ "${apikey}" ]
              then
                curl -X GET ${modurl}/installed?apiKey=${apikey}
              else
                curl -X GET ${modurl}/installed
              fi
              echo ""
            fi
          fi
        else
            if [ "$1" == "configs" ]
            then
                printf "\n${BOLD}Listing ${MMCFMSG}s:${NORMAL}\n\n"
                if [ "${TELEGRAM}" ]
                then
                  # /bin/ls config-*.js | cut -c -4000
                  configlist=
                  for c in config-*.js
                  do
                      [ "$c" == "config-*.js" ] && continue
                      echo $c | grep 'sample\|test\|unknown' > /dev/null && continue
                      #echo $c | grep test > /dev/null && continue
                      config_name=`echo $c | sed -e "s/config-//" -e "s/.js//"`
                      configlist="$configlist $config_name"
                      list_size=`echo $configlist | wc -c`
                      [ $list_size -gt 350 ] && break
                  done
                  [ "$configlist" ] && echo $configlist | sed -e "s/ /\n/g"
                else
                  ls config-*.js
                fi
                [ "${TELEGRAM}" ] || {
                  for confdir in __none__ ${CONF_SUBDIRS}
                  do
                    [ "${confdir}" == "__none__" ] && continue
                    [ -d ${confdir} ] && {
                        printf "\n${BOLD}Listing MagicMirror ${confdir} configuration files:${NORMAL}\n\n"
                        ls ${confdir}/config-*.js
                    }
                  done
                }
            else
                printf "\nmirror list $1 is not an accepted 2nd argument."
                printf "\nValid 2nd arguments to the list command are 'active', 'installed', and 'configs'"
                list_usage
            fi
        fi
    fi
}

rotate_all_screens() {
    [ -f ${MIRRORSCREEN} ] && {
        numscreen=0
        while [ ${numscreen} -lt ${NUMSCREENS} ]
        do
            screenmode=SCREEN_${numscreen}[mode]
            [ ${!screenmode+_} ] && {
              screenmode=${!screenmode}
              hdmi=SCREEN_${numscreen}[hdmi]
              [ ${!hdmi+_} ] && {
                hdmi=${!hdmi}
                if [ "${screenmode}" ]
                then
                  printf "\n${BOLD}Rotating ${hdmi} screen ${numscreen} right ${NORMAL}\n"
                  xrandr --output ${hdmi} --auto --rotate right
                else
                  printf "\n${BOLD}Rotating ${hdmi} screen ${numscreen} normal ${NORMAL}\n"
                  xrandr --output ${hdmi} --auto --rotate normal
                fi
                printf "\n${BOLD}Done${NORMAL}\n"
              }
            }
            ((numscreen+=1))
        done
    }
}

rotate_screen() {
    case "$1" in
      inverted|left|right|normal)
        [ "${HDMI}" ] && {
          printf "\n${BOLD}Rotating screen display $1 ${NORMAL}\n"
          xrandr --output ${HDMI} --rotate $1
          printf "\n${BOLD}Done${NORMAL}\n"
        }
        ;;
      default)
        rotate_all_screens
        ;;
      *)
        printf "\nUsage: rotate option takes an argument of 'left', 'right',"
        printf "\n\t'inverted', 'default', or 'normal'"
        printf "\n Exiting.\n"
        usage
        ;;
    esac
}

set_screen() {
  scn=$1
  curscr=${MM_SCREEN}
  [ "${scn}" == "one" ] && scn=1
  [ "${scn}" == "two" ] && scn=2
  [ "${scn}" == "switch" ] && {
    ((MM_SCREEN+=1))
    [ ${MM_SCREEN} -ge ${NUMSCREENS} ] && MM_SCREEN=0
    scn=${MM_SCREEN}
  }
  if [ "${scn}" -eq "${scn}" ] 2> /dev/null
  then
    [ ${scn} -eq 0 ] && scn=1
    ((scn-=1))
    switched=
    hdmi=SCREEN_${scn}[hdmi]
    if [ ${!hdmi+_} ]
    then
      if [ ${curscr} -eq ${scn} ]
      then
        echo "Current screen is already set to $1"
      else
        HDMI=${!hdmi}
        [ -f ${MIRRORSCREEN} ] && {
          cat ${MIRRORSCREEN} | sed -e "s/^MM_SCREEN=.*/MM_SCREEN=${scn}/" > /tmp/mm$$
          cp /tmp/mm$$ ${MIRRORSCREEN}
          rm -f /tmp/mm$$
          MM_SCREEN=${scn}
          screen=SCREEN_${MM_SCREEN}[mode]
          [ ${!screen+_} ] && {
            [ "${PORTRAIT}" == "${!screen}" ] || {
              # The screen mode is switching between portrait and landscape
              # Check to see if we need to switch out the config.js
              cd "${CONFDIR}"
              if [ "${PORTRAIT}" ]
              then
                MM_CONFDIR="config-landscape"
                TG_CONFDIR="config-landscape-notelegram"
                [ -L ${CONFDIR}/config.js ] && {
                  CONFLINK=`readlink ${CONFDIR}/config.js`
                  echo ${CONFLINK} | grep landscape > /dev/null || {
                    NEWLINK=`dirname ${CONFLINK} | sed -e "s/config-/config-landscape/"`
                    OLDBASE=`basename ${CONFLINK}`
                    [ -f ${NEWLINK}/${OLDBASE} ] && {
                      # Relink to landscape mode version of this config file
                      rm -f config.js
                      ln -s ${NEWLINK}/${OLDBASE} config.js
                      switched=1
                    }
                  }
                }
              else
                MM_CONFDIR="config"
                TG_CONFDIR="config-notelegram"
                [ -L ${CONFDIR}/config.js ] && {
                  CONFLINK=`readlink ${CONFDIR}/config.js`
                  echo ${CONFLINK} | grep landscape > /dev/null && {
                    NEWLINK=`dirname ${CONFLINK} | sed -e "s/config-landscape/config-/"`
                    OLDBASE=`basename ${CONFLINK}`
                    [ -f ${NEWLINK}/${OLDBASE} ] && {
                      # Relink to portrait mode version of this config file
                      rm -f config.js
                      ln -s ${NEWLINK}/${OLDBASE} config.js
                      switched=1
                    }
                  }
                }
              fi
            }
            PORTRAIT=${!screen}
          }
          ((scn+=1))
          [ -x /usr/local/bin/mmscreen ] && /usr/local/bin/mmscreen ${scn}
          [ "${switched}" ] && {
            [ -L ${MCL_HOME}/pics ] && {
              rm -f ${MCL_HOME}/pics
              if [ "${PORTRAIT}" ]
              then
                [ -d ${MCL_HOME}/pics-portrait ] && {
                  ln -s ${MCL_HOME}/pics-portrait ${MCL_HOME}/pics
                }
              else
                [ -d ${MCL_HOME}/pics-landscape ] && {
                  ln -s ${MCL_HOME}/pics-landscape ${MCL_HOME}/pics
                }
              fi
            }
            pm2 restart MagicMirror --update-env
          }
        }
      fi
    else
      echo "No configured screen number ${scn}"
    fi
  else
    usage
  fi
}

screen_control() {
    if [ "$1" ]
    then
      if [ "$1" == "on" ]
      then
        vcgencmd display_power 1 > /dev/null
      else
        if [ "$1" == "off" ]
        then
          vcgencmd display_power 0 > /dev/null
        else
          if [ "$1" == "status" ] || [ "$1" == "info" ]
          then
            INFO="screen"
            system_info
          else
            set_screen $1
          fi
        fi
      fi
    else
      INFO="screen"
      system_info
    fi
}

screen_shot() {
    SCREEN_SHOT_DIR=$HOME/Pictures/ScreenShots
    [ -d ${SCREEN_SHOT_DIR} ] || mkdir -p ${SCREEN_SHOT_DIR}
    havescrot=`type -p scrot`
    if [ "$havescrot" ]
    then
        printf "\n${BOLD}Saving PNG format screenshot in ${SCREEN_SHOT_DIR}${NORMAL}\n"
        scrot -e 'mv $f ~/Pictures/ScreenShots'
    else
        printf "\n${BOLD}Could not locate scrot command in $PATH${NORMAL}\n"
        printf "\n${BOLD}Install scrot with 'sudo apt-get install scrot'${NORMAL}\n"
    fi
    printf "\n${BOLD}Done${NORMAL}\n"
}

start_dev() {
    printf "\n${BOLD}Starting MagicMirror in developer mode${NORMAL}\n"
    cd "${MM}"
    # export ELECTRON_ENABLE_LOGGING=true
    if [ "${usepm2}" ]
    then
        pm2 stop MagicMirror
    else
        mirror_stop
    fi
    npm start dev
    printf "\n${BOLD}Done${NORMAL}\n"
}

get_brightness() {
    printf "\n${BOLD}MagicMirror Brightness Level:${NORMAL} "
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET http://${IP}:${PORT}/api/brightness?apiKey=${apikey} 2> /dev/null | jq '.result'
      else
        curl -X GET http://${IP}:${PORT}/api/brightness 2> /dev/null | jq '.result'
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET http://${IP}:${PORT}/api/brightness?apiKey=${apikey}
      else
        curl -X GET http://${IP}:${PORT}/api/brightness
      fi
      echo ""
    fi
}

set_brightness() {
    [ "$1" ] || {
        printf "\nNumeric argument required to specify Mirror brightness.\n"
        setb_usage
    }
    if [ "$1" -ge 0 ] && [ "$1" -le 200 ]
    then
        printf "\n${BOLD}Setting MagicMirror Brightness Level to $1${NORMAL}\n"
        if [ "$usejq" ]
        then
          if [ "${apikey}" ]
          then
            curl -X GET http://${IP}:${PORT}/api/brightness/$1?apiKey=${apikey} 2> /dev/null | jq .
          else
            curl -X GET http://${IP}:${PORT}/api/brightness/$1 2> /dev/null | jq .
          fi
        else
          if [ "${apikey}" ]
          then
            curl -X GET http://${IP}:${PORT}/api/brightness/$1?apiKey=${apikey}
          else
            curl -X GET http://${IP}:${PORT}/api/brightness/$1
          fi
          echo ""
        fi
    else
        printf "\nBrightness setting $1 out of range or not a number"
        printf "\nValid brightness values are integer values [0-200]\n"
        setb_usage
    fi
}

set_volume() {
    [ "$1" ] || {
        printf "\nArgument required to specify Mirror volume.\n"
        vol_usage
    }
    havevol=`type -p vol`
    if [ "$havevol" ]
    then
        case "$1" in
            "mute")
                echo "Muting MagicMirror volume"
                vol -q -m
                ;;
            "unmute")
                echo "Unmuting MagicMirror volume"
                vol -q -m
                ;;
            "save")
                echo "Saving MagicMirror volume"
                vol -q -s
                ;;
            "restore")
                echo "Restoring MagicMirror volume"
                vol -q -r
                ;;
            "get")
                echo "Retrieving MagicMirror volume"
                vol
                ;;
            *)
                echo "Setting MagicMirror volume to $1 percent"
                vol -q $1
                ;;
        esac
    else
        echo "Cannot locate vol script."
        echo "Install vol.sh from the MirrorCommand repository."
    fi
}

act_scene() {
    printf "\n${BOLD}MMM-Scenes scene by name/id${NORMAL}\n"
    case "$1" in
      [0-9]*)
        scenespec="index=$1"
        ;;
      *)
        scenespec="name=$1"
        ;;
    esac
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET "${apiurl}/SCENES_ACT?${scenespec}&apiKey=${apikey}" 2> /dev/null | jq .
      else
        curl -X GET "${apiurl}/SCENES_ACT?${scenespec}" 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET "${apiurl}/SCENES_ACT?${scenespec}&apiKey=${apikey}"
      else
        curl -X GET "${apiurl}/SCENES_ACT?${scenespec}"
      fi
      echo ""
    fi
}

info_scene() {
    printf "\n${BOLD}MMM-Scenes configuration info${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET ${modurl}/MMM-Scenes?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET ${modurl}/MMM-Scenes 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET ${modurl}/MMM-Scenes?apiKey=${apikey}
      else
        curl -X GET ${modurl}/MMM-Scenes
      fi
      echo ""
    fi
}

next_scene() {
    printf "\n${BOLD}Next MMM-Scenes scene${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/SCENES_NEXT?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET ${apiurl}/SCENES_NEXT 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/SCENES_NEXT?apiKey=${apikey}
      else
        curl -X GET ${apiurl}/SCENES_NEXT
      fi
      echo ""
    fi
}

prev_scene() {
    printf "\n${BOLD}Previous MMM-Scenes scene${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/SCENES_PREV?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET ${apiurl}/SCENES_PREV 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/SCENES_PREV?apiKey=${apikey}
      else
        curl -X GET ${apiurl}/SCENES_PREV
      fi
      echo ""
    fi
}

hide_video() {
    printf "\n${BOLD}Hide MagicMirror Video${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET ${modurl}/MMM-Videoplayer/hide?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET ${modurl}/MMM-Videoplayer/hide 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET ${modurl}/MMM-Videoplayer/hide?apiKey=${apikey}
      else
        curl -X GET ${modurl}/MMM-Videoplayer/hide
      fi
      echo ""
    fi
}

show_video() {
    printf "\n${BOLD}Show MagicMirror Video${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET ${modurl}/MMM-Videoplayer/show?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET ${modurl}/MMM-Videoplayer/show 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET ${modurl}/MMM-Videoplayer/show?apiKey=${apikey}
      else
        curl -X GET ${modurl}/MMM-Videoplayer/show
      fi
      echo ""
    fi
}

next_video() {
    printf "\n${BOLD}Play Next MagicMirror Video${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/VIDEOPLAYER1/NEXT?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET ${apiurl}/VIDEOPLAYER1/NEXT 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/VIDEOPLAYER1/NEXT?apiKey=${apikey}
      else
        curl -X GET ${apiurl}/VIDEOPLAYER1/NEXT
      fi
      echo ""
    fi
}

replay_video() {
    printf "\n${BOLD}Replay MagicMirror Video${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/VIDEOPLAYER1/REPLAY?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET ${apiurl}/VIDEOPLAYER1/REPLAY 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/VIDEOPLAYER1/REPLAY?apiKey=${apikey}
      else
        curl -X GET ${apiurl}/VIDEOPLAYER1/REPLAY
      fi
      echo ""
    fi
}

toggle_videoplay() {
    printf "\n${BOLD}Toggle MagicMirror Video Play/Pause${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/VIDEOPLAYER1/TOGGLE?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET ${apiurl}/VIDEOPLAYER1/TOGGLE 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET ${apiurl}/VIDEOPLAYER1/TOGGLE?apiKey=${apikey}
      else
        curl -X GET ${apiurl}/VIDEOPLAYER1/TOGGLE
      fi
      echo ""
    fi
}

model_create() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    # Create a configuration file for this model if one does not exist
    printf "\nCreating config file ${CONFDIR}/Models/config-${PICDIR}.js\n"
    cd "${CONFDIR}/Models"
    [ -f "config-${PICDIR}.js" ] || {
        if [ -f ${MODEL_TEMPLATE} ]
        then
            cat ${MODEL_TEMPLATE} | sed -e "s/MODEL_DIR_HOLDER/${PICDIR}/" > "config-${PICDIR}.js"
        else
            echo "Model config template $MODEL_TEMPLATE not found"
            exit ${ERROR_EXIT}
        fi
    }
    if [ -d "${SLISDIR}/Models/${PICDIR}" ]
    then
        # Already have a prepared folder for this model
        printf "\nUsing existing model folder pics\n"
        setconf ${PICDIR} Models
    else
      if [ -x ${MCL_HOME}/bin/mknewmodel ]
      then
          ${MCL_HOME}/bin/mknewmodel ${PICDIR}
      else
          echo "${MCL_HOME}/bin/mknewmodel does not exist or is not executable."
      fi
    fi
}

model_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/Models/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for Models/${PICDIR}\n"
        rm -rf "${SLISDIR}/Models/${PICDIR}"
    }
    rm -f "${CONFDIR}/Models/config-${PICDIR}.js"
    set_config default
}

artist_create() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    printf "\nCreating config file ${CONFDIR}/Artists/config-${PICDIR}.js\n"
    cd "${CONFDIR}/Artists"
    [ -f "config-${PICDIR}.js" ] || {
        if [ -f ${ARTIST_TEMPLATE} ]
        then
            cat ${ARTIST_TEMPLATE} | sed -e "s/ARTIST_DIR_HOLDER/${PICDIR}/" > "config-${PICDIR}.js"
        else
            echo "Artist config template $ARTIST_TEMPLATE not found"
            exit ${ERROR_EXIT}
        fi
    }
    if [ -d "${MCL_HOME}/pics/Artists/${PICDIR}" ]
    then
        # Already have a prepared folder for this artist
        printf "\nUsing existing ${PICDIR} image folder\n"
        setconf ${PICDIR} Artists
    else
        if [ -x ${MCL_HOME}/bin/mknewartist ]
        then
            ${MCL_HOME}/bin/mknewartist ${PICDIR}
        else
            echo "${MCL_HOME}/bin/mknewartist does not exist or is not executable."
        fi
    fi
}

artist_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/Artists/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for Artists/${PICDIR}\n"
        rm -rf "${SLISDIR}/Artists/${PICDIR}"
    }
    rm -f "${CONFDIR}/Artists/config-${PICDIR}.js"
    set_config default
}

jav_create() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    printf "\nCreating config file ${CONFDIR}/JAV/config-${PICDIR}.js\n"
    cd "${CONFDIR}/JAV"
    [ -f "config-${PICDIR}.js" ] || {
        if [ -f ${JAV_TEMPLATE} ]
        then
            cat ${JAV_TEMPLATE} | sed -e "s/JAV_DIR_HOLDER/${PICDIR}/" > "config-${PICDIR}.js"
        else
            echo "JAV config template $JAV_TEMPLATE not found"
            exit ${ERROR_EXIT}
        fi
    }
    if [ -d "${MCL_HOME}/pics/JAV/${PICDIR}" ]
    then
        # Already have a prepared folder for this photographer
        printf "\nUsing existing ${PICDIR} image folder\n"
        setconf ${PICDIR} JAV
    else
        if [ -x ${MCL_HOME}/bin/mknewjav ]
        then
            ${MCL_HOME}/bin/mknewjav ${PICDIR}
        else
            echo "${MCL_HOME}/bin/mknewjav does not exist or is not executable."
        fi
    fi
}

jav_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/JAV/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for JAV/${PICDIR}\n"
        rm -rf "${SLISDIR}/JAV/${PICDIR}"
    }
    rm -f "${CONFDIR}/JAV/config-${PICDIR}.js"
    set_config default
}

photo_create() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    printf "\nCreating config file ${CONFDIR}/Photographers/config-${PICDIR}.js\n"
    cd "${CONFDIR}/Photographers"
    [ -f "config-${PICDIR}.js" ] || {
        if [ -f ${PHOTO_TEMPLATE} ]
        then
            cat ${PHOTO_TEMPLATE} | sed -e "s/PHOTO_DIR_HOLDER/${PICDIR}/" > "config-${PICDIR}.js"
        else
            echo "Photographer config template $PHOTO_TEMPLATE not found"
            exit ${ERROR_EXIT}
        fi
    }
    if [ -d "${MCL_HOME}/pics/Photographers/${PICDIR}" ]
    then
        # Already have a prepared folder for this photographer
        printf "\nUsing existing ${PICDIR} image folder\n"
        setconf ${PICDIR} Photographers
    else
        if [ -x ${MCL_HOME}/bin/mknewphotographer ]
        then
            ${MCL_HOME}/bin/mknewphotographer ${PICDIR}
        else
            echo "${MCL_HOME}/bin/mknewphotographer does not exist or is not executable."
        fi
    fi
}

photo_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/Photographers/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for Photographers/${PICDIR}\n"
        rm -rf "${SLISDIR}/Photographers/${PICDIR}"
    }
    rm -f "${CONFDIR}/Photographers/config-${PICDIR}.js"
    set_config default
}

wh_create() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    # Create a configuration file for this category if one does not exist
    printf "\nCreating config file ${CONFDIR}/config-${PICDIR}.js\n"
    cd "${CONFDIR}"
    [ -f "config-${PICDIR}.js" ] || {
        if [ -f ${WHVN_TEMPLATE} ]
        then
            cat ${WHVN_TEMPLATE} | sed -e "s/WH_DIR_HOLDER/${PICDIR}/" > "config-${PICDIR}.js"
        else
            echo "Wallhaven config template $WHVN_TEMPLATE not found"
            exit ${ERROR_EXIT}
        fi
    }
    if [ -d "${SLISDIR}/${PICDIR}" ]
    then
        # Already have a prepared folder for this category
        printf "\nUsing existing category folder pics\n"
        setconf ${PICDIR}
    else
      if [ -x ${MCL_HOME}/bin/mknewtop ]
      then
          ${MCL_HOME}/bin/mknewtop ${PICDIR}
      else
          echo "${MCL_HOME}/bin/mknewtop does not exist or is not executable."
      fi
    fi
}

wh_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for ${PICDIR}\n"
        rm -rf "${SLISDIR}/${PICDIR}"
    }
    rm -f "${CONFDIR}/config-${PICDIR}.js"
    set_config default
}

usage() {
  getconfs usage
  if [ "${TELEGRAM}" ]
  then
    printf "\n${BOLD}Usage:${NORMAL} mirror <command> <args>\n"
    printf "\n  Where <command> can be one of the following:\n"
    printf "\n    info <temp|mem|disk|usb|net|wireless|screen>"
    printf "\n    list <active|installed|configs>"
    printf "\n    rotate <right|left|normal|inverted|default>"
    printf "\n    screen <on|off|info|status|number>"
    printf "\n    stop|start|restart|mute|unmute|reboot|shutdown"
    printf "\n    playvideo|pausevideo|nextvideo|replayvideo|hidevideo|showvideo"
    printf "\n    status <all>|dev|getb|setb <num>|vol <num>"
    printf "\n    update [modules]"
    printf "\n    vol mute|unmute|save|restore|get"
    printf "\n\n  or specify a config file to use with one of:"
    printf "\n\n  ${CONFS}"
    printf "\n\n  or any other config file you have created in ${CONFDIR} of the form:  config-<name>.js"
    printf "\n\n  A config filename argument of 'foo', i.e. 'mirror foo', will be resolved into a config filename of the form:  config-foo.js"
    printf "\n\n  A subdirectory in which to locate the config file can be specified"
    printf " as the second argument, e.g. 'mirror foo bar' will attempt to use"
    printf " the config file bar/config-foo.js"
    printf "\n\nConsult the documentation or execute 'mirror -u' on your MagicMirror system for complete usage information.\n"
  else
    printf "\n${BOLD}Usage:${NORMAL} mirror <command> [args]"
    printf "\nWhere <command> can be one of the following:"
    printf "\n    info <temp|mem|disk|usb|net|wireless|screen>"
    printf "\n    list <active|installed|configs>"
    printf "\n    rotate <right|left|normal|inverted|default>"
    printf "\n    scene <next|prev|info|name|number>"
    printf "\n    screen <on|off|info|status>"
    printf "\n    stop|start|restart|mute|unmute|screenshot|reboot|shutdown"
    printf "\n    playvideo|pausevideo|nextvideo|replayvideo|hidevideo|showvideo"
    printf "\n    update [modules]"
    printf "\n    vol <percent>|mute|unmute|save|restore|get"
    printf "\n    dev | getb | setb <num> | select | status <all> | youtube"
    printf "\n    artists_dir, models_dir, photogs_dir"
    printf "\n    ac|ar <artist>, jc|jr <idol>, mc|mr <model>,"
    printf " pc|pr <photographer>, wh|whrm <dir>"

    printf "\n\nSpecify a config file to use by executing a command of the form:"
    printf "\n\t${BOLD}mirror <name>${NORMAL}"
    printf "\nwhere <name> is one of:"
    printf "\n\t${CONFS}"
    printf "\n\nor any other config file you have created in ${CONFDIR} of the form:"
    printf "\n\tconfig-<name>.js"
    printf "\n\nA config filename argument will be resolved into a config filename of the form:"
    printf "\n\tconfig-\$argument.js"
    printf "\n\nA subdirectory in which to locate the config file can be specified"
    printf " as the second argument, e.g. 'mirror foo bar' will attempt to use"
    printf " the config file bar/config-foo.js"
    printf "\n\nThe mirror command will attempt to match the specified config file name."
    printf " For example, 'mirror foo' would match the config file named config-food.js"
    printf "\n\nArguments can also be specified as follows:"
    printf "\n\t-a <artist>, -A <artist>, -b <brightness>, -B, -c <config>, -d, -i <info>,"
    printf "\n\t-V, -N, -R (toggle video play, play next video, replay video),"
    printf "\n\t-H, -h (Hide video, Show video),"
    printf "\n\t-L, use landscape display mode and use landscape designed configs/pics,"
    printf "\n\t-I, -l <list>, -r <rotate>, -s <screen>, -S, -m <model>, -M <model>,"
    printf "\n\t-p <photographer>, -P <photographer>, -w <dir>, -W <dir>"
    printf "\n\t-X <screen number>, -Z, -u"
    printf "\n\n${BOLD}Examples:${NORMAL}"
    printf "\n\tmirror\t\t# Invoked with no arguments the mirror command displays a command menu"
    printf "\n\tmirror list active\t\t# lists active modules"
    printf "\n\tmirror list configs\t\t# lists available configuration files"
    printf "\n\tmirror restart\t\t# Restart MagicMirror"
    printf "\n\tmirror fractals\t\t# Installs configuration file config-fractals.js"
    printf " and restarts MagicMirror"
    printf "\n\tmirror info\t\t# Displays all MagicMirror system information"
    printf "\n\tmirror info screen\t\t# Displays MagicMirror screen information"
    printf "\n\tmirror dev\t\t# Restarts the mirror in developer mode"
    printf "\n\tmirror rotate left/right/normal/inverted/default\t\t# rotates the screen left, right, inverted, normal, or restores all screens to their default rotation"
    printf "\n\tmirror screen on\t\t#  Turns the Display ON"
    printf "\n\tmirror screen off\t\t# Turns the Display OFF"
    printf "\n\tmirror screenshot\t\t# Takes a screenshot of the MagicMirror"
    printf "\n\tmirror screen num\t\t# Switches mirror display to screen num"
    printf "\n\tmirror status [all]\t\t# Displays MagicMirror status, checks config syntax"
    printf "\n\tmirror update\t\t# Updates MagicMirror installation"
    printf "\n\tmirror update modules\t\t# Updates installed MagicMirror modules"
    printf "\n\tmirror getb\t\t# Displays current MagicMirror brightness level"
    printf "\n\tmirror setb 150\t\t# Sets MagicMirror brightness level to 150"
    printf "\n\tmirror vol 50\t\t# Sets MagicMirror volume level to 50"
    printf "\n\tmirror wh foobar\t\t# Creates and activates a slideshow config with pics in foobar"
    printf "\n\tmirror whrm foobar\t\t# Deactivate and remove slideshow in foobar"
    printf "\n\tmirror -u\t\t# Display this usage message\n"
  fi
  exit ${ERROR_EXIT}
}

list_usage() {
    printf "\n${BOLD}List Usage:${NORMAL} mirror list <active|installed|configs>"
    printf "\nWhere 'active', 'installed', or 'configs' must be specified."
    printf "\nThis command will list either all active or installed modules or all configs.\n"
    usage
}

setb_usage() {
    printf "\n${BOLD}Setb Usage:${NORMAL} mirror setb [number]"
    printf "\nWhere 'number' is an integer value in the range 0-200\n"
    usage
}

vol_usage() {
    printf "\n${BOLD}Volume Usage:${NORMAL} mirror vol [number]"
    printf "\nWhere 'number' is an integer value in the range 0-100\n"
    usage
}

setconf() {
    conf=$1
    subdir=$2
    cd "${CONFDIR}"
    if [ -f config.js ]
    then
        mv config.js config-$$.js
    else
        rm -f config.js
    fi
    NOKEY="x_Your-Telegram-API-Key_x"
    if [ "$subdir" ]
    then
        echo "Setting MagicMirror configuration to ${subdir}/config-${conf}.js"
        grep ${NOKEY} ${subdir}/config-${conf}.js > /dev/null || NOKEY=
        if [ "${NOKEY}" ]
        then
            if [ -f ../${TG_CONFDIR}/$subdir/config-${conf}.js ]
            then
              ln -s ../${TG_CONFDIR}/$subdir/config-${conf}.js config.js
            else
              if [ -f ../${BU_TG_CONFDIR}/$subdir/config-${conf}.js ]
              then
                ln -s ../${BU_TG_CONFDIR}/$subdir/config-${conf}.js config.js
              else
                ln -s $subdir/config-${conf}.js config.js
              fi
            fi
        else
            if [ "${PORTRAIT}" ]
            then
              ln -s $subdir/config-${conf}.js config.js
            else
              if [ -f ../${MM_CONFDIR}/$subdir/config-${conf}.js ]
              then
                ln -s ../${MM_CONFDIR}/$subdir/config-${conf}.js config.js
              else
                ln -s $subdir/config-${conf}.js config.js
              fi
            fi
        fi
    else
        echo "Setting MagicMirror configuration to config-${conf}.js"
        grep ${NOKEY} config-${conf}.js > /dev/null || NOKEY=
        if [ "${NOKEY}" ]
        then
            if [ -f ../${TG_CONFDIR}/config-${conf}.js ]
            then
              ln -s ../${TG_CONFDIR}/config-${conf}.js config.js
            else
              if [ -f ../${BU_TG_CONFDIR}/config-${conf}.js ]
              then
                ln -s ../${BU_TG_CONFDIR}/config-${conf}.js config.js
              else
                ln -s config-${conf}.js config.js
              fi
            fi
        else
            if [ "${PORTRAIT}" ]
            then
              ln -s config-${conf}.js config.js
            else
              if [ -f ../${MM_CONFDIR}/config-${conf}.js ]
              then
                ln -s ../${MM_CONFDIR}/config-${conf}.js config.js
              else
                ln -s config-${conf}.js config.js
              fi
            fi
        fi
    fi
    [ "${NUMSCREENS}" ] && [ ${NUMSCREENS} -gt 1 ] && {
      # If there is an existing config.js then set the Electron screen offsets
      # Must have both xoff and yoff from mirrorscreen for this screen
      xoff=SCREEN_${MM_SCREEN}[xoff]
      [ ${!xoff+_} ] && {
        XOFF=${!xoff}
        yoff=SCREEN_${MM_SCREEN}[yoff]
        [ ${!yoff+_} ] && {
          YOFF=${!yoff}
          [ -f ${CONFDIR}/config.js ] && {
            [ -x /usr/local/bin/updoffsets ] && {
              /usr/local/bin/updoffsets -x ${XOFF} -y ${YOFF} ${CONFDIR}/config.js
            }
          }
        }
      }
      # Also set the screen width and height config settings
      # Must have both width and height from mirrorscreen for this screen
      width=SCREEN_${MM_SCREEN}[width]
      [ ${!width+_} ] && {
        WIDTH=${!width}
        height=SCREEN_${MM_SCREEN}[height]
        [ ${!height+_} ] && {
          HEIGHT=${!height}
          [ -f ${CONFDIR}/config.js ] && {
            [ -x /usr/local/bin/updwidth ] && {
              /usr/local/bin/updwidth -x ${WIDTH} -y ${HEIGHT} ${CONFDIR}/config.js
            }
          }
          [ -x /usr/local/bin/updcsswidth ] && {
            for css in ${CSSDIR}/*.css
            do
              [ "${css}" == "${CSSDIR}/*.css" ] && continue
              [ -f ${css} ] && {
                if [ "${PORTRAIT}" ]
                then
                  /usr/local/bin/updcsswidth -x ${HEIGHT} -y ${WIDTH} ${css}
                else
                  /usr/local/bin/updcsswidth -x ${WIDTH} -y ${HEIGHT} ${css}
                fi
              }
            done
          }
        }
      }
    }
    npm run --silent config:check > /dev/null
    [ $? -eq 0 ] || {
        if [ "$subdir" ]
        then
            printf "\nMagicMirror configuration $subdir/config-${conf}.js needs work."
        else
            printf "\nMagicMirror configuration config-${conf}.js needs work."
        fi
        printf "\nTry again after you have addressed these issues:\n"
        npm run --silent config:check
        rm -f config.js
        [ -f config-$$.js ] && mv config-$$.js config.js
        exit ${ERROR_EXIT}
    }
    rm -f config-$$.js
    [ "${PORTRAIT}" ] && {
      primary=`xrandr --query --verbose | grep connected | grep -v disconnected | grep primary > /dev/null`
      if [ "${primary}" ]
      then
        rotation=`xrandr --query --verbose | grep connected | grep -v disconnected | awk ' { print $6 } '`
      else
        rotation=`xrandr --query --verbose | grep connected | grep -v disconnected | awk ' { print $5 } '`
      fi
      case ${conf} in
        tantra|iframe|candy|fractalplaylist|hardzoom)
            [ "$rotation" == "normal" ] || {
              [ "${HDMI}" ] && {
                printf "\n${BOLD}Rotating screen display normal ${NORMAL}\n"
                xrandr --output ${HDMI} --rotate normal
              }
            }
            ;;
        *)
            [ "$rotation" == "right" ] || {
              [ "${HDMI}" ] && {
                printf "\n${BOLD}Rotating screen display right ${NORMAL}\n"
                xrandr --output ${HDMI} --rotate right
              }
            }
            ;;
      esac
    }
    if [ "${START_DEV}" ]
    then
        start_dev
    else
        if [ "${usepm2}" ]
        then
            pm2 restart MagicMirror --update-env
        else
            cd "${MM}"
            npm restart
        fi
    fi
}

set_config() {
    mode="$1"
    subdir="$2"
    echo $mode | grep / > /dev/null && {
        subdir=`dirname $mode`
        mode=`basename $mode`
    }
    mode=`echo $mode | sed -e "s/\.js$//" -e "s/^config-//"`
    [ "$mode" == "waterfall" ] && mode="waterfalls"
    [ "$mode" == "fractal" ] && mode="fractals"

    cd "${CONFDIR}"
    [ "${subdir}" ] && {
        [ -f ${subdir}/config-${mode}.js ] && {
            setconf ${mode} ${subdir}
            return
        }
    }
    if [ -f config-${mode}.js ]
    then
        setconf ${mode}
        return
    else
        for sub in __none__ ${subdir} ${CONF_SUBDIRS}
        do
            [ "${sub}" == "__none__" ] && continue
            [ -f ${sub}/config-${mode}.js ] && {
                setconf ${mode} ${sub}
                return
            }
        done
    fi
    # Try to find something that matches the first part of the specified name
    # for sub in ${subdir} Artists Models Photographers JAV
    for sub in __none__ ${subdir} ${CONF_SUBDIRS}
    do
        [ "${sub}" == "__none__" ] && {
            for confname in config-${mode}*.js
            do
                [ "${confname}" == "${sub}/config-${mode}*.js" ] && continue
                [ -f ${confname} ] && {
                    foundmode=`basename ${confname} | sed -e "s/config-//" -e "s/.js//"`
                    setconf ${foundmode}
                    return
                }
            done
            continue
        }
        for confname in ${sub}/config-${mode}*.js
        do
            [ "${confname}" == "${sub}/config-${mode}*.js" ] && continue
            [ -f ${confname} ] && {
                foundmode=`basename ${confname} | sed -e "s/config-//" -e "s/.js//"`
                setconf ${foundmode} ${sub}
                return
            }
        done
    done
    if [ "${subdir}" ]
    then
        printf "\nNo configuration file ${subdir}/config-${mode}.js found.\n\n"
    else
        printf "\nNo configuration file config-${mode}.js found.\n\n"
    fi
    usage
}

system_info() {
    printf "\n${BOLD}System information for:${NORMAL}\n"
    HNAM=`uname -n`
    OSVR=`uname -s -r`
    printf "${HNAM} running ${OSVR}\n"
    [ "$INFO" == "all" ] || [ "$INFO" == "temp" ] && {
        if [ "${fake_vcgencmd}" ]
        then
            printf "\nSystem temperatures:\n`vcgencmd measure_temp`\n"
        else
            printf "\nCPU `vcgencmd measure_temp`\n"
        fi
    }
    [ "$INFO" == "all" ] || [ "$INFO" == "mem" ] && {
        if [ "${fake_vcgencmd}" ]
        then
            vcgencmd get_mem
        else
            cpu_mem=`vcgencmd get_mem arm | awk -F "=" ' { print $2 } '`
            gpu_mem=`vcgencmd get_mem gpu | awk -F "=" ' { print $2 } '`
            printf "\n${BOLD}Memory Split:${NORMAL}\tCPU=${cpu_mem}\tGPU=${gpu_mem}\n"
            printf "\n${BOLD}Memory:${NORMAL}\n"
        fi
        free -h
    }
    [ "$INFO" == "all" ] || [ "$INFO" == "disk" ] && {
        printf "\n${BOLD}Disk and filesystem usage:${NORMAL}\n"
        findmnt --fstab --evaluate
        printf "\n"
        df -h -x tmpfs -x udev -x devtmpfs
    }
    [ "$INFO" == "all" ] || [ "$INFO" == "usb" ] && {
        printf "\n${BOLD}USB Devices:${NORMAL}\n"
        lsusb
    }
    [ "$INFO" == "all" ] || [ "$INFO" == "net" ] && {
        printf "\n${BOLD}Network IP/mask:${NORMAL}\n"
        ifconfig | grep inet | grep netmask
    }
    [ "$INFO" == "all" ] || [ "$INFO" == "wireless" ] && {
        printf "\n${BOLD}Wireless info:${NORMAL}\n"
        iwconfig 2> /dev/null | grep ESSID | while read entry
        do
            interface=`echo $entry | awk ' { print $1 } '`
            iwconfig $interface
        done
    }
    [ "$INFO" == "all" ] || [ "$INFO" == "screen" ] && {
        printf "\n${BOLD}Screen dimensions and resolution:${NORMAL}\n"
        xrandr --query --verbose | grep Screen
        [ "${have_xdpyinfo}" ] && {
          xdpyinfo | grep dimensions
          xdpyinfo | grep resolution
        }
        display_status
        printf "\n${BOLD}Connected monitors:${NORMAL}\n"
        xrandr --query --verbose | grep connected | grep -v disconnected
        printf "\n${BOLD}MirrorCommand configured screens:${NORMAL}"
        printf "\n\tNumber of screens = ${NUMSCREENS}"
        device=SCREEN_${MM_SCREEN}[hdmi]
        if [ ${!device+_} ]
        then
          hdmi=${!device}
        else
          hdmi=`xrandr --listactivemonitors | grep ${MM_SCREEN}: | awk ' { print $4 } '`
        fi
        printf "\n\tCurrent display screen device = ${hdmi}"
        dispnum=${MM_SCREEN}
        ((dispnum+=1))
        printf "\n\t\tUse screen number ${dispnum} to address this screen"
        xoff=SCREEN_${MM_SCREEN}[xoff]
        yoff=SCREEN_${MM_SCREEN}[yoff]
        [ ${!xoff+_} ] && [ ${!yoff+_} ] && {
          printf "\n\t\tX Offset = ${!xoff}, and Y Offset = ${!yoff}"
        }
        [ "${NUMSCREENS}" ] && [ ${NUMSCREENS} -gt 1 ] && {
          [ ${dispnum} -ge ${NUMSCREENS} ] && dispnum=0
          device=SCREEN_${dispnum}[hdmi]
          if [ ${!device+_} ]
          then
            hdmi=${!device}
          else
            hdmi=`xrandr --listactivemonitors | grep ${dispnum}: | awk ' { print $4 } '`
          fi
          printf "\n\tAlternate display screen device = ${hdmi}"
          xoff=SCREEN_${dispnum}[xoff]
          yoff=SCREEN_${dispnum}[yoff]
          ((dispnum+=1))
          printf "\n\t\tUse screen number ${dispnum} to address this screen"
          [ ${!xoff+_} ] && [ ${!yoff+_} ] && {
            printf "\n\t\tX Offset = ${!xoff}, and Y Offset = ${!yoff}"
          }
        }
        printf "\n"
    }
}

get_info_type() {
    PS3="${BOLD}Please enter desired system info type (numeric or text): ${NORMAL}"
    options=(all temp mem disk usb net wireless screen "Main menu" "Quit")
    select opt in "${options[@]}"
    do
        case "$opt,$REPLY" in
            "Main menu",*|*,"Main menu"|"Back",*|*,"Back"|"back",*|*,"back")
                break
                ;;
            "Quit",*|*,"Quit"|"quit",*|*,"quit")
                return 9
                ;;
            "all",*|*,"all")
                INFO="all"
                system_info
                break
                ;;
            "temp",*|*,"temp")
                INFO="temp"
                system_info
                break
                ;;
            "mem",*|*,"mem")
                INFO="mem"
                system_info
                break
                ;;
            "disk",*|*,"disk")
                INFO="disk"
                system_info
                break
                ;;
            "usb",*|*,"usb")
                INFO="usb"
                system_info
                break
                ;;
            "net",*|*,"net")
                INFO="net"
                system_info
                break
                ;;
            "wireless",*|*,"wireless")
                INFO="wireless"
                system_info
                break
                ;;
            "screen",*|*,"screen")
                INFO="screen"
                system_info
                break
                ;;
            *)
                printf "\nInvalid entry. Please try again"
                printf "\n${NUMPROMPT}\n"
                ;;
        esac
    done
    return 0
}

select_configuration() {
    getconfs select
    PS3="${BOLD}${PLEASE} configuration choice (numeric or text): ${NORMAL}"
    options=(${CONFS} "Main menu" "Quit")
    while true
    do
      select opt in "${options[@]}"
      do
        case "$opt,$REPLY" in
            "Main menu",*|*,"Main menu"|"Back",*|*,"Back"|"back",*|*,"back")
                printf "Returning\n\n"
                break 2
                ;;
            "Quit",*|*,"Quit"|"quit",*|*,"quit")
                printf "\nExiting\n"
                return 9
                ;;
            "Artists",*|*,"Artists"|"JAV",*|*,"JAV"|"Models",*|*,"Models"|"Photographers",*|*,"Photographers")
                printf "======================================================\n\n"
                select_subdir ${opt}
                [ $? -eq 9 ] && exit 0
                break 2
                ;;
            "YouTube",*|*,"YouTube")
                printf "======================================================\n\n"
                select_youtube
                [ $? -eq 9 ] && exit 0
                break 2
                ;;
            *)
                if [ -f config-${opt}.js ]
                then
                    printf "\nInstalling config-${opt}.js ${MMCFMSG}\n"
                    setconf ${opt}
                    break
                else
                    if [ -f config-${REPLY}.js ]
                    then
                        printf "\nInstalling config-${REPLY}.js ${MMCFMSG}\n"
                        setconf ${REPLY}
                        break
                    else
                        printf "\nInvalid entry. Please try again"
                        printf "\n${NUMPROMPT}\n"
                        break
                    fi
                fi
                ;;
        esac
      done
    done
    return 0
}

select_playback() {
    PS3="${BOLD}${PLEASE} video playback choice (numeric or text): ${NORMAL}"
    options=("Play video" "Pause video" "Replay video" "Next video" "Hide video" "Show video" "Main menu" "Quit")
    while true
    do
      select opt in "${options[@]}"
      do
        case "$opt,$REPLY" in
            "Quit",*|*,"Quit"|"quit",*|*,"quit")
                printf "\nExiting\n"
                return 9
                ;;
            "Main menu",*|*,"Main menu"|"Back",*|*,"Back"|"back",*|*,"back")
                printf "\nReturning to main menu\n"
                break 2
                ;;
            "Play video",*|*,"Play video")
                printf "======================================================\n\n"
                toggle_videoplay
                break
                ;;
            "Pause video",*|*,"Pause video")
                printf "======================================================\n\n"
                toggle_videoplay
                break
                ;;
            "Replay video",*|*,"Replay video")
                printf "======================================================\n\n"
                replay_video
                break
                ;;
            "Next video",*|*,"Next video")
                printf "======================================================\n\n"
                next_video
                break
                ;;
            "Hide video",*|*,"Hide video")
                printf "======================================================\n\n"
                hide_video
                break
                ;;
            "Show video",*|*,"Show video")
                printf "======================================================\n\n"
                show_video
                break
                ;;
            *)
                printf "\nInvalid entry. Please try again"
                printf "\n${NUMPROMPT}\n"
                break
                ;;
        esac
        REPLY=
      done
    done
    return 0
}

select_subdir() {
  [ "$1" ] || {
      echo "select_subdir must be called with an argument. None present."
      return 1
  }
  SUBDIR="$1"
  if [ -d "${SLISDIR}/${SUBDIR}" ]
  then
    cd "${SLISDIR}/${SUBDIR}"
    SUBDIR_CONFS=
    for i in *
    do
        [ "$i" == "*" ] && continue
        SUBDIR_CONFS="${SUBDIR_CONFS} $i"
    done

    cd "${CONFDIR}"
    PS3="${BOLD}${PLEASE} ${SUBDIR} choice (numeric or text): ${NORMAL}"
    options=(ALL ${SUBDIR_CONFS} "Main menu" "Quit")
    while true
    do
      select opt in "${options[@]}"
      do
        case "$opt,$REPLY" in
            "Main menu",*|*,"Main menu"|"Back",*|*,"Back"|"back",*|*,"back")
                printf "Returning\n\n"
                break 2
                ;;
            "Quit",*|*,"Quit"|"quit",*|*,"quit")
                printf "\nExiting\n"
                return 9
                ;;
            "ALL",*|*,"ALL")
                if [ -f config-${SUBDIR}.js ]
                then
                    printf "\nInstalling config-${SUBDIR}.js ${MMCFMSG}\n"
                    setconf ${SUBDIR}
                    break
                else
                    printf "\nInvalid entry. Please try again"
                    printf "\n${NUMPROMPT}\n"
                    break
                fi
                ;;
            *)
                if [ -f ${SUBDIR}/config-${opt}.js ]
                then
                    printf "\nInstalling config-${opt}.js ${MMCFMSG}\n"
                    setconf ${opt} ${SUBDIR}
                    break
                else
                    if [ -f ${SUBDIR}/config-${REPLY}.js ]
                    then
                        printf "\nInstalling config-${REPLY}.js ${MMCFMSG}\n"
                        setconf ${REPLY} ${SUBDIR}
                        break
                    else
                        printf "\nInvalid entry. Please try again"
                        printf "\n${NUMPROMPT}\n"
                        break
                    fi
                fi
                ;;
        esac
      done
    done
  else
    echo "${SLISDIR}/${SUBDIR} does not exist or is not a directory. Skipping."
  fi
  return 0
}

select_youtube() {
  if [ -d "${CONFDIR}/YouTube" ]
  then
    cd "${CONFDIR}/YouTube"
    TUBS=
    for i in config-*.js
    do
        [ "$i" == "config-*.js" ] && continue
        j=`echo $i | sed -e "s/config-//" -e "s/.js//"`
        case "$j" in
            "babymetal")
                TUBS="${TUBS} Babymetal"
                ;;
            "bowie")
                TUBS="${TUBS} David_Bowie"
                ;;
            "deeppurple")
                TUBS="${TUBS} Deep_Purple"
                ;;
            "dualipa")
                TUBS="${TUBS} Dua_Lipa"
                ;;
            "fractalplaylist")
                TUBS="${TUBS} Fractals"
                ;;
            "hardzoom")
                TUBS="${TUBS} Mandelbrot_Zoom"
                ;;
            "kpop")
                TUBS="${TUBS} K-Pop"
                ;;
            "organ")
                TUBS="${TUBS} Organ_Performances"
                ;;
            "qotsa")
                TUBS="${TUBS} Queens_of_the_Stone_Age"
                ;;
            "rufus")
                TUBS="${TUBS} Rufus_Wainwright"
                ;;
            "tvthemes")
                TUBS="${TUBS} TV_Opening_Themes"
                ;;
            "zhu")
                TUBS="${TUBS} ZHU"
                ;;
            *)
                TUBS="${TUBS} $j"
                ;;
        esac
    done

    cd "${CONFDIR}"
    PS3="${BOLD}${PLEASE} YouTube choice (numeric or text): ${NORMAL}"
    options=(${TUBS} "Main menu" "Quit")
    while true
    do
      select opt in "${options[@]}"
      do
        case "$opt,$REPLY" in
            "Main menu",*|*,"Main menu"|"Back",*|*,"Back"|"back",*|*,"back")
                printf "Returning\n\n"
                break 2
                ;;
            "Quit",*|*,"Quit"|"quit",*|*,"quit")
                printf "\nExiting\n"
                return 9
                ;;
            "Babymetal",*|*,"Babymetal")
                setconf babymetal YouTube
                break
                ;;
            "David_Bowie",*|*,"David_Bowie")
                setconf bowie YouTube
                break
                ;;
            "Deep_Purple",*|*,"Deep_Purple")
                setconf deeppurple YouTube
                break
                ;;
            "Dua_Lipa",*|*,"Dua_Lipa")
                setconf dualipa YouTube
                break
                ;;
            "Fractals",*|*,"Fractals")
                setconf fractalplaylist YouTube
                break
                ;;
            "Mandelbrot_Zoom",*|*,"Mandelbrot_Zoom")
                setconf hardzoom YouTube
                break
                ;;
            "K-Pop",*|*,"K-Pop")
                setconf kpop YouTube
                break
                ;;
            "Organ_Performances",*|*,"Organ_Performances")
                setconf organ YouTube
                break
                ;;
            "Queens_of_the_Stone_Age",*|*,"Queens_of_the_Stone_Age")
                setconf qotsa YouTube
                break
                ;;
            "Rufus_Wainwright",*|*,"Rufus_Wainwright")
                setconf rufus YouTube
                break
                ;;
            "TV_Opening_Themes",*|*,"TV_Opening_Themes")
                setconf tvthemes YouTube
                break
                ;;
            "ZHU",*|*,"ZHU")
                setconf zhu YouTube
                break
                ;;
            *)
                if [ -f YouTube/config-${opt}.js ]
                then
                  printf "\nInstalling config-${opt}.js ${MMCFMSG}\n"
                  setconf ${opt} YouTube
                  break
                else
                  if [ -f YouTube/config-${REPLY}.js ]
                  then
                    printf "\nInstalling config-${REPLY}.js ${MMCFMSG}\n"
                    setconf ${REPLY} YouTube
                    break
                  else
                    printf "\nInvalid entry. Please try again"
                    printf "\n${NUMPROMPT}\n"
                    break
                  fi
                fi
                ;;
        esac
      done
    done
  else
    echo "${CONFDIR}/YouTube does not exist or is not a directory. Skipping."
  fi
  return 0
}

# If invoked with no arguments present a menu of options to select from
[ "$1" ] || {
  while true
  do
    PS3="${BOLD}${PLEASE} command choice (numeric or text): ${NORMAL}"
    options=("list active modules" "list installed modules" "list configurations" "select configuration" "rotate left" "rotate normal" "rotate right" "rotate inverted" "rotate default" "restart" "screen off" "screen on" "screenshot" "start" "stop" "status" "status all" "get brightness" "set brightness" "video playback" "system info" "debug mode" "kill mirror" "quit")
    select opt in "${options[@]}"
    do
        case "$opt,$REPLY" in
            "debug mode",*|*,"debug mode")
                start_dev
                break
                ;;
            "list active modules",*|*,"list active modules")
                list_mods active
                break
                ;;
            "list installed modules",*|*,"list installed modules")
                list_mods installed
                break
                ;;
            "list configurations",*|*,"list configurations")
                printf "\n======================================================\n"
                list_mods configs
                printf "\n======================================================\n"
                break
                ;;
            "select configuration",*|*,"select configuration")
                printf "======================================================\n\n"
                select_configuration
                [ $? -eq 9 ] && exit 0
                break
                ;;
            "get brightness",*|*,"get brightness")
                get_brightness
                break
                ;;
            "set brightness",*|*,"set brightness")
                while true
                do
                  read -p "Enter a brightness level between 0 and 200 or 'exit' to quit" answer
                  [ "$answer" == "exit" ] && break
                  if [ $answer -ge 0 ] && [ $answer -le 200 ]
                  then
                      printf "\nSetting MagicMirror Brightness Level to $answer\n"
                      if [ "$usejq" ]
                      then
                        if [ "${apikey}" ]
                        then
                          curl -X GET http://${IP}:${PORT}/api/brightness/$answer?apiKey=${apikey} 2> /dev/null | jq .
                        else
                          curl -X GET http://${IP}:${PORT}/api/brightness/$answer 2> /dev/null | jq .
                        fi
                      else
                        if [ "${apikey}" ]
                        then
                          curl -X GET http://${IP}:${PORT}/api/brightness/$answer?apiKey=${apikey}
                        else
                          curl -X GET http://${IP}:${PORT}/api/brightness/$answer
                        fi
                        echo ""
                      fi
                  else
                      printf "\nBrightness setting $answer out of range or not a number"
                      printf "\nValid brightness values are integer values [0-200]\n"
                  fi
                done
                break
                ;;
            "screen *",*|*,"screen *")
                mirror ${opt}
                break
                ;;
            "screenshot",*|*,"screenshot")
                screen_shot
                break
                ;;
            "system info",*|*,"system info")
                get_info_type
                [ $? -eq 9 ] && exit 0
                break
                ;;
            "start",*|*,"start")
                mirror start
                break
                ;;
            "stop",*|*,"stop")
                mirror stop
                break
                ;;
            "status",*|*,"status")
                mirror status
                break
                ;;
            "status all",*|*,"status all")
                mirror status all
                break
                ;;
            "rotate *",*|*,"rotate *")
                mirror ${opt}
                break
                ;;
            "restart",*|*,"restart")
                mirror restart
                break
                ;;
            "video playback",*|*,"video playback")
                printf "======================================================\n\n"
                select_playback
                [ $? -eq 9 ] && exit 0
                break
                ;;
            "kill mirror",*|*,"kill mirror")
                mirror kill
                break
                ;;
            "Quit",*|*,"Quit"|"quit",*|*,"quit")
                printf "\nExiting\n"
                exit 0
                ;;
        esac
    done
  done
}

# TODO: getopt processing for these remaining commands
# select
# restart
# screenshot
# start
# stop
# status [all]

while getopts a:A:b:Bc:dDhHi:Ij:J:l:Lm:M:Np:P:r:Rs:Sv:Vw:W:X:Zu flag; do
    case $flag in
        a)
          artist_create ${OPTARG}
          ;;
        A)
          artist_remove ${OPTARG}
          ;;
        b)
          set_brightness ${OPTARG}
          ;;
        B)
          get_brightness
          ;;
        c)
          set_config ${OPTARG}
          ;;
        d)
          START_DEV=1
          ;;
        D)
          TELEGRAM=1
          BOLD=
          NORMAL=
          ERROR_EXIT=0
          ;;
        h)
          show_video
          ;;
        H)
          hide_video
          ;;
        I)
            INFO="all"
            system_info
            ;;
        i)
            case ${OPTARG} in
              all|temp|mem|disk|usb|net|wireless|screen)
                INFO=${OPTARG}
                system_info
                ;;
              *)
                usage
                ;;
            esac
            ;;
        j)
          jav_create ${OPTARG}
          ;;
        J)
          jav_remove ${OPTARG}
          ;;
        l)
            case ${OPTARG} in
              active|installed|configs)
                list_mods ${OPTARG}
                ;;
              *)
                list_usage
                ;;
            esac
            ;;
        L)
          PORTRAIT=
          ;;
        m)
          model_create ${OPTARG}
          ;;
        M)
          model_remove ${OPTARG}
          ;;
        N)
          next_video
          ;;
        p)
          photo_create ${OPTARG}
          ;;
        P)
          photo_remove ${OPTARG}
          ;;
        R)
          replay_video
          ;;
        r)
          rotate_screen ${OPTARG}
          ;;
        S)
          screen_control
          ;;
        s)
          screen_control ${OPTARG}
          ;;
        v)
          set_volume ${OPTARG}
          ;;
        V)
          toggle_videoplay
          ;;
        w)
          wh_create ${OPTARG}
          ;;
        W)
          wh_remove ${OPTARG}
          ;;
        X)
          set_screen ${OPTARG}
          ;;
        Z)
          screen_shot
          ;;
        u)
            usage
            ;;
    esac
done
shift $(( OPTIND - 1 ))

if [ "${PORTRAIT}" ]
then
    MM_CONFDIR="config"
    TG_CONFDIR="config-notelegram"
else
    MM_CONFDIR="config-landscape"
    TG_CONFDIR="config-landscape-notelegram"
fi
BU_TG_CONFDIR="config-notelegram"

[ "$1" == "youtube" ] && {
    select_youtube
}

[ "$1" == "artists_dir" ] && {
    select_subdir Artists
}

[ "$1" == "models_dir" ] && {
    select_subdir Models
}

[ "$1" == "photogs_dir" ] && {
    select_subdir Photographers
}

[ "$1" == "jav_idols" ] && {
    select_subdir JAV
}

[ "$1" == "select" ] && {
    select_configuration
}

[ "$1" == "videoplayback" ] && {
    select_playback
}

[ "$1" == "dev" ] && {
    start_dev
    exit 0
}

[ "$1" == "info" ] && {
    [ "$2" ] && INFO="$2"
    system_info
    exit 0
}

[ "$1" == "screen" ] && {
    screen_control $2
    exit 0
}

[ "$1" == "switch" ] && {
    set_screen $1
    exit 0
}

[ "$1" == "restart" ] && {
    if [ "${START_DEV}" ]
    then
        start_dev
    else
        printf "\n${BOLD}Restarting MagicMirror${NORMAL}\n"
        if [ "${usepm2}" ]
        then
            pm2 restart MagicMirror --update-env
        else
            cd "${MM}"
            npm restart
        fi
        printf "\n${BOLD}Done${NORMAL}\n"
    fi
    exit 0
}

[ "$1" == "reboot" ] && {
    [ -x /usr/local/bin/myreboot ] && /usr/local/bin/myreboot
    exit 0
}

[ "$1" == "shutdown" ] && {
    [ -x /usr/local/bin/myshutdown ] && /usr/local/bin/myshutdown
    exit 0
}

[ "$1" == "rotate" ] && {
    rotate_screen $2
    exit 0
}

[ "$1" == "screenshot" ] && {
    screen_shot
    exit 0
}

[ "$1" == "start" ] && {
    if [ "${START_DEV}" ]
    then
        start_dev
    else
        printf "\n${BOLD}Starting MagicMirror${NORMAL}\n"
        if [ "${usepm2}" ]
        then
            pm2 start MagicMirror
        else
            cd "${MM}"
            npm start
        fi
        printf "\n${BOLD}Done${NORMAL}\n"
    fi
    exit 0
}

[ "$1" == "kill" ] && {
    printf "\n${BOLD}Killing MagicMirror${NORMAL}\n"
    if [ "${usepm2}" ]
    then
        pm2 stop MagicMirror
    else
        mirror_stop
    fi
    ps aux | grep node | grep -v "color" | awk '{print $2}' | xargs sudo kill -9
    printf "\n${BOLD}Done${NORMAL}\n"
    exit 0
}

[ "$1" == "stop" ] && {
    printf "\n${BOLD}Stopping MagicMirror${NORMAL}\n"
    if [ "${usepm2}" ]
    then
        pm2 stop MagicMirror
    else
        mirror_stop
    fi
    printf "\n${BOLD}Done${NORMAL}\n"
    exit 0
}

[ "$1" == "status" ] && {
  printf "\n${BOLD}MagicMirror Status:${NORMAL}\n"
  if [ "${usepm2}" ]
  then
    if [ "${TELEGRAM}" ]
    then
      pm2 -m status MagicMirror
    else
      pm2 status MagicMirror
      check_config $2
    fi
  else
    echo "Unable to check running status without pm2"
    [ "${TELEGRAM}" ] || check_config $2
  fi
  CONF=`readlink -f ${CONFDIR}/config.js`
  printf "\nUsing config file `basename ${CONF}`\n"
  display_status
  exit 0
}

[ "$1" == "getb" ] && {
    get_brightness
    exit 0
}

[ "$1" == "list" ] && {
    list_mods $2
    exit 0
}

[ "$1" == "setb" ] && {
    set_brightness $2
    exit 0
}

[ "$1" == "vol" ] && {
    set_volume $2
    exit 0
}

[ "$1" == "next" ] && [ "$2" == "scene" ] && {
    next_scene
    exit 0
}

[ "$1" == "nextscene" ] || [ "$1" == "scenenext" ] && {
    next_scene
    exit 0
}

[ "$1" == "prev" ] && [ "$2" == "scene" ] && {
    prev_scene
    exit 0
}

[ "$1" == "prevscene" ] || [ "$1" == "sceneprev" ] && {
    prev_scene
    exit 0
}

[ "$1" == "scene" ] && {
  if [ "$2" ]
  then
    if [ "$2" == "next" ]
    then
      next_scene
    else
      if [ "$2" == "prev" ]
      then
        prev_scene
      else
        if [ "$2" == "info" ]
        then
          info_scene
        else
          act_scene $2
        fi
      fi
    fi
  else
    next_scene
  fi
  exit 0
}

[ "$1" == "hidevideo" ] || [ "$1" == "videohide" ] && {
    hide_video
    exit 0
}

[ "$1" == "showvideo" ] || [ "$1" == "videoshow" ] && {
    show_video
    exit 0
}

[ "$1" == "nextvideo" ] || [ "$1" == "videonext" ] && {
    next_video
    exit 0
}

[ "$1" == "replayvideo" ] || [ "$1" == "videoreplay" ] || [ "$1" == "replay" ] && {
    replay_video
    exit 0
}

[ "$1" == "videopause" ] || [ "$1" == "videoplay" ] ||
[ "$1" == "pausevideo" ] || [ "$1" == "playvideo" ] && {
    toggle_videoplay
    exit 0
}

[ "$1" == "ac" ] && {
    artist_create $2
    exit 0
}

[ "$1" == "ar" ] && {
    artist_remove $2
    exit 0
}

[ "$1" == "jc" ] && {
    jav_create $2
    exit 0
}

[ "$1" == "jr" ] && {
    jav_remove $2
    exit 0
}

[ "$1" == "mc" ] && {
    model_create $2
    exit 0
}

[ "$1" == "mr" ] && {
    model_remove $2
    exit 0
}

[ "$1" == "mute" ] || [ "$1" == "unmute" ] && {
    set_volume $1
    exit 0
}

[ "$1" == "pc" ] && {
    photo_create $2
    exit 0
}

[ "$1" == "pr" ] && {
    photo_remove $2
    exit 0
}

[ "$1" == "wh" ] && {
    wh_create $2
    exit 0
}

[ "$1" == "whrm" ] && {
    wh_remove $2
    exit 0
}

[ "$1" == "update" ] && {
    if [ "$2" == "modules" ]
    then
      module_update_all
    else
      cd "${MM}"
      git status -uno | grep "nothing to commit" > /dev/null || {
          echo "It appears you have local modifications to MagicMirror"
          echo "installation files other than the config and modules."
          echo "Updating MagicMirror will overwrite these changes."
          echo ""
          echo "The changes to MagicMirror installation files detected:"
          echo ""
          git status -uno
          echo ""
          while true
          do
            read -p "Do you wish to proceed with the MagicMirror update anyway ? ('Y'/'N'): " yn
            case $yn in
                [Yy]*)
                    git reset --hard
                    break
                    ;;
                [Nn]*)
                    echo "you can reset your changes with 'git reset --hard'."
                    echo "After that, rerunning 'mirror update' should work."
                    echo "Exiting."
                    exit 1
                    break
                    ;;
                * )
                    echo "Please answer yes or no."
                    ;;
            esac
          done
      }
      git pull && npm install --only=prod --omit=dev
    fi
    exit 0
}

[ "$1" ] && set_config $1 $2
exit 0
