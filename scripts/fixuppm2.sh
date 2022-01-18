#!/bin/bash
#
# Written by Sam Detweiler
# Copied from https://github.com/sdetweil/MagicMirror_scripts
#
# Define the tested version of Node.js.
NODE_TESTED="v10.1.0"
NPM_TESTED="V6.0.0"
USER=`whoami`
PM2_FILE=pm2_MagicMirror.json
mac=$(uname -s)
if [ $mac == 'Darwin' ]; then
	cmd=greadlink
else
	cmd=readlink
fi

# because of how its executed from the web, p0 gets overlayed with parm
# check to see if a parm was passed .. easy apply without  editing
p0=$0
# if not 'bash', and some parm specified
if [ $0 != 'bash' -a "$1." != "." ]; then
	# then executed locally
	# get the parm
	p0=$1
fi
# lowercase it.. watch out, mac stuff doesn't work  with tr, etc
p0=$(echo $p0  | cut -c 1-5 |  awk '{print tolower($0)}' )


if [ -d ~/MagicMirror ]; then
	# put the log where the script is located
	logdir=$(dirname $($cmd -f "$0"))
	# if the script was execute from the web
	if [[ $logdir != *"MagicMirror/installers"* ]]; then
		# use the MagicMirror/installers folder
		cd ~/MagicMirror/installers >/dev/null
		logdir=$(pwd)
		cd - >/dev/null
	fi
	logfile=$logdir/pm2_setup.log
	echo the log will be saved in $logfile
	date +"pm2 setup starting - %a %b %e %H:%M:%S %Z %Y" >>$logfile
		if [ "$p0." != "." ]; then
			echo using parameter  $p0 >>$logfile
		fi
		echo system is $(uname -a) >> $logfile
		if [ "$mac"  == "Darwin" ]; then
		  echo the os is macOS $(sw_vers -productVersion) >> $logfile
		else
            have_lsb=`type -p lsb_release`
            if [ "${have_lsb}" ]
            then
			  echo the os is $(lsb_release -a 2>/dev/null) >> $logfile
            else
              if [ -f /etc/os-release ]
			  then
			    OS_NAME=`grep NAME= /etc/os-release | sed -e "s/NAME=//"`
			    OS_VERS=`grep VERSION= /etc/os-release | sed -e "s/VERSION=//"`
			    echo the os is ${OS_NAME} ${OS_VERS} >> $logfile
			  else
			    echo the os is $(uname -a 2>/dev/null) >> $logfile
			  fi
            fi
		fi
		node_installed=$(which node)
		if [ "$node_installed." == "." ]; then
			 # node not installed
			echo Installing node >>$logfile
			if [ $mac == 'Darwin' ]; then
				brew install node
			else
				NODE_STABLE_BRANCH="10.x"
				curl -sL https://deb.nodesource.com/setup_$NODE_STABLE_BRANCH | sudo -E bash -
				sudo apt-get install -y nodejs
			fi
		fi
		node_version=$(node -v)
		echo node version $node_version >>$logfile
		npm_installed=$(which npm)
		if [ "$npm_installed." == "." ]; then
			 # npm not installed
			echo Installing npm >>$logfile
			if [ $mac != 'Darwin' ]; then
				sudo apt-get install -y npm
			fi
		fi
		# get latest
		echo force installing latest npm version via npm >>$logfile
		#sudo npm i -g npm
		npm_version=$(npm -v)
		echo npm version $npm_version >>$logfile
		# assume pm2 will be found on the path
		pm2cmd=pm2
		up=""
		label="name"
		if [ $mac == 'Darwin' ]; then
			 label="App Name"
			 up="--unsafe-perm"
			 launchctl=launchctl
			 launchctl_path=$(which $launchctl)
			 `export PATH=$PATH:${launchctl_path%/$launchctl}`
		fi
		# check to see if already installed
		pm2_installed=$(which $pm2cmd)
		if [  "$pm2_installed." != "." ]; then
		    # does it work?
				echo pm2 installed >> $logfile
				pm2_fails=$(pm2 list | grep -i -m 1 $label | wc -l )
				if [ $pm2_fails != 1 ]; then
				   # uninstall it
					 echo pm2 installed, but does not work, uninstalling >> $logfile
				   sudo npm uninstall $up -g pm2
					 # force reinstall
			     pm2_installed=
				fi
		fi
		# in not installed
		if [  "$pm2_installed." == "." ]; then
			# install it.
			echo pm2 not installed, installing >>$logfile
			result=$(sudo npm install $up -g pm2)
			# if this is a mac
			if [ $mac == 'Darwin' ]; then
				echo this is a mac, fixup for path >>$logfile
				# get the location of pm2 install
				# parse the npm install output to get the command
				pm2cmd=`echo $result | awk -F -  '{print $1}' | tr -d '[:space:]'`
				c='/pm2'
				# get the path only
				echo ${pm2cmd%$c} >installers/pm2path
			fi
		fi
    	if [ "$p0" != "noset" ]; then
    		# remove MagicMirror if defined
			$pm2cmd delete MagicMirror >/dev/null 2>&1
		fi
		cd ~/MagicMirror
		echo get the pm2 platform specific startup command >>$logfile
		# get the platform specific pm2 startup command
		v=$($pm2cmd startup | tail -n 1)
		if [ $mac != 'Darwin' ]; then
			# check to see if we can get the OS package name (Ubuntu)
			fix_startup=
            have_lsb=`type -p lsb_release`
            if [ "${have_lsb}" ]
            then
                if [ $(which lsb_release| wc -l) >0 ]; then
                    # On Ubuntu 18.04, pm2 startup gets something wrong
                    if [ $(lsb_release  -r | grep -m1 18.04 | wc -l) > 0 ]; then
                      fix_startup=1
                    fi
                fi
            else
                [ -f /etc/os-release ] && {
                    grep 'ID=ubuntu' /etc/os-release > /dev/null && {
                      grep VERSION= /etc/os-release | grep 18.04 > /dev/null && {
                        fix_startup=1
                      }
                    }
                }
            fi
			[ "${fix_startup}" ] && v=$(echo $v | sed 's/\/bin/\/bin:\/bin/')
		fi
		echo startup command = $v >>$logfile
		# execute the command returned
	    $v 2>&1 >>$logfile
		echo pm2 startup command done >>$logfile
		# is this is mac
		# need to fix pm2 startup, only on catalina
		if [ $mac == 'Darwin' ]; then
			if [ $(sw_vers -productVersion | head -c 6) == '10.15.' ]; then
				# only do if the faulty tag is present (pm2 may fix this, before the script is fixed)
				if [ $(grep -m 1 UserName /Users/$USER/Library/LaunchAgents/pm2.$USER.plist | wc -l) -eq 1 ]; then
					# copy the pm2 startup file config
					cp  /Users/$USER/Library/LaunchAgents/pm2.$USER.plist .
					# edit out the UserName key/value strings
					sed -e '/UserName/{N;d;}' pm2.$USER.plist > pm2.$USER.plist.new
					# copy the file back
					sudo cp pm2.$USER.plist.new /Users/$USER/Library/LaunchAgents/pm2.$USER.plist
				fi
			fi
		fi
		if [ "$p0" != "noset" ]; then
			# if the user is no pi, we have to fixup the pm2 json file
			echo configure the pm2 config file for MagicMirror >>$logfile
			# if the files we need aren't here, get them
			if [ ! -e installers/pm2_MagicMirror.json ]; then
				curl -sL https://raw.githubusercontent.com/sdetweil/MagicMirror_scripts/master/pm2_MagicMirror.json >installers/pm2_MagicMirror.json
				curl -sl https://raw.githubusercontent.com/sdetweil/MagicMirror_scripts/master/mm.sh >installers/mm.sh
				chmod +x installers/mm.sh
			fi
			if [ "$USER"  != "pi" ]; then
				echo the user is not pi >>$logfile
				# go to the installers folder`
				cd installers
				# edit the startup script for the right user
				echo change mm.sh >>$logfile
				 if [ ! -e mm_temp.sh ]; then
				   echo save copy of mm.sh >> $logfile
				   cp mm.sh mm_temp.sh
				 fi
				 if [ $(grep pi mm_temp.sh | wc -l) -gt 0 ]; then
				  echo change hard coded pi username  >> $logfile
					sed 's/pi/'$USER'/g' mm_temp.sh >mm.sh
				 else
				  echo change relative home path to hard coded path >> $logfile
				  hf=$(echo $HOME |sed 's/\//\\\//g')
				  sed 's/\~/'$hf'/g' mm_temp.sh >mm.sh
				 fi
				# edit the pms config file for the right user
				echo change $PM2_FILE >>$logfile
				sed 's/pi/'$USER'/g' $PM2_FILE > pm2_MagicMirror_new.json
				# make sure to use the updated file
				PM2_FILE=pm2_MagicMirror_new.json
				# if this is a mac
				if [ $mac == 'Darwin' ]; then
					 # copy the path file to the system paths list
					 sudo cp ./pm2path /etc/paths.d
					 # change the name of the home path for mac
					 sed 's/home/Users/g' $PM2_FILE > pm2_MagicMirror_new1.json
					 # make sure to use the updated file
					 PM2_FILE=pm2_MagicMirror_new1.json
				fi
				echo now using this config file $PM2_FILE >>$logfile
				# go back one cd level
				cd - >/dev/null
			fi
			echo start MagicMirror via pm2 now >>$logfile
			# tell pm2 to start the app defined in the config file
			$pm2cmd start $HOME/MagicMirror/installers/$PM2_FILE
			# tell pm2 to save that configuration, for start at boot
			echo save MagicMirror pm2 config now  >>$logfile
			$pm2cmd save
		fi
		date +"pm2 setup completed - %a %b %e %H:%M:%S %Z %Y" >>$logfile
else
	echo It appears MagicMirror has not been installed on this system
	echo please run the installer, "raspberry.sh" first
fi
