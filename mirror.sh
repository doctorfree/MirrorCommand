#!/bin/bash
#
## @file mirror.sh
## @brief Convenience script to manage multiple MagicMirror configurations
## @author Ronald Joe Record (rr at ronrecord dot com)
## @copyright Copyright (c) 2020, Ronald Joe Record, all rights reserved.
## @date Written 1-feb-2020
## @version 1.0.0
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
# Set this to your MagicMirror installation directory
MM="${HOME}/MagicMirror"
# Set the IP and PORT to the values on your system
# IP is the IP address of your MagicMirror Raspberry Pi
IP="10.0.1.85"
# PORT is the port your MMM-Remote-Control module is running on
PORT="8080"
#
# Set you MMM-Remote-Control API Key here or leave blank if you have not configured one
#
# Replace "MMM-Remote-Control_API_Key" with your MMM-Remote-Control API Key
apikey="MMM-Remote-Control_API_Key"
# Uncomment this line if you have not configured an MMM-Remote-Control API Key
# apikey=
#
# Set this to the X11 DISPLAY you are using. DISPLAY=:0 works for most systems.
export DISPLAY=:0
# -----------------------------------------------------------------------
CONFDIR="${MM}/config"
# MagicMirror configuration files organized into subdirectories listed here
CONF_SUBDIRS="Artists JAV Models Photographers YouTube"
MMCFMSG="MagicMirror configuration file"
SLISDIR="${MM}/modules/MMM-BackgroundSlideshow/pics"
ARTISTDIR="Pictures/Artists-ALL"
JAVDIR="Pictures/JAV-ALL"
MODELDIR="Pictures/Models-ALL"
PHOTODIR="Pictures/Photographers-ALL"
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
INFO="all"
BOLD=$(tput bold)
NORMAL=$(tput sgr0)
usejq=`type -p jq`

[ "${apikey}" == "MMM-Remote-Control_API_Key" ] && {
    printf "\nMMM-Remote-Control API Key is not configured. Either add your key"
    printf "\nor comment out the empty setting for 'apikey' near the beginning of this script."
    printf "\n\nContinuing but some functionality disabled.\n"
}

[ -d "${CONFDIR}" ] || {
    printf "\nCONFDIR does not exist or is not a directory. Exiting.\n"
    exit 1
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
            ln -s config-default.js config.js
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
                ln -s config-default.js config.js
            fi
        fi
    fi
}

display_status() {
    vcgencmd display_power | grep  -q 'display_power=1' && \
        echo 'Display ON' || echo 'Display OFF'
}

getconfs() {
    numconfs=0
    CONFS=
    for i in config-*.js
    do
        j=`echo $i | awk -F "-" ' { print $2 } ' | sed -e "s/.js//"`
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
        printf "\n${BOLD}Listing Active MagicMirror modules${NORMAL}\n"
        if [ "$usejq" ]
        then
          if [ "${apikey}" ]
          then
            curl -X GET http://${IP}:${PORT}/api/module?apiKey=${apikey} 2> /dev/null | jq .
          else
            curl -X GET http://${IP}:${PORT}/api/module 2> /dev/null | jq .
          fi
        else
          if [ "${apikey}" ]
          then
            curl -X GET http://${IP}:${PORT}/api/module?apiKey=${apikey}
          else
            curl -X GET http://${IP}:${PORT}/api/module
          fi
          echo ""
        fi
    else
        if [ "$1" == "installed" ]
        then
            printf "\n${BOLD}Listing Installed MagicMirror modules${NORMAL}\n"
            if [ "$usejq" ]
            then
              if [ "${apikey}" ]
              then
                curl -X GET http://${IP}:${PORT}/api/module/installed?apiKey=${apikey} 2> /dev/null | jq .
              else
                curl -X GET http://${IP}:${PORT}/api/module/installed 2> /dev/null | jq .
              fi
            else
              if [ "${apikey}" ]
              then
                curl -X GET http://${IP}:${PORT}/api/module/installed?apiKey=${apikey}
              else
                curl -X GET http://${IP}:${PORT}/api/module/installed
              fi
              echo ""
            fi
        else
            if [ "$1" == "configs" ]
            then
                printf "\n${BOLD}Listing ${MMCFMSG}s:${NORMAL}\n\n"
                ls config-*.js
                for confdir in __none__ ${CONF_SUBDIRS}
                do
                    [ "${confdir}" == "__none__" ] && continue
                    [ -d ${confdir} ] && {
                        printf "\n${BOLD}Listing MagicMirror ${confdir} configuration files:${NORMAL}\n\n"
                        ls ${confdir}/config-*.js
                    }
                done
            else
                printf "\nmirror list $1 is not an accepted 2nd argument."
                printf "\nValid 2nd arguments to the list command are 'active', 'installed', and 'configs'"
                list_usage
            fi
        fi
    fi
}

