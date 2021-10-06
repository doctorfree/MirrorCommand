#!/bin/bash
#
## @file chkinst.sh
## @brief Check if installed files differ from those in current directory
## @author Ronald Joe Record (rr at ronrecord dot com)
## @copyright Copyright (c) 2014, Ronald Joe Record, all rights reserved.
## @date Written 8-Mar-2014
## @version 1.0.1
##
## Note: this script assumes the files in your git repository are named the
##       same as their installed counterparts except for a '.sh' suffix
#
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

## @fn usage()
## @brief Display command line usage options
## @param none
##
## Exit the program after displaying the usage message and example invocations
usage() {
    printf "\nUsage: chkinst [-u] [-a] [-d] [-f] [-i] [-n] [-w wallpaper_dir]"
    printf "\nWhere:"
    printf "\n\t-u displays this usage message"
    printf "\n\t-a indicates report on all files, not just those installed"
    printf "\n\t-d indicates display output of a diff between files"
    printf "\n\t-f indicates force update of installed file(s)"
    printf "\n\t-i indicates prompt for update of installed file(s)"
    printf "\n\t-n indicates tell me what you would copy without doing it"
    printf "\n\t-w dir specifies the installation dir for wallpaper  utils\n"
    exit 1
}

## @fn update()
## @brief Update installed version of file with that in current directory
## @param param1 first argument is file in current directory
## @param param2 second argument is installed version of file
update() {
    printf "\nCopying $1 to $2\n"
    [ "$TELL" ] || sudo cp "$1" "$2"
}

## @fn differ()
## @brief Display diff of specified files and update if needed
## @param param1 first argument is file in current directory
## @param param2 second argument is installed version of file
differ() {
    if [ -f "$2" ]
    then
        echo "$1 differs from installed version $2"
        UPTODATE=
        [ "$DIFF" ] && {
            diff "$1" "$2"
            echo ""
        }
    else
        [ "${FORCE}" ] || {
            echo "No installed version of $1 as $2"
            UPTODATE=
        }
    fi
    [ "$UPD" ] && {
        REFORCE=
        FOUND=
        for cmd in $DIFFER
        do
            [ "$1" = "$cmd" ] && {
                FOUND=1
                break
            }
        done
        [ "$FOUND" ] && {
            UPTODATE=
            echo "Looks like you need to update one of your customized files."
            echo "$1 is on your list of files to prompt before installing."
            [ "$FORCE" ] && {
                FORCE=
                REFORCE=1
            }
        }
        if [ "$FORCE" ]
        then
            update "$1" "$2"
        else
            while true
            do
                read -p "Do you want to install the new version ? (y/n) " yn
                case $yn in
                    [Yy]* ) update "$1" "$2"; break;;
                    [Nn]* ) break;;
                        * ) echo "Please answer yes or no.";;
                esac
            done
            [ "$REFORCE" ] && FORCE=1
        fi
    }
}

## @fn check()
## @brief Checks if two files differ by more than specified number of lines
## @param param1 first argument is file in current directory
## @param param2 second argument is installed version of file
check() {
    if [ -f "$2" ]
    then
        dnum=`diff "$1" "$2" | wc -l`
        [ $dnum -ne $3 ] && differ "$1" "$2"
    else
        differ "$1" "$2"
    fi
}

ALL=
DIFF=
TELL=
UPD=
FORCE=
UPTODATE=1
# List of installed files which differ from those in my git repo due to
# tailoring for my own use. These will not get force installed without first
# prompting you if you really want to.
DIFFER=""

while getopts adfinuw: flag; do
    case $flag in
        a)
            ALL=1
            ;;
        d)
            DIFF=1
            ;;
        i)
            UPD=1
            ;;
        f)
            FORCE=1
            ;;
        n)
            TELL=1
            ;;
        w)
            WDIR="$OPTARG"
            ;;
        u)
            usage
            ;;
    esac
done
shift $(( OPTIND - 1 ))

