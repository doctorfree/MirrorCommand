Name: MirrorCommand
Version:    %{_version}
Release:    %{_release}
Summary:    MirrorCommand MagicMirror Command Tools
License:    MIT
BuildArch:  noarch
Requires:   systemd-devel, libudev-devel, blas-devel, file-libs, git, arp-scan, sox, sox-devel, scrot, wget, wmctrl, autoconf, automake, binutils, bison, flex, gcc, gcc-c++, gdb, glibc-devel, libtool, make, pkgconf, strace, byacc, ccache, cscope, ctags, elfutils, indent, ltrace, perf, valgrind, xrandr, xdpyinfo, xset, jq, fswebcam
Recommends: qterminal
URL:        https://github.com/doctorfree/MirrorCommand
Vendor:     Doctorwhen's Bodacious Laboratory
Packager:   ronaldrecord@gmail.com

%global __os_install_post %{nil}

%description
Manage your MagicMirror from the command line

%prep

%build

%install
cp -a %{_sourcedir}/usr %{buildroot}/usr

%pre
exec 1>/proc/${PPID}/fd/1
exec 2>/proc/${PPID}/fd/2
export PATH=/usr/local/bin:$PATH
MMHOME="/home/pi/MagicMirror"
USER=
GROUP=
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
[ "${MMHOME}" ] || {
    echo ""
    echo "Unable to locate a MagicMirror installation on this system."
    echo "MagicMirror is required in order to install MirrorCommand."
    echo ""
    for user in /home/*
    do
        [ "${user}" == "/home/*" ] && continue
        [ -d ${user} ] && {
            USER=`basename ${user}`
            break
        }
    done
    [ "${USER}" ] || {
        echo "No MagicMirror user found or selected. Using root."
        USER="root"
    }
    [ -d /usr/local ] || mkdir /usr/local
    cd /usr/local
    if type -p npm > /dev/null
    then
      inst_npm=1
    else
      inst_npm=
    fi
    [ "${inst_npm}" ] || {
        echo "Installing npm in /usr/local/..."
        curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o /tmp/n
        bash /tmp/n lts
        npm install -g n
    }
    git clone https://github.com/MagicMirrorOrg/MagicMirror > /dev/null
    GROUP=`id -g -n ${USER}`
    chown -R ${USER}:${GROUP} MagicMirror
    cd MagicMirror
    MMHOME="/usr/local/MagicMirror"
    if type -p npm > /dev/null
    then
      inst_npm=1
    else
      inst_npm=
    fi
    if [ "${inst_npm}" ]
    then
        echo "Installing MagicMirror in /usr/local/MagicMirror"
        rm -f package-lock.json
        sudo -u ${USER} npm run install-mm > /dev/null 2>&1
    else
        echo "Unable to locate npm in the execution path."
        echo "Install npm and run the MagicMirror installation"
        echo "by executing the commands:"
        echo ""
        echo "cd /usr/local/MagicMirror"
        echo "sudo -u ${USER} npm run install-mm"
        echo "sudo -u ${USER} npm install electron@29.1.6"
        echo ""
    fi
}
echo "MirrorCommand pre-installation configuration complete"

%post
exec 1>/proc/${PPID}/fd/1
exec 2>/proc/${PPID}/fd/2
export PATH=/usr/local/bin:$PATH
export DISPLAY=${DISPLAY:=:0}
# Scripts for which links will be made in /usr/local/bin
EXPORTS="audiotest camsnap chkconfig chktemp gethue getquote \
    screensaveroff get_temps mirror mknewartist mknewjav mknewmodel \
    mknewphotographer mknewplayboy mknewtop mm mmapiactions mmgetb \
    mmscene mmscreen mmsetb mmupdall module_update module_update_all play \
    rand_back send_sms set_asound_conf showkeys updallartists updallcountries \
    updalljav updallmodels updallphotographers updalltop updarpscan updartist \
    updlinks updcountry updjav updmodel updphotographer updtop updoffsets \
    updcsswidth updwidth vncview vol websnap wireless_conf zerologs"
LOCAL="myreboot myshutdown remountusb"
MM="/usr/local/MirrorCommand"
KEYS="${MM}/etc/mirrorkeys"

[ -d /usr/local ] || mkdir /usr/local
[ -d /usr/local/bin ] || mkdir /usr/local/bin
cd /usr/local/bin
[ -f ${MM}/etc/mirror_start.sh ] && {
  [ -f mirror_start ] || ln -s ${MM}/etc/mirror_start.sh mirror_start
}

if type -p vcgencmd > /dev/null
then
  inst_vcgencmd=1
else
  inst_vcgencmd=
fi
[ "${inst_vcgencmd}" ] || {
  [ -f vcgencmd ] || ln -s ${MM}/bin/vcgencmd vcgencmd
}

for command in ${EXPORTS}
do
  [ -f ${MM}/bin/${command} ] && {
    [ -f ${command} ] || ln -s ${MM}/bin/${command} .
  }
done
for command in ${LOCAL}
do
  [ -f ${MM}/bin/${command} ] && {
    [ -f /usr/bin/${command} ] || {
      cp ${MM}/bin/${command} /usr/bin/${command}
      chmod 755 /usr/bin/${command}
    }
    [ -f ${command} ] || ln -s /usr/bin/${command} .
  }
done
MMHOME=/home/pi/MagicMirror
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
if [ "${MMHOME}" ]
then
    [ -x ${MM}/etc/set_mirror_screens ] && ${MM}/etc/set_mirror_screens -q
    MSI="${MMHOME}/.mirrorscreen"
    MSO="${MM}/etc/mirrorscreen"
    [ -f ${MSI} ] && {
      rm -f ${MSO}
      ln -s ${MSI} ${MSO}
      . ${MSI}
      screen=SCREEN_${MM_SCREEN}[mode]
      [ ${!screen+_} ] && {
        PORTRAIT=${!screen}
      }
    }
    USER=$(stat -c '%U' ${MMHOME}/config)
    GROUP=$(stat -c '%G' ${MMHOME}/config)
    chown -R ${USER}:${GROUP} ${MM}
    cat ${MM}/bin/mirror | sed -e "s,__MagicMirror_Home__,${MMHOME}," > /tmp/mmhome$$
    cp /tmp/mmhome$$ ${MM}/bin/mirror
    rm -f /tmp/mmhome$$
    for remote in vncview mm
    do
      cat ${MM}/bin/${remote} | sed -e "s,__MagicMirror_User__,${USER}," > /tmp/${remote}$$
      cp /tmp/${remote}$$ ${MM}/bin/${remote}
      rm -f /tmp/${remote}$$
    done

    # Copy in the config files to the MagicMirror home
    for cfg in config config-landscape config-notelegram config-landscape-notelegram
    do
      [ -d "${MMHOME}/${cfg}" ] || {
        sudo -u ${USER} mkdir "${MMHOME}/${cfg}"
      }
      cd "${MMHOME}/${cfg}"
      for config in ${MM}/${cfg}/*
      do
        [ "${config}" == "${MM}/${cfg}/*" ] && continue
        b=`basename ${config}`
        [ -d ${config} ] && {
          [ -d $b ] || sudo -u ${USER} mkdir $b
          cd $b
          for subconf in ${config}/*
          do
            [ "${subconf}" == "${config}/*" ] && continue
            c=`basename ${subconf}`
            [ -f $c ] || sudo -u ${USER} cp ${subconf} .
          done
          cd ..
          continue
        }
        [ -f $b ] || sudo -u ${USER} cp ${config} .
      done
    done

    # Copy in the css files to the MagicMirror home
    [ -d "${MMHOME}/css" ] && {
      cd "${MMHOME}/css"
      for css in ${MM}/css/*
      do
        [ "${css}" == "${MM}/css/*" ] && continue
        b=`basename ${css}`
        if [ "$b" == "custom.css" ]
        then
            if [ -f $b ]
            then
                [ -f custom-mirrorcommand.css ] || {
                    sudo -u ${USER} cp ${css} custom-mirrorcommand.css
                }
            else
                sudo -u ${USER} cp ${css} .
            fi
        else
            [ -f $b ] || [ -d $b ] || sudo -u ${USER} cp ${css} .
        fi
      done
    }

    # Fixup those config files that have hard coded screen dimensions
    printf "\nSetting up MagicMirror config files ..."
    [ -x ${MM}/bin/set_screen_conf ] && {
      cd "${MMHOME}/config"
      ${MM}/bin/set_screen_conf
      cd "${MMHOME}/config-notelegram"
      ${MM}/bin/set_screen_conf
      cd "${MMHOME}/config-landscape"
      ${MM}/bin/set_screen_conf
      cd "${MMHOME}/config-landscape-notelegram"
      ${MM}/bin/set_screen_conf
      cd "${MMHOME}/css"
      ${MM}/bin/set_screen_conf
    }
    # Fixup those config files that have hard coded Roon Core IP and Port
    [ -x ${MM}/bin/set_roon_conf ] && {
      cd "${MMHOME}/config"
      ${MM}/bin/set_roon_conf
      cd "${MMHOME}/config-notelegram"
      ${MM}/bin/set_roon_conf
      cd "${MMHOME}/config-landscape"
      ${MM}/bin/set_roon_conf
      cd "${MMHOME}/config-landscape-notelegram"
      ${MM}/bin/set_roon_conf
    }
    # Fixup the ARP Scan devices used by MMM-MacAddressScan module
    if type -p arp-scan > /dev/null
    then
      inst_arpscan=1
    else
      inst_arpscan=
    fi
    [ "${inst_arpscan}" ] && {
      [ -x ${MM}/bin/arps2mm ] && {
        ${MM}/bin/arps2mm > ${MM}/etc/arp-devices.js
        chown ${USER}:${GROUP} ${MM}/etc/arp-devices.js
      }
      MMUP=`dirname ${MMHOME}`
      MCL="${MMUP}/src/MirrorCommand"
      [ -d ${MCL} ] || {
        MCL=
        for homedir in /usr/local /home/*
        do
          [ "${homedir}" == "/home/*" ] && continue
          [ -d ${homedir}/src/MirrorCommand ] && {
            MCL="${homedir}/src/MirrorCommand"
            break
          }
        done
      }
      [ -f ${MCL}/etc/arp-devices.js ] && {
        [ -f ${MM}/etc/arp-devices.js ] && {
          cp ${MM}/etc/arp-devices.js ${MM}/etc/arp-devices-inst.js
        }
        cp ${MCL}/etc/arp-devices.js ${MM}/etc/arp-devices.js
        for arpdev in ${MCL}/etc/arp-devices-*.js
        do
          [ "${arpdev}" == "${MCL}/etc/arp-devices-*.js" ] && continue
          custarp=`basename ${arpdev}`
          cp ${arpdev} ${MM}/etc/${custarp}
        done
        chown ${USER}:${GROUP} ${MM}/etc/*arp-devices*.js
      }
      [ -x ${MM}/bin/arpscanconf ] && {
        cd "${MMHOME}/config"
        ${MM}/bin/arpscanconf
        cd "${MMHOME}/config-notelegram"
        ${MM}/bin/arpscanconf
        cd "${MMHOME}/config-landscape"
        ${MM}/bin/arpscanconf
        cd "${MMHOME}/config-landscape-notelegram"
        ${MM}/bin/arpscanconf
      }
    }

    # Copy default keyless config
    cd "${MMHOME}/config"
    rm -f config.js
    if [ -f config-nokeys.js ]
    then
        sudo -u ${USER} ln -s config-nokeys.js config.js
    else
        sudo -u ${USER} cp config.js.sample config.js
    fi
    printf " Done\n"

    # If MagicMirror is installed in /usr/local then create links in
    # users' home directories to provide compatibility with modules that
    # assume location of MagicMirror is somewhere like /home/pi/MagicMirror
    [ "${MMHOME}" == "/usr/local/MagicMirror" ] && {
        for userhome in /home/*
        do
            [ "${userhome}" == "/home/*" ] && continue
            [ -d "${userhome}" ] && {
                [ -d "${userhome}"/MagicMirror ] || {
                    cd "${userhome}"
                    ln -s ${MMHOME} MagicMirror
                }
            }
        done
    }
    # Install MagicMirror 3rd Party modules used by MirrorCommand
    [ -d "${MMHOME}/modules" ] && cd "${MMHOME}/modules"
    MODULES="internet-monitor MMM-BackgroundSlideshow MMM-CoinMarketCap \
             MMM-COVID19-SPARKLINE MMM-OpenWeatherForecast \
             EXT-Detector MMM-GoogleAssistant MMM-GoogleMapsTraffic \
             mmm-hue-lights MMM-iFrame MMM-InstagramView EXT-Alert \
             MMM-IronManGIF MMM-MacAddressScan MMM-MyScoreboard \
             EXT-GooglePhotos MMM-pages MMM-RAIN-RADAR MMM-Remote-Control \
             MMM-Scenes MMM-Selfieshot MMM-MoonPhase MMM-Solar \
             MMM-stocks MMM-TelegramBot MMM-TelegramCommands \
             MMM-Tools MMM-Videoplayer MMM-YouTubeWebView"
    usermod -a -G audio ${USER}

    for module in ${MODULES}
    do
      [ -d "${MMHOME}/modules/${module}" ] || {
        [ -x "${MM}/bin/module_update" ] && {
          echo "Installing MagicMirror module: ${module}"
          sudo -u ${USER} ${MM}/bin/module_update -n -q -i ${module}
        }
      }
    done

    # Copy any installed MirrorCommand EXT-Detector resources
    # If any resources of the same name already exists, do not overwrite
    RESOURCES_DIR="modules/EXT-Detector/resources"
    [ -d "${MMHOME}/${RESOURCES_DIR}" ] && {
      cd "${MMHOME}/${RESOURCES_DIR}"
      for resource in ${MM}/${RESOURCES_DIR}/*
      do
        [ "${resource}" == "${MM}/${RESOURCES_DIR}/*" ] && continue
        b=`basename ${resource}`
        [ -f $b ] || sudo -u ${USER} cp ${resource} .
      done
    }

    # Copy any installed MirrorCommand Google Assistant recipes
    # If any recipe of the same name already exists, do not overwrite
    RECIPE_DIR="modules/MMM-GoogleAssistant/recipes"
    [ -d "${MMHOME}/${RECIPE_DIR}" ] && {
      cd "${MMHOME}/${RECIPE_DIR}"
      for recipe in ${MM}/${RECIPE_DIR}/*
      do
        [ "${recipe}" == "${MM}/${RECIPE_DIR}/*" ] && continue
        b=`basename ${recipe}`
        if [ -f $b ]
        then
          mcl=`echo $b | sed -e "s/\.js//"`
          [ -f ${mcl}-mcl.js ] || {
            sudo -u ${USER} cp ${recipe} ${mcl}-mcl.js
          }
        else
          sudo -u ${USER} cp ${recipe} .
        fi
      done
    }
    # Create a link in the MMM-Videoplayer module for MirrorCommand movies
    VIDEO_DIR="modules/MMM-Videoplayer"
    [ -d "${MMHOME}/${VIDEO_DIR}" ] && {
      cd "${MMHOME}/${VIDEO_DIR}"
      [ -d movies ] || ln -s ${MM}/movies movies
    }
else
    echo "Unable to locate MagicMirror installation folder."
    echo "MirrorCommand config and css files in ${MM}"
    echo "have not been linked into the MagicMirror installation folder."
    echo "This must be accomplished manually."
fi

MMIP=`hostname -I | awk ' { print $1 } '`
[ "${MMIP}" ] && {
    cat ${KEYS} | sed -e "s/keys\[MMIP\]=/keys\[MMIP\]=\'${MMIP}\'/" > /tmp/keys$$
    cp /tmp/keys$$ ${KEYS}
    rm -f /tmp/keys$$
    ${MM}/bin/showkeys -q
}

# ALSA audio input/ouput configuration
[ -x ${MM}/bin/set_asound_conf ] && ${MM}/bin/set_asound_conf -e -q -n

[ "${MMHOME}" ] && {
    # Setup PM2 if not already configured
    if type -p pm2 > /dev/null
    then
      inst_pm2=1
    else
      inst_pm2=
    fi
    [ "${inst_pm2}" ] || npm install pm2@latest -g > /dev/null 2>&1
    if type -p pm2 > /dev/null
    then
      inst_pm2=1
    else
      inst_pm2=
    fi
    [ "${inst_pm2}" ] && {
        sudo -u ${USER} pm2 list | grep MagicMirror > /dev/null && {
          sudo -u ${USER} pm2 --silent describe MagicMirror && {
            sudo -u ${USER} pm2 --silent delete MagicMirror
          }
        }
        echo "Starting MagicMirror via pm2"
        sudo -u ${USER} pm2 --silent start ${MM}/etc/magicmirror.config.js
        # Tell pm2 to save that configuration, for start at boot
        echo "Saving MagicMirror pm2 configuration"
        sudo -u ${USER} pm2 --silent save
        echo "Stopping MagicMirror via pm2"
        sudo -u ${USER} pm2 --silent stop MagicMirror
        echo "Generating PM2 startup script"
        pm2_startup=`sudo -u ${USER} pm2 startup | tail -n 1`
        # Check to see if we can get the OS package name (Ubuntu)
        # if [ $(which lsb_release| wc -l) >0 ]; then
          # On Ubuntu 18.04, pm2 startup gets something wrong
        #   if [ $(lsb_release  -r | grep -m1 18.04 | wc -l) > 0 ]; then
        #     pm2_startup=$(echo ${pm2_startup} | sed 's/\/bin/\/bin:\/bin/')
        #   fi
        # fi
        ${pm2_startup} > /dev/null 2>&1
    }
}
# Create links to image and movie folders if they exist
MNT_PT="/media/pi/Transcend/Pictures/MagicMirror"
[ -d ${MNT_PT} ] || {
    MNT_PT="/u/pictures/MagicMirror"
    [ -d ${MNT_PT} ] || {
        MNT_PT="/v/pictures/MagicMirror"
        [ -d ${MNT_PT} ] || {
            for picdir in /home/*/Pictures/MagicMirror
            do
                [ "${picdir}" == "/home/*/Pictures/MagicMirror" ] && continue
                [ -d ${picdir} ] && {
                    MNT_PT="${picdir}"
                    break
                }
            done
        }
    }
}
[ -d ${MNT_PT} ] && {
    cd ${MM}
    for orient in landscape portrait
    do
        [ -d ${MNT_PT}/${orient} ] || continue
        [ -d pics-${orient} ] || ln -s ${MNT_PT}/${orient} pics-${orient}
    done
}
[ -L ${MM}/pics ] && rm -f ${MM}/pics
[ -d ${MM}/pics ] || {
  if [ "${PORTRAIT}" ]
  then
    [ -d ${MM}/pics-portrait ] && {
        ln -s ${MM}/pics-portrait ${MM}/pics
    }
  else
    [ -d ${MM}/pics-landscape ] && {
        ln -s ${MM}/pics-landscape ${MM}/pics
    }
  fi
}
MNT_PT="/media/pi/Transcend/Movies/MagicMirror"
[ -d ${MNT_PT} ] || {
    MNT_PT="/u/movies/MagicMirror"
    [ -d ${MNT_PT} ] || {
        MNT_PT="/v/movies/MagicMirror"
        [ -d ${MNT_PT} ] || {
            for movdir in /home/*/Videos/MagicMirror
            do
                [ "${movdir}" == "/home/*/Videos/MagicMirror" ] && continue
                [ -d ${movdir} ] && {
                    MNT_PT="${movdir}"
                    break
                }
            done
        }
    }
}
[ -d ${MNT_PT} ] && {
    cd ${MM}
    [ -d movies ] || ln -s ${MNT_PT} movies
}
chown -R ${USER}:${GROUP} ${MM}
echo "MirrorCommand installation Complete"

