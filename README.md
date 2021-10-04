# MirrorCommandLine
Scripts to manage my MagicMirror (see https://magicmirror.builders/)

## Table of contents

1. [Overview](#overview)
1. [History](#history)
1. [Installation](#installation)
1. [Usage](#usage)
1. [Contents](#contents)

## Overview

The Mirror Command Line project provides scripts to enable
command line control of the MagicMirror system over a local network.

A frontend Bash script, "mirror", can be installed on your MagicMirror to issue
MagicMirror commands. Currently the command line MagicMirror control scripts
include support for:
- Specifying the MagicMirror configuration file to activate
- Starting, stopping, and restarting the MagicMirror
- Display of various system info (temp, mem, disk, usb, net, wireless, screen)
- List active/installed MagicMirror modules
- List available MagicMirror configuration files
- Rotate the MagicMirror screen
- Get or set the brightness level
- Get MagicMirror status
- Auto generation of new MagicMirror configuration files

## History

This project began as an attempt to control my MagicMirror with Siri voice
commands. I was able to get Siri voice control of a MagicMirror working with
simple SSH shortcuts that execute Bash scripts on my mirror's Raspberry Pi.
People don’t seem to know about Apple’s SSH shortcuts. They can be used to
execute commands on systems that allow SSH access.

I created shortcuts on my iPhone which use the “Run script over SSH”
option for Apple Scripting shortcuts. The shortcuts execute the appropriate
Bash command on my MagicMirror Pi. Once I got the MagicMirror shortcuts working
I then configured Siri to recognize various phrases to run those shortcuts.
In this manner I was able to implement Siri voice control of my MagicMirror.

Over time the project became primarily focused on the command line execution
of these scripts as I found I spend more time in a terminal at the command line
than I do talking to Siri. While voice control is still supported if configured
properly, the project is primarily command line control of MagicMirror.

## Installation

## Usage

The "mirror" shell script is installed on any system that you want to utilize
for command line control of your MagicMirror. Remote execution of the "mirror"
command line script may be accomplished by using the "mm" convenience script on
a remote system with SSH access to your MagicMirror.

Here is the current output of "mirror -u" which displays a usage message.

Usage: mirror <command> [args]
Where <command> can be one of the following:
	info [temp|mem|disk|usb|net|wireless|screen], list <active|installed|configs>, rotate [right|left|normal], artists_dir, models_dir, photogs_dir, select, restart, screen [on|off|info|status], start, stop, status [all], dev, getb, setb <num>, ac <artist>, ar <artist>, jc <idol>, jr <idol>, mc <model>, mr <model>, pc <photographer>, pr <photographer>, wh <dir>, whrm <dir>

or specify a config file to use with one of:
	 all Artists blank calendar coronavirus covidmap crypto default face
	 fractals gif iframe instagram JAV Models Models_Photogs moon nature
	 news normal nuts owls Photographers Playboy portal rooncontrol roon
	 sample screencast server smoke sol stocks test traffic tuigirl
	 volumio water weather youtube

or any other config file you have created in /home/pi/MagicMirror/config of the form:
	config-<name>.js

A config filename argument will be resolved into a config filename of the form:
	config-$argument.js

Arguments can also be specified as follows:
	-a <artist>, -A <artist>, -b <brightness>, -B, -c <config>, -d, -i <info>,
	-I, -l <list>, -r <rotate>, -s <screen>, -S, -m <model>, -M <model>,
	-p <photographer>, -P <photographer>, -w <dir>, -W <dir>, -u

Examples:
	mirror		# Invoked with no arguments the mirror command displays a command menu
	mirror list active		# lists active modules
	mirror list configs		# lists available configuration files
	mirror restart		# Restart MagicMirror
	mirror fractals		# Installs configuration file config-fractals.js and restarts MagicMirror
	mirror info		# Displays all MagicMirror system information
	mirror info screen		# Displays MagicMirror screen information
	mirror dev		# Restarts the mirror in developer mode
	mirror rotate left/right/normal		# rotates the screen left, right, or normal
	mirror screen on		#  Turns the Display ON
	mirror screen off		# Turns the Display OFF
	mirror status [all]		# Displays MagicMirror status, checks config syntax
	mirror getb		# Displays current MagicMirror brightness level
	mirror setb 150		# Sets MagicMirror brightness level to 150
	mirror wh foobar		# Creates and activates a slideshow config with pics in foobar
	mirror whrm foobar		# Deactivate and remove slideshow in foobar
	mirror -u		# Display this usage message

## Contents

[**chkconfig**](chkconfig.sh) - Validate active MagicMirror configuration file syntax

[**chkinst**](chkinst.sh) - Check if currently installed MagicMirror scripts are up to date

[**chktemp**](chktemp.sh) - Check and report the Raspberry Pi temperature

[**crontab-nexmo**](crontab-nexmo.in) - Crontab entries I use

[**mirror**](mirror.sh) - Main MagicMirror management script

[**mmapiactions**](mmapiactions.sh) - deprecated

[**mmgetb**](mmgetb.sh) - Get the MagicMirror brightness level

[**mmsetb**](mmsetb.sh) - Set the MagicMirror brightness level

[**mm**](mm.sh) - Convenience script to remotely execute the main mirror script

[**rand_back**](rand_back.sh) - Set desktop wallpaper with random pic