for i in * bin/* config/* config/*/* css/custom.css
do
    # Skip directories
    [ -d "$i" ] && continue
    # Strip any .sh suffix and Utils, IFTTT, or Wallpapers/ prefix
    k=`echo $i | sed -e "s/\.sh$//" -e "s/Wallpapers\///" -e "s/Utils\///"`
    j=`echo $k | sed -e "s/IFTTT\///"`
    # Scripts can be either commands or startup configuration files in $HOME 
    inst=
    case "$i" in
    #   asoundrc)
    #       inst="$HOME/.$i"
    #       ;;
        bash_aliases|bash_profile|bashrc|dircolors|vimrc)
            if [ -f "$HOME/.$i" ]
            then
                inst="$HOME/.$i"
            else
                inst=
            fi
            ;;
        duplicity_exclude.txt)
            inst="$HOME/$i"
            ;;
        css/custom.css|config/*)
            inst="$HOME/MagicMirror/$i"
            ;;
        crontab*|files_with_secrets.txt|README*|wireless_dot_sample)
            continue
            ;;
        reboot.sh|shutdown.sh)
            inst="/usr/local/bin/$j"
            ;;
        *)
            inst=`type -p "$j"`
            ;;
    esac
    [ "$inst" ] || {
        if [ "${FORCE}" ]
        then
            inst="/usr/local/bin/$j"
        else
            [ "$ALL" ] && {
                echo "$i does not appear to be installed. Skipping."
                echo ""
            }
            continue
        fi
    }
    # Special cases as the installed version may have configuration changes.
    # The 3rd argument to the check() function is the number of lines the
    # installed script can differ before we report it differs. This number
    # will differ from system to system so change it for your purposes. To
    # determine what the number should be, run the command:
    #     diff $i $inst | wc -l
    # where $i is the source file and $inst is the installed version.
    # This functionality is mostly for me, the maintainer and distributor.
    #
    case "$i" in
        bash_aliases)
            check "$i" "$inst" 121
            ;;
        bash_profile)
            check "$i" "$inst" 8
            ;;
        bashrc)
            check "$i" "$inst" 58
            ;;
        chktemp.sh)
            check "$i" "$inst" 12
            ;;
        gethue.sh)
            check "$i" "$inst" 6
            ;;
        getquote.sh)
            check "$i" "$inst" 8
            ;;
        mirror.sh)
            check "$i" "$inst" 4
            ;;
        mmapiactions.sh)
            check "$i" "$inst" 4
            ;;
        mmgetb.sh)
            check "$i" "$inst" 4
            ;;
        mmsetb.sh)
            check "$i" "$inst" 4
            ;;
        send_sms.sh)
            check "$i" "$inst" 12
            ;;
        config/config-all.js)
            check "$i" "$inst" 54
            ;;
        config/config-calendar.js)
            check "$i" "$inst" 28
            ;;
        config/config-coronavirus.js)
            check "$i" "$inst" 24
            ;;
        config/config-default.js)
            check "$i" "$inst" 38
            ;;
        config/config-iframe.js)
            check "$i" "$inst" 44
            ;;
        config/config-normal.js)
            check "$i" "$inst" 42
            ;;
        config/config-rooncontrol.js)
            check "$i" "$inst" 18
            ;;
        config/config-roon.js)
            check "$i" "$inst" 34
            ;;
        config/config-server.js)
            check "$i" "$inst" 48
            ;;
        config/config-stocks.js)
            check "$i" "$inst" 26
            ;;
        config/config-test.js)
            check "$i" "$inst" 4
            ;;
        config/config-traffic.js)
            check "$i" "$inst" 24
            ;;
        config/config-volumio.js)
            check "$i" "$inst" 16
            ;;
        config/config-weather.js)
            check "$i" "$inst" 28
            ;;
        config/config-youtube.js)
            check "$i" "$inst" 14
            ;;
        config/config.js.sample)
            cmp -s "$i" "$inst" || differ "$i" "$inst"
            ;;
        config/*)
            check "$i" "$inst" 20
            ;;
        IFTTT/ifttt.sh)
            check "$i" "$inst" 4
            ;;
        Wallpapers/wh.sh)
            check "$i" "$inst" 8
            ;;
        Wallpapers/wb.sh)
            check "$i" "$inst" 8
            ;;
        mkreadme.sh|mkwmv.sh)
            check "$i" "$inst" 12
            ;;
        *)
            cmp -s "$i" "$inst" || differ "$i" "$inst"
            ;;
    esac
done

[ "$UPTODATE" ] && echo "It looks like your system is up to date!"
