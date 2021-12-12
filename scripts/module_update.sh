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
MOD_DIR="${MMHOME}/modules"
INSTALL=
REBUILD=

[ "$1" ] || {
  echo "Usage: module_update [-i] [-r] [module name]"
  exit 0
}

[ "$1" == "-i" ] && {
  INSTALL=1
  shift
}

[ "$1" == "-r" ] && {
  REBUILD=1
  shift
}

for module in $*
do
  if [ -d "${MOD_DIR}/${module}" ]
  then
    cd ${MOD_DIR}/${module}
    case ${module} in
      MMM-Detector|MMM-GoogleAssistant)
        if [ "${REBUILD}" ]
        then
            npm run rebuild
        else
            npm run update
        fi
        ;;
      *)
        git pull
        npm install
        ;;
    esac
  else
    if [ "${INSTALL}" ]
    then
      cd ${MOD_DIR}
      case ${module} in
          internet-monitor)
            git clone https://github.com/ronny3050/internet-monitor.git
            ;;
          MMM-BackgroundSlideshow)
            git clone https://github.com/darickc/MMM-BackgroundSlideshow.git
            ;;
          MMM-CoinMarketCap)
            git clone https://github.com/glitch452/MMM-CoinMarketCap.git
            ;;
          MMM-COVID19-SPARKLINE)
            git clone https://github.com/skelliam/MMM-COVID19-SPARKLINE.git
            ;;
          MMM-DarkSkyForecast)
            git clone https://github.com/jclarke0000/MMM-DarkSkyForecast.git
            ;;
          MMM-DateOnly)
            git clone https://github.com/grabenhenrich/MMM-DateOnly.git
            ;;
          MMM-Detector|MMM-GoogleAssistant|MMM-TelegramBot|MMM-Tools)
            git clone https://github.com/bugsounet/${module}.git
            ;;
          MMM-GoogleMapsTraffic)
            git clone https://github.com/vicmora/MMM-GoogleMapsTraffic.git
            ;;
          mmm-hue-lights)
            git clone https://github.com/michael5r/mmm-hue-lights.git
            ;;
          MMM-iFrame)
            git clone https://github.com/alberttwong/MMM-iFrame.git
            ;;
          MMM-InstagramView|MMM-TelegramCommands|MMM-YouTubeWebView)
            git clone https://github.com/doctorfree/${module}.git
            ;;
          MMM-IronManGIF)
            # git clone https://github.com/2hdlockness/MMM-IronManGIF
            git clone https://github.com/doctorfree/MMM-IronManGIF.git
            ;;
          MMM-MacAddressScan)
            sudo apt-get -y install arp-scan
            git clone https://github.com/doctorfree/MMM-MacAddressScan.git
            ;;
          MMM-MyScoreboard)
            git clone https://github.com/jclarke0000/MMM-MyScoreboard
            ;;
          MMM-pages)
            git clone https://github.com/edward-shen/MMM-pages.git
            ;;
          MMM-RAIN-RADAR)
            git clone https://github.com/jojoduquartier/MMM-RAIN-RADAR.git
            ;;
          MMM-Remote-Control)
            git clone https://github.com/Jopyth/MMM-Remote-Control.git
            ;;
          MMM-Scenes)
            it clone https://github.com/MMRIZE/MMM-Scenes
            ;;
          MMM-Selfieshot)
            sudo apt-get -y install fswebcam
            git clone https://github.com/eouia/MMM-Selfieshot
            ;;
          MMM-Solar)
            git clone https://github.com/tkrywit/MMM-Solar.git
            ;;
          MMM-stocks)
            git clone https://github.com/Elaniobro/MMM-stocks.git
            ;;
          MMM-Videoplayer)
            git clone https://github.com/Snille/MMM-Videoplayer.git
            ;;
          *)
              echo "Unsupported module: ${module}"
              echo "See https://github.com/MichMich/MagicMirror/wiki/3rd-Party-Modules"
              exit 0
              ;;
        esac
        cd ${module}
        npm install
        cd ..
    else
      echo "Cannot locate module ${module}, skipping"
    fi
  fi
done