%preun
MM="/usr/local/MirrorCommand"
MNTS="myreboot myshutdown remountusb"
[ -d /usr/local/bin ] && {
    cd /usr/local/bin
    rm -f mirror_start vcgencmd
    for command in ${MM}/bin/*
    do
        [ "${command}" == "${MM}/bin/*" ] && continue
        b=`basename ${command}`
        [ -L $b ] && {
            readlink $b | grep ${MM} > /dev/null && rm -f $b
        }
    done
}
for command in ${MNTS}
do
    rm -f /usr/local/bin/${command}
    rm -f /usr/bin/${command}
done
MMHOME=/home/pi/MagicMirror
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
USER=
if [ "${MMHOME}" ]
then
    [ -d "${MMHOME}/config" ] || continue
    USER=$(stat -c '%U' ${MMHOME}/config)
    cd "${MMHOME}/config"
    readlink config.js | grep config- > /dev/null && {
        [ -f config.js.sample ] && {
            rm -f config.js
            cp config.js.sample config.js
            chown ${USER} config.js
        }
    }
    cd "${MMHOME}"
    for config in ${MM}/config/* \
                  ${MM}/config-notelegram/* \
                  ${MM}/config-landscape/* \
                  ${MM}/config-landscape-notelegram/*
    do
      [ "${config}" == "${MM}/config/*" ] && continue
      [ "${config}" == "${MM}/config-notelegram/*" ] && continue
      [ "${config}" == "${MM}/config-landscape/*" ] && continue
      [ "${config}" == "${MM}/config-landscape-notelegram/*" ] && continue
      b=`basename ${config}`
      d=`dirname ${config}`
      e=`basename ${d}`
      if [ -d ${e}/$b ]
      then
          cd ${e}/$b
          for subconf in ${MM}/$e/$b/*
          do
              [ "${subconf}" == "${MM}/$e/$b/*" ] && continue
              c=`basename ${subconf}`
              rm -f $c
          done
          cd "${MMHOME}"
          rmdir --ignore-fail-on-non-empty $e/$b
      else
          rm -f $e/$b
      fi
    done
    rmdir --ignore-fail-on-non-empty ${MMHOME}/config-landscape
    rmdir --ignore-fail-on-non-empty ${MMHOME}/config-notelegram
    rmdir --ignore-fail-on-non-empty ${MMHOME}/config-landscape-notelegram
    [ -d "${MMHOME}/css" ] && {
      cd "${MMHOME}/css"
      for css in ${MM}/css/*
      do
        [ "${css}" == "${MM}/css/*" ] && continue
        b=`basename ${css}`
        [ "$b" == "custom.css" ] || rm -f $b
      done
    }

    RECIPE_DIR="modules/MMM-GoogleAssistant/recipes"
    [ -d "${MMHOME}/${RECIPE_DIR}" ] && {
      cd "${MMHOME}/${RECIPE_DIR}"
      for recipe in ${MM}/${RECIPE_DIR}/*
      do
        [ "${recipe}" == "${MM}/${RECIPE_DIR}/*" ] && continue
        b=`basename ${recipe}`
        c=`echo $b | sed -e "s/\.js//"`
        if [ -f ${c}-mcl.js ]
        then
            rm -f ${c}-mcl.js
        else
            rm -f $b
        fi
      done
    }
    VIDEO_DIR="modules/MMM-Videoplayer"
    [ -d "${MMHOME}/${VIDEO_DIR}" ] && {
      cd "${MMHOME}/${VIDEO_DIR}"
      [ -L movies ] && rm -f movies
    }
else
    echo "Unable to locate MagicMirror installation folder."
    echo "MirrorCommand config and css files in ${MM}"
    echo "have not been unlinked in the MagicMirror installation folder."
    echo "This must be accomplished manually."
fi

[ -L ${MM}/movies ] && rm -f ${MM}/movies
[ -L ${MM}/pics ] && rm -f ${MM}/pics
[ -L ${MM}/pics-landscape ] && rm -f ${MM}/pics-landscape
[ -L ${MM}/pics-portrait ] && rm -f ${MM}/pics-portrait
rm -f ${MM}/etc/*arp-devices*.js
rm -f ${MM}/etc/mirrorscreen
rm -f ${MMHOME}/.mirrorscreen*
[ "${USER}" ] && {
  sudo -u ${USER} pm2 list | grep MagicMirror > /dev/null && {
    sudo -u ${USER} pm2 --silent describe MagicMirror && {
      sudo -u ${USER} pm2 --silent delete MagicMirror
      sudo -u ${USER} pm2 --silent save
    }
  }
}
# Delete MagicMirror symlinks in home dirs if we put them there
[ "${MMHOME}" == "/usr/local/MagicMirror" ] && {
  for userhome in /home/*
  do
    [ "${userhome}" == "/home/*" ] && continue
    MMUSER="${userhome}/MagicMirror"
    [ -L "${MMUSER}" ] && {
      readlink "${MMUSER}" | grep ${MMHOME} > /dev/null && {
        rm -f "${MMUSER}"
      }
    }
  done
}

%files
/usr
%exclude %dir /usr/local/share/man/man5
%exclude %dir /usr/local/share/man/man1
%exclude %dir /usr/local/share/man
%exclude %dir /usr/local/share/applications

%changelog
