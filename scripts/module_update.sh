#!/bin/bash

MMHOME=${HOME}/MagicMirror
INSTALL=
QUIET=
REBUILD=

usage() {
  echo "Usage: module_update [-i] [-n] [-qQ] [-r] [module name]"
  echo "Where:"
  echo "-i indicates install module if not already installed"
  echo "-n indicates do not perform package dependency installs"
  echo "-r indicates rebuild module"
  echo "-q indicates quiet mode"
  exit 1
}

while getopts inqru flag; do
    case $flag in
        i)
            INSTALL=1
            ;;
        n)
            # Some modules perform apt/yum installs of missing dependencies.
            # This is not possible if this command is invoked during a package
            # install. This environment variable can be checked to disable
            # dependency installs during module initialization.
            export __NO_DEP_CHECK__=1
            ;;
        q)
            QUIET=1
            ;;
        r)
            REBUILD=1
            ;;
        u)
            usage
            ;;
    esac
done
shift $(( OPTIND - 1 ))

[ "$1" ] || {
  usage
}

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

for module in $*
do
  if [ -d "${MOD_DIR}/${module}" ]
  then
    cd ${MOD_DIR}/${module}
    case ${module} in
      MMM-Detector|MMM-GoogleAssistant)
        if [ "${REBUILD}" ]
        then
          if [ "${QUIET}" ]
          then
            npm run rebuild > /dev/null 2>&1
          else
            npm run rebuild
          fi
        else
          if [ "${QUIET}" ]
          then
            npm run update > /dev/null 2>&1
          else
            npm run update
          fi
        fi
        ;;
      *)
        if [ "${QUIET}" ]
        then
          git pull > /dev/null 2>&1
          npm install > /dev/null 2>&1
        else
          git pull
          npm install
        fi
        ;;
    esac
  else
    if [ "${INSTALL}" ]
    then
      cd ${MOD_DIR}
      case ${module} in
          internet-monitor)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/ronny3050/internet-monitor.git > /dev/null 2>&1
            else
              git clone https://github.com/ronny3050/internet-monitor.git
            fi
            ;;
          MMM-BackgroundSlideshow)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/darickc/MMM-BackgroundSlideshow.git > /dev/null 2>&1
            else
              git clone https://github.com/darickc/MMM-BackgroundSlideshow.git
            fi
	    cd MMM-BackgroundSlideshow
	    git checkout 8865158fd251eaca1e90703d3c4c99ffddc75de2 > /dev/null 2>&1
	    cd ..
            ;;
          MMM-CoinMarketCap)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/glitch452/MMM-CoinMarketCap.git > /dev/null 2>&1
            else
              git clone https://github.com/glitch452/MMM-CoinMarketCap.git
            fi
            ;;
          MMM-COVID19-SPARKLINE)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/skelliam/MMM-COVID19-SPARKLINE.git > /dev/null 2>&1
            else
              git clone https://github.com/skelliam/MMM-COVID19-SPARKLINE.git
            fi
            ;;
          MMM-DarkSkyForecast)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/jclarke0000/MMM-DarkSkyForecast.git > /dev/null 2>&1
            else
              git clone https://github.com/jclarke0000/MMM-DarkSkyForecast.git
            fi
            ;;
          MMM-DateOnly)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/grabenhenrich/MMM-DateOnly.git > /dev/null 2>&1
            else
              git clone https://github.com/grabenhenrich/MMM-DateOnly.git
            fi
            ;;
          MMM-Tools)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/bugsounet/${module}.git > /dev/null 2>&1
            else
              git clone https://github.com/bugsounet/${module}.git
            fi
            ;;
          MMM-Detector|MMM-GoogleAssistant|MMM-TelegramBot)
            if [ "${QUIET}" ]
            then
              git clone --branch rpmdev https://github.com/doctorfree/${module}.git > /dev/null 2>&1
            else
              git clone --branch rpmdev https://github.com/doctorfree/${module}.git
            fi
            ;;
          MMM-GoogleMapsTraffic)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/vicmora/MMM-GoogleMapsTraffic.git > /dev/null 2>&1
            else
              git clone https://github.com/vicmora/MMM-GoogleMapsTraffic.git
            fi
            ;;
          MMM-iFrame)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/alberttwong/MMM-iFrame.git > /dev/null 2>&1
            else
              git clone https://github.com/alberttwong/MMM-iFrame.git
            fi
            ;;
          mmm-hue-lights|MMM-InstagramView|MMM-Solar|MMM-stocks|MMM-TelegramCommands|MMM-YouTubeWebView)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/doctorfree/${module}.git > /dev/null 2>&1
            else
              git clone https://github.com/doctorfree/${module}.git
            fi
            ;;
          MMM-IronManGIF)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/2hdlockness/MMM-IronManGIF.git > /dev/null 2>&1
            else
              git clone https://github.com/2hdlockness/MMM-IronManGIF.git
            fi
            ;;
          MMM-MacAddressScan)
            if [ "${QUIET}" ]
            then
              # sudo apt-get -y install arp-scan > /dev/null 2>&1
              git clone https://github.com/doctorfree/MMM-MacAddressScan.git > /dev/null 2>&1
            else
              # sudo apt-get -y install arp-scan
              git clone https://github.com/doctorfree/MMM-MacAddressScan.git
            fi
            ;;
          MMM-MoonPhase)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/NolanKingdon/MMM-MoonPhase > /dev/null 2>&1
            else
              git clone https://github.com/NolanKingdon/MMM-MoonPhase
            fi
            ;;
          MMM-MyScoreboard)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/jclarke0000/MMM-MyScoreboard > /dev/null 2>&1
            else
              git clone https://github.com/jclarke0000/MMM-MyScoreboard
            fi
            ;;
          MMM-pages)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/edward-shen/MMM-pages.git > /dev/null 2>&1
            else
              git clone https://github.com/edward-shen/MMM-pages.git
            fi
            ;;
          MMM-RAIN-RADAR)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/jojoduquartier/MMM-RAIN-RADAR.git > /dev/null 2>&1
            else
              git clone https://github.com/jojoduquartier/MMM-RAIN-RADAR.git
            fi
            ;;
          MMM-Remote-Control)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/Jopyth/MMM-Remote-Control.git > /dev/null 2>&1
            else
              git clone https://github.com/Jopyth/MMM-Remote-Control.git
            fi
            ;;
          MMM-Scenes)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/MMRIZE/MMM-Scenes > /dev/null 2>&1
            else
              git clone https://github.com/MMRIZE/MMM-Scenes
            fi
            ;;
          MMM-Selfieshot)
            if [ "${QUIET}" ]
            then
              # sudo apt-get -y install fswebcam > /dev/null 2>&1
              git clone https://github.com/eouia/MMM-Selfieshot > /dev/null 2>&1
            else
              # sudo apt-get -y install fswebcam
              git clone https://github.com/eouia/MMM-Selfieshot
            fi
            ;;
          MMM-Videoplayer)
            if [ "${QUIET}" ]
            then
              git clone https://github.com/Snille/MMM-Videoplayer.git > /dev/null 2>&1
            else
              git clone https://github.com/Snille/MMM-Videoplayer.git
            fi
            ;;
          *)
              echo "Unsupported module: ${module}"
              echo "See https://github.com/MichMich/MagicMirror/wiki/3rd-Party-Modules"
              exit 0
              ;;
        esac
        cd ${module}
        if [ "${QUIET}" ]
        then
          npm install > /dev/null 2>&1
          # [ "${module}" == "MMM-Solar" ] && npm install request > /dev/null 2>&1
        else
          npm install
          # [ "${module}" == "MMM-Solar" ] && npm install request
        fi
        cd ..
    else
      echo "Cannot locate module ${module}, skipping"
    fi
  fi
done