rotate_screen() {
    [ "$1" == "inverted" ] || [ "$1" == "left" ] || [ "$1" == "normal" ] || [ "$1" == "right" ] || {
        printf "\nUsage: rotate option takes an argument of 'left', 'right', 'inverted', or 'normal'"
        printf "\n Exiting.\n"
        usage
    }
    printf "\n${BOLD}Rotating screen display $1 ${NORMAL}\n"
    xrandr --output HDMI-1 --rotate $1
    printf "\n${BOLD}Done${NORMAL}\n"
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
            usage
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
    pm2 stop MagicMirror --update-env
    npm start dev
    printf "\n${BOLD}Done${NORMAL}\n"
}

get_brightness() {
    printf "\n${BOLD}Getting MagicMirror Brightness Level${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET http://${IP}:${PORT}/api/brightness?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET http://${IP}:${PORT}/api/brightness 2> /dev/null | jq .
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
        echo "Install vol.sh from the MirrorCommandLine repository."
    fi
}

hide_video() {
    printf "\n${BOLD}Hide MagicMirror Video${NORMAL}\n"
    if [ "$usejq" ]
    then
      if [ "${apikey}" ]
      then
        curl -X GET http://${IP}:${PORT}/api/module/MMM-Videoplayer/hide?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET http://${IP}:${PORT}/api/module/MMM-Videoplayer/hide 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET http://${IP}:${PORT}/api/module/MMM-Videoplayer/hide?apiKey=${apikey}
      else
        curl -X GET http://${IP}:${PORT}/api/module/MMM-Videoplayer/hide
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
        curl -X GET http://${IP}:${PORT}/api/module/MMM-Videoplayer/show?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET http://${IP}:${PORT}/api/module/MMM-Videoplayer/show 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET http://${IP}:${PORT}/api/module/MMM-Videoplayer/show?apiKey=${apikey}
      else
        curl -X GET http://${IP}:${PORT}/api/module/MMM-Videoplayer/show
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
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/NEXT?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/NEXT 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/NEXT?apiKey=${apikey}
      else
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/NEXT
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
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/REPLAY?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/REPLAY 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/REPLAY?apiKey=${apikey}
      else
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/REPLAY
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
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/TOGGLE?apiKey=${apikey} 2> /dev/null | jq .
      else
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/TOGGLE 2> /dev/null | jq .
      fi
    else
      if [ "${apikey}" ]
      then
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/TOGGLE?apiKey=${apikey}
      else
        curl -X GET http://${IP}:${PORT}/api/notification/VIDEOPLAYER1/TOGGLE
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
            exit 1
        fi
    }
    if [ -d "${HOME}/Pictures/Models/${PICDIR}" ]
    then
        # Already have a prepared folder for this model
        printf "\nUsing existing model folder pics\n"
        setconf ${PICDIR} Models
    else
      if [ -d "${HOME}/${MODELDIR}/${PICDIR}" ]
      then
        printf "\nCreating image folder for ${SLISDIR}/Models/${PICDIR}\n"
        [ -d "${SLISDIR}/Models/${PICDIR}" ] || mkdir -p "${SLISDIR}/Models/${PICDIR}"
        cd "${SLISDIR}/Models/${PICDIR}"
        rm -f *.jpg
        cp -L ${HOME}/${MODELDIR}/${PICDIR}/*.jpg .
        cd "${CONFDIR}"
        setconf ${PICDIR} Models
      else
        printf "\nFolder argument ${MODELDIR}/${PICDIR} does not exist or is not a directory."
        usage
      fi
    fi
}

model_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for ${MODELDIR}/${PICDIR}"
        cd "${SLISDIR}"
        rm -rf "${PICDIR}"
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
            exit 1
        fi
    }
    if [ -d "${HOME}/Pictures/Artists/${PICDIR}" ]
    then
        # Already have a prepared folder for this artist
        printf "\nUsing existing ${PICDIR} image folder\n"
        setconf ${PICDIR} Artists
    else
      if [ -d "${HOME}/${ARTISTDIR}/${PICDIR}" ]
      then
        printf "\nCreating image folder ${SLISDIR}/Artists/${PICDIR}\n"
        [ -d "${SLISDIR}/Artists/${PICDIR}" ] || mkdir -p "${SLISDIR}/Artists/${PICDIR}"
        cd "${SLISDIR}/Artists/${PICDIR}"
        rm -f *.jpg
        cp -L ${HOME}/${ARTISTDIR}/${PICDIR}/*.jpg .
        cd "${CONFDIR}"
        setconf ${PICDIR} Artists
      else
        printf "\nFolder argument ${ARTISTDIR}/${PICDIR} does not exist or is not a directory."
        usage
      fi
    fi
}

artist_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for ${ARTISTDIR}/${PICDIR}"
        cd "${SLISDIR}"
        rm -rf "${PICDIR}"
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
            exit 1
        fi
    }
    if [ -d "${HOME}/Pictures/JAV/${PICDIR}" ]
    then
        # Already have a prepared folder for this photographer
        printf "\nUsing existing ${PICDIR} image folder\n"
        setconf ${PICDIR} JAV
    else
      if [ -d "${HOME}/${JAVDIR}/${PICDIR}" ]
      then
        printf "\nCreating image folder ${SLISDIR}/JAV/${PICDIR}\n"
        [ -d "${SLISDIR}/JAV/${PICDIR}" ] || mkdir -p "${SLISDIR}/JAV/${PICDIR}"
        cd "${SLISDIR}/JAV/${PICDIR}"
        rm -f *.jpg
        cp -L ${HOME}/${JAVDIR}/${PICDIR}/*.jpg .
        cd "${CONFDIR}"
        setconf ${PICDIR} JAV
      else
        printf "\nFolder argument ${JAVDIR}/${PICDIR} does not exist or is not a directory."
        usage
      fi
    fi
}

jav_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for ${JAVDIR}/${PICDIR}"
        cd "${SLISDIR}"
        rm -rf "${PICDIR}"
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
            exit 1
        fi
    }
    if [ -d "${HOME}/Pictures/Photographers/${PICDIR}" ]
    then
        # Already have a prepared folder for this photographer
        printf "\nUsing existing ${PICDIR} image folder\n"
        setconf ${PICDIR} Photographers
    else
      if [ -d "${HOME}/${PHOTODIR}/${PICDIR}" ]
      then
        printf "\nCreating image folder ${SLISDIR}/Photographers/${PICDIR}\n"
        [ -d "${SLISDIR}/Photographers/${PICDIR}" ] || mkdir -p "${SLISDIR}/Photographers/${PICDIR}"
        cd "${SLISDIR}/Photographers/${PICDIR}"
        rm -f *.jpg
        cp -L ${HOME}/${PHOTODIR}/${PICDIR}/*.jpg .
        cd "${CONFDIR}"
        setconf ${PICDIR} Photographers
      else
        printf "\nFolder argument ${PHOTODIR}/${PICDIR} does not exist or is not a directory."
        usage
      fi
    fi
}

photo_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for ${PHOTODIR}/${PICDIR}"
        cd "${SLISDIR}"
        rm -rf "${PICDIR}"
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
    cd "${CONFDIR}"
    printf "\nCreating config file ${CONFDIR}/config-${PICDIR}.js\n"
    [ -f "config-${PICDIR}.js" ] || {
        if [ -f ${WHVN_TEMPLATE} ]
        then
            cat ${WHVN_TEMPLATE} | sed -e "s/WH_DIR_HOLDER/${PICDIR}/" > "config-${PICDIR}.js"
        else
            echo "Wallhaven config template $WHVN_TEMPLATE not found"
            exit 1
        fi
    }
    if [ -d "${HOME}/${WHVNDIR}/${PICDIR}" ]
    then
        printf "\nCreating image folder ${SLISDIR}/${PICDIR}"
        [ -d "${SLISDIR}/${PICDIR}" ] || mkdir -p "${SLISDIR}/${PICDIR}"
        cd "${SLISDIR}/${PICDIR}"
        rm -f *.jpg
        cp -L ${HOME}/${WHVNDIR}/${PICDIR}/*.jpg .
        haveim=`type -p identify`
        if [ "$haveim" ]
        then
          # Remove photos in landscape mode for vertical mirror
          for i in *.jpg
          do
            [ "$i" == "*.jpg" ] && {
                printf "\nNo JPEG pics found in ${WHVNDIR}/${PICDIR} ... Exiting\n"
                cd ..
                rm -rf "${PICDIR}"
                usage
            }
            GEO=`identify "$i" 2> /dev/null | awk ' { print $(NF-6) } '`
            W=`echo $GEO | awk -F "x" ' { print $1 } '`
            # Remove if width not greater than 750
            [ "$W" ] && [ $W -gt 750 ] || {
                rm -f "$i"
                continue
            }
            H=`echo $GEO | awk -F "x" ' { print $2 } '`
            # Remove if height not greater than 1000
            [ "$H" ] && [ $H -gt 1000 ] || {
                rm -f "$i"
                continue
            }
            # Remove if height not greater than width
            [ "$W" ] && [ "$H" ] && [ $H -gt $W ] || rm -f "$i"
          done
        else
          printf "\nCould not find identify command. Install ImageMagick"
          printf "\nSkipping removal of landscape photos\n"
        fi
        set_config ${PICDIR}
    else
        printf "\nFolder argument ${WHVNDIR}/${PICDIR} does not exist or is not a directory."
        usage
    fi
}

wh_remove() {
    [ "$1" ] || {
        printf "\nFolder argument required to specify Slideshow dir.\n"
        usage
    }
    PICDIR="$1"
    [ -d "${SLISDIR}/${PICDIR}" ] && {
        printf "\nRemoving config file and pic folder for ${WHVNDIR}/${PICDIR}"
        cd "${SLISDIR}"
        rm -rf "${PICDIR}"
    }
    rm -f "${CONFDIR}/config-${PICDIR}.js"
    set_config default
}

usage() {
    getconfs usage
    printf "\n${BOLD}Usage:${NORMAL} mirror <command> [args]"
    printf "\nWhere <command> can be one of the following:"

    printf "\n\tinfo [temp|mem|disk|usb|net|wireless|screen],"
    printf " list <active|installed|configs>, rotate [right|left|normal|inverted],"
    printf " artists_dir, models_dir, photogs_dir, youtube, select, restart, screen [on|off|info|status],"
    printf " playvideo, pausevideo, nextvideo, replayvideo, hidevideo, showvideo,"
    printf " start, stop, status [all], dev, getb, setb <num>, vol <num>,"
    printf " vol mute|unmute|save|restore|get, mute, unmute,"
    printf " ac|ar <artist>, jc|jr <idol>, mc|mr <model>,"
    printf " pc|pr <photographer>, wh|whrm <dir>"

    printf "\n\nor specify a config file to use with one of:"
    printf "\n\t${CONFS}"
    printf "\n\nor any other config file you have created in ${CONFDIR} of the form:"
    printf "\n\tconfig-<name>.js"
    printf "\n\nA config filename argument will be resolved into a config filename of the form:"
    printf "\n\tconfig-\$argument.js"
    printf "\n\nA subdirectory in which to locate the config file can be specified"
    printf " as the second argument, e.g. 'mirror foo bar' will attempt to use"
    printf " the config file bar/config-foo.js"
    printf "\n\nArguments can also be specified as follows:"
    printf "\n\t-a <artist>, -A <artist>, -b <brightness>, -B, -c <config>, -d, -i <info>,"
    printf "\n\t-V, -N, -R (toggle video play, play next video, replay video),"
    printf "\n\t-H, -h (Hide video, Show video),"
    printf "\n\t-I, -l <list>, -r <rotate>, -s <screen>, -S, -m <model>, -M <model>,"
    printf "\n\t-p <photographer>, -P <photographer>, -w <dir>, -W <dir>, -u"
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
    printf "\n\tmirror rotate left/right/normal/inverted\t\t# rotates the screen left, right, inverted, or normal"
    printf "\n\tmirror screen on\t\t#  Turns the Display ON"
    printf "\n\tmirror screen off\t\t# Turns the Display OFF"
    printf "\n\tmirror status [all]\t\t# Displays MagicMirror status, checks config syntax"
    printf "\n\tmirror getb\t\t# Displays current MagicMirror brightness level"
    printf "\n\tmirror setb 150\t\t# Sets MagicMirror brightness level to 150"
    printf "\n\tmirror vol 50\t\t# Sets MagicMirror volume level to 50"
    printf "\n\tmirror wh foobar\t\t# Creates and activates a slideshow config with pics in foobar"
    printf "\n\tmirror whrm foobar\t\t# Deactivate and remove slideshow in foobar"
    printf "\n\tmirror -u\t\t# Display this usage message\n"
    exit 1
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
    if [ "$subdir" ]
    then
        echo "Setting MagicMirror configuration to ${subdir}/config-${conf}.js"
        ln -s $subdir/config-${conf}.js config.js
    else
        echo "Setting MagicMirror configuration to config-${conf}.js"
        ln -s config-${conf}.js config.js
    fi
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
        exit 1
    }
    [ -L config-$$.js ] && rm -f config-$$.js
    rotation=`xrandr | grep connected | awk ' { print $5 } '`
    case ${conf} in
        tantra|iframe|candy|fractalplaylist)
            [ "$rotation" == "normal" ] || {
                printf "\n${BOLD}Rotating screen display normal ${NORMAL}\n"
                xrandr --output HDMI-1 --rotate normal
            }
            ;;
        *)
            [ "$rotation" == "right" ] || {
                printf "\n${BOLD}Rotating screen display right ${NORMAL}\n"
                xrandr --output HDMI-1 --rotate right
            }
            ;;
    esac
    if [ "${START_DEV}" ]
    then
        start_dev
    else
        pm2 restart MagicMirror --update-env
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
    uname -a
    [ "$INFO" == "all" ] || [ "$INFO" == "temp" ] && {
        printf "\nCPU `vcgencmd measure_temp`\n"
    }
    [ "$INFO" == "all" ] || [ "$INFO" == "mem" ] && {
        cpu_mem=`vcgencmd get_mem arm | awk -F "=" ' { print $2 } '`
        gpu_mem=`vcgencmd get_mem gpu | awk -F "=" ' { print $2 } '`
        printf "\n${BOLD}Memory Split:${NORMAL}\tCPU=${cpu_mem}\tGPU=${gpu_mem}\n"
        printf "\n${BOLD}Memory:${NORMAL}\n"
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
        printf "${BOLD}Screen dimensions and resolution:${NORMAL}\n"
        xrandr | grep Screen
        xrandr | grep connected
        xdpyinfo | grep dimensions
        xdpyinfo | grep resolution
        display_status
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
    options=("list active modules" "list installed modules" "list configurations" "select configuration" "rotate left" "rotate normal" "rotate right" "rotate inverted" "restart" "screen off" "screen on" "screenshot" "start" "stop" "status" "status all" "get brightness" "set brightness" "video playback" "system info" "debug mode" "quit")
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

while getopts a:A:b:Bc:dhHi:Ij:J:l:m:M:Np:P:r:Rs:Sv:Vw:W:Zu flag; do
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
        Z)
          screen_shot
          ;;
        u)
            usage
            ;;
    esac
done
shift $(( OPTIND - 1 ))

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

[ "$1" == "restart" ] && {
    if [ "${START_DEV}" ]
    then
        start_dev
    else
        printf "\n${BOLD}Restarting MagicMirror${NORMAL}\n"
        pm2 restart MagicMirror --update-env
        printf "\n${BOLD}Done${NORMAL}\n"
    fi
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
        pm2 start MagicMirror --update-env
        printf "\n${BOLD}Done${NORMAL}\n"
    fi
    exit 0
}

[ "$1" == "stop" ] && {
    printf "\n${BOLD}Stopping MagicMirror${NORMAL}\n"
    pm2 stop MagicMirror --update-env
    printf "\n${BOLD}Done${NORMAL}\n"
    exit 0
}

[ "$1" == "status" ] && {
    printf "\n${BOLD}MagicMirror Status:${NORMAL}\n"
    pm2 status MagicMirror --update-env
    CONF=`readlink -f ${CONFDIR}/config.js`
    printf "\nUsing config file `basename ${CONF}`\n"
    display_status
    check_config $2
    printf "\n${BOLD}Done${NORMAL}\n"
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

[ "$1" ] && set_config $1 $2
exit 0
