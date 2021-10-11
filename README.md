# MirrorCommandLine
MagicMirror is an open source modular smart mirror platform
(see https://magicmirror.builders/). This repository maintains an extensive
set of scripts to initialize, configure, monitor, and manage a MagicMirror.

## Table of contents

1. [Overview](#overview)
1. [History](#history)
1. [Installation](#installation)
1. [Remote Access](#remote-access)
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
- Display of various system info
    - Temperature
	- Memory
	- Disk
	- Usb
	- Network
	- Wireless
	- Screen
- List active/installed MagicMirror modules
- List available MagicMirror configuration files
- Rotate the MagicMirror screen
- Get or set the brightness level
- Control MagicMirror video playback
    - Start/Stop video play
	- Replay video
	- Play next video
	- Hide video playback module
	- Show video playback module
- Get MagicMirror status
- Auto generation of new MagicMirror configuration files
- Interactive mode via menu dialogs
    - Invoked with no arguments the mirror command displays a command menu.

## History

This project began as an attempt to control my MagicMirror with Siri voice
commands. I was able to get Siri voice control of a MagicMirror working with
simple SSH shortcuts that execute Bash scripts on my mirror's Raspberry Pi.
Apple’s SSH shortcuts are a powerful tool for command line control. They can
be used to execute commands on systems that allow SSH access and they can
be configured to activate via voice commands. SSH shortcuts enable voice
control of anything that can be done at the command line.

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

Clone the MirrorCommandLine repository:

<code>git clone ssh://gitlab.com/doctorfree/MirrorCommandLine.git</code>

or

<code>git clone `https://gitlab.com/doctorfree/MirrorCommandLine.git`</code>

Edit the main MagicMirror management script, [**mirror**](mirror.sh), setting
the location of your MagicMirror installation, the IP address of your
MagicMirror, port for your MMM-Remote-Control module, MMM-Remote-Control API
Key, and configuration subdirectories.

Defaults for these are:

- MM="${HOME}/MagicMirror"
- IP="10.0.1.85"
- PORT="8080"
- apikey="MMM-Remote-Control_API_Key"
- CONF_SUBDIRS="Artists JAV Models Photographers"

If you have not configured an API key for MagicMirror remote control then
set the apikey to blank ( <code>apikey=</code> ).

After configuring the mirror.sh script appropriately, copy it to a location in
your execution path on the MagicMirror system. For example:

<code>sudo cp mirror.sh /usr/local/bin/mirror</code>

Ensure the mirror script is executable:

<code>sudo chmod 755 /usr/local/bin/mirror</code>

If you wish to execute mirror commands remotely then install the convenience
script [**mm**](mm.sh) on a system with SSH access to your MagicMirror. This
script can be used to remotely execute the main mirror script.

There are several supporting scripts that can be installed to enhance command
line capabilites. These are optional and may be ignored or installed later.
Some of the more useful supporting scripts include:

- [**backgrounds**](backgrounds.sh)
  Manipulate desktop wallpapers
- [**camsnap**](camsnap.sh)
  Snap a photo with your MagicMirror webcam
- [**chkconfig**](chkconfig.sh)
  Check your MagicMirror configuration files
- [**chkinst**](chkinst.sh)
  Check your Mirror Command Line installation
- [**chktemp**](chktemp.sh)
  Check your MagicMirror Raspberry Pi temperature
- [**get_temps**](get_temps.sh)
  Get your MagicMirror Raspberry Pi temperature
- [**gethue**](gethue.sh)
  Get your Hue Hub properties
- [**getquote**](getquote.sh)
  Get a stock symbol quote
- [**mmapiactions**](mmapiactions.sh)
  Get the MMM-Remote-Control API actions
- [**mmgetb**](mmgetb.sh)
  Get the MagicMirror screen brightness level
- [**mmsetb**](mmsetb.sh)
  Set the MagicMirror screen brightness level
- [**pcmanslideshow**](pcmanslideshow.sh)
  Display a slide show on your desktop using pcmanfm
- [**rand_back**](rand_back.sh)
  Select a random desktop wallpaper
- [**reboot**](reboot.sh)
  Perform additional actions before reboot, executed as a normal user using sudo
- [**rmlandscape**](rmlandscape.sh)
  Remove photos in a folder that are in landscape mode
- [**sdbackup**](sdbackup.sh)
  Backup an SD card
- [**sderase**](sderase.sh)
  Erase an SD card
- [**sdrestore**](sdrestore.sh)
  Restore an SD card from a previous backup
- [**sdwrite**](sdwrite.sh)
  Write an image to an SD card
- [**shutdown**](shutdown.sh)
  Perform additional actions before shutdown, executed as a normal user using sudo
- [**vncview**](vncview.sh)
  Remote script to start a VNC server on your MagicMirror and a VNC viewer on your desktop
- [**vol**](vol.sh)
  Script to control volume level of MagicMirror audio output
- [**wireless_conf**](wireless_conf.sh)
  Configure wireless using WPA Supplicant
- [**wireless_dot_sample**](wireless_dot_sample)
  Sample $HOME/.wireless to assist in wireless configuration

Many sample MagicMirror configuration files are provided in the [**config**](config)
subdirectory. Copy those of interest to your MagicMirror/config folder and modify
as needed.

My custom.css is provided in the css subdirectory. Copy and modify as needed.

## Remote Access

In order to remotely access the MagicMirror command line it is necessary to
setup SSH and associated SSH keys. That configuration is outside the scope
of this document. There are a number of guides on configuring SSH access on
a variety of systems. To get started with SSH configuration on a Raspberry Pi,
see https://www.raspberrypi.org/documentation/computers/remote-access.html

Once SSH access is configured, the [**mm**](mm.sh) script can be installed on
remote systems and used to remotely execute the mirror script on the system
hosting MagicMirror. All arguments provided to <code>mm</code> are simply
passed along to the <code>mirror</code> script.

Alternately, the <code>mirror</code> script can be executed directly by a
user logging in to the MagicMirror system in a Shell environment (e.g. a
terminal window). This can be accomplished remotely in a terminal window
on the remote system by executing the ssh command. For example, using iTerm2
on a Mac OS X system, execute the command:

<code>ssh -l pi IP_ADDRESS</code>

where IP_ADDRESS is the IP address of the MagicMirror system. Once logged into
the MagicMirror system, the <code>mirror</code> command can be executed at a
shell command prompt:
<pre>
pi@raspberrypi:~ $ mirror
</pre>

## Usage

The "mirror" shell script is installed on any system that you want to utilize
for command line control of your MagicMirror. Remote execution of the "mirror"
command line script may be accomplished by using the "mm" convenience script on
a remote system with SSH access to your MagicMirror.

Here is the current output of "mirror -u" which displays a usage message.

<pre>
Usage: mirror [command] [args]
Where [command] can be one of the following:
	info [temp|mem|disk|usb|net|wireless|screen], list [active|installed|configs],
	rotate [right|left|normal], artists_dir, models_dir, photogs_dir, select, restart,
	screen [on|off|info|status], playvideo, pausevideo, nextvideo, hidevideo, showvideo,
	replayvideo, start, stop, status [all], dev, getb, setb [num], ac [artist],
	ar [artist], jc [idol], jr [idol], mc [model], mr [model], pc [photographer],
	pr [photographer], wh [dir], whrm [dir]

or specify a config file to use with one of:
	 all Artists blank calendar coronavirus covidmap crypto default face
	 fractals gif iframe instagram JAV Models Models_Photogs nature news
	 normal nuts owls Photographers Playboy portal rooncontrol roon sample
	 screencast server smoke stocks tantra test traffic tuigirl videotest
	 volumio water weather youtube

or any other config file you have created in /home/pi/MagicMirror/config of the form:
	config-[name].js

A config filename argument will be resolved into a config filename of the form:
	config-$argument.js

Arguments can also be specified as follows:
	-a [artist], -A [artist], -b [brightness], -B, -c [config], -d, -i [info],
	-V, -N, -R (toggle video play, play next video, replay video),
	-H, -h (hide video, show video),
	-I, -l [list], -r [rotate], -s [screen], -S, -m [model], -M [model],
	-p [photographer], -P [photographer], -w [dir], -W [dir], -u

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
</pre>

## Contents

- [**backgrounds**](backgrounds.sh)
  Manipulate desktop wallpapers
- [**bin**](bin)
  Simple convenience scripts, mostly to manage my image folders
- [**camsnap**](camsnap.sh)
  Snap a photo with your MagicMirror webcam
- [**chkconfig**](chkconfig.sh)
  Validate active/installed MagicMirror configuration file syntax
- [**chkinst**](chkinst.sh)
  Check if currently installed MagicMirror scripts are up to date
- [**chktemp**](chktemp.sh)
  Check and report the Raspberry Pi temperature
- [**get_temps**](get_temps.sh)
  Get your MagicMirror Raspberry Pi temperature
- [**gethue**](gethue.sh)
  Get your Hue Hub properties
- [**getquote**](getquote.sh)
  Get a stock symbol quote
- [**mirror**](mirror.sh)
  Main MagicMirror management script
- [**mmapiactions**](mmapiactions.sh)
  Get the MMM-Remote-Control API actions
- [**mmgetb**](mmgetb.sh)
  Get the MagicMirror screen brightness level
- [**mmsetb**](mmsetb.sh)
  Set the MagicMirror screen brightness level
- [**mm**](mm.sh)
  Convenience script to remotely execute the main mirror script
- [**pcmanslideshow**](pcmanslideshow.sh)
  Display a slide show on your desktop using pcmanfm
- [**rand_back**](rand_back.sh)
  Select a random desktop wallpaper
- [**reboot**](reboot.sh)
  Perform additional actions before reboot, executed as a normal user using sudo
- [**rmlandscape**](rmlandscape.sh)
  Remove photos in a folder that are in landscape mode
- [**sdbackup**](sdbackup.sh)
  Backup an SD card
- [**sderase**](sderase.sh)
  Erase an SD card
- [**sdrestore**](sdrestore.sh)
  Restore an SD card from a previous backup
- [**sdwrite**](sdwrite.sh)
  Write an image to an SD card
- [**shutdown**](shutdown.sh)
  Perform additional actions before shutdown, executed as a normal user using sudo
- [**vncview**](vncview.sh)
  Remote script to start a VNC server on your MagicMirror and a VNC viewer on your desktop
- [**vol**](vol.sh)
  Script to control volume level of MagicMirror audio output
- [**wireless_conf**](wireless_conf.sh)
  Configure wireless using WPA Supplicant
- [**wireless_dot_sample**](wireless_dot_sample)
  Sample $HOME/.wireless to assist in wireless configuration
