---
title: MIRROR
section: 1
header: User Manual
footer: mirror 2.6
date: December 06, 2021
---
# NAME
**mirror** - MagicMirror command line administration and management

# SYNOPSIS
**mirror** [ **command** args ] [ **configfile** ]

Where *command &lt;args&gt;* includes:

- info &lt;temp|mem|disk|usb|net|wireless|screen&gt;
- list &lt;active|installed|configs&gt;
- rotate &lt;right|left|normal|inverted&gt;
- scene &lt;next|prev|info|name|number&gt;
- screen &lt;on|off|info|status|number&gt;
- stop|start|restart|mute|unmute|screenshot|reboot|shutdown
- playvideo|pausevideo|nextvideo|replayvideo|hidevideo|showvideo
- vol &lt;percent&gt;mute|unmute|save|restore|get
- dev | getb | setb &lt;num&gt; | select | status &lt;all&gt; | youtube
- artists_dir, models_dir, photogs_dir
- ac|ar &lt;artist&gt; jc|jr &lt;idol&gt; mc|mr &lt;model&gt; pc|pr &lt;photographer&gt; wh|whrm &lt;dir&gt;

See COMMAND LINE OPTIONS below for a full list of command line arguments

Specify a MagicMirror config file to use by executing a command of the form:
: **mirror configfile**

Where *configfile* represents a MagicMirror config filename
of the form *MagicMirror/config/config-configfile.js*

Any config file you have created in /home/pi/MagicMirror/config of the form:
: config-&lt;name&gt;js

can be used as the MagicMirror config file by issuing the command:
: **mirror name**

A config filename argument, *arg*, will be resolved into a config filename of the form:
: config-arg.js

A subdirectory in which to locate the config file can be specified as the second
argument, e.g. *mirror foo bar* will attempt to use the config file *bar/config-foo.js*

The mirror command will attempt to match the specified config file name. For example,
*mirror foo* would match the config file named *config-foodie.js*

# DESCRIPTION
The [MirrorCommandLine](https://gitlab.com/doctorfree/MirrorCommandLine)
project provides scripts to enable command line control of a
[MagicMirror](https://magicmirror.builders/) system over a local network.

The *mirror* command is the primary MirrorCommandLine interface and acts
as a front-end for the command line management tools.

Multiple MagicMirror config files can be maintained and activated using
the *mirror* command. In this way the MagicMirror administrator can easily
and quickly switch between MagicMirror configurations. In addition, *mirror*
can perform some system administration tasks which are frequently needed by
the MagicMirror system administrator. 

Currently the command line MagicMirror control scripts include support for:

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
- Control the MagicMirror audio output volume level
- Get MagicMirror status
- Auto generation of new MagicMirror configuration files
- Interactive mode via menu dialogs
    - Invoked with no arguments the mirror command displays a command menu.

# COMMAND LINE OPTIONS
**-u**
: display usage message

**artists_dir**
: displays an interactive menu of available Artist config files to select from

**-a artist | ac artist**
: creates a MagicMirror config file for the specified *artist* name and populates an image folder for that artist if no previous folder by that name exists

**-A artist | ar artist**
: removes the MagicMirror config file for the specified *artist* name and deletes the image folder for that artist

**jav_idols**
: displays an interactive menu of available JAV model config files to select from

**-j jav | jc jav**
: creates a MagicMirror config file for the specified *JAV model* name and populates an image folder for that JAV model if no previous folder by that name exists

**-J jav | jr jav**
: removes the MagicMirror config file for the specified *JAV model* name and deletes the image folder for that JAV model

**models_dir**
: displays an interactive menu of available Model config files to select from

**-m model | mc model**
: creates a MagicMirror config file for the specified *model* name and populates an image folder for that model if no previous folder by that name exists

**-M model | mr model**
: removes the MagicMirror config file for the specified *model* name and deletes the image folder for that model

**photogs_dir**
: displays an interactive menu of available Photographer config files to select from

**-p photographer | pc photographer**
: creates a MagicMirror config file for the specified *photographer* name and populates an image folder for that photographer if no previous folder by that name exists

**-P photographer | pr photographer**
: removes the MagicMirror config file for the specified *photographer* name and deletes the image folder for that photographer

**-w tagname | whrm tagname**
: creates a MagicMirror config file for the specified *Wallhaven tag* name and populates an image folder for that Wallhaven tag if no previous folder by that name exists

**-W tagname | wh tagname**
: removes the MagicMirror config file for the specified *Wallhaven tag* name and deletes the image folder for that Wallhaven tag

**-X number**
: Sets the default screen to use for MagicMirror display and moves an existing MagicMirror window to that screen number

**youtube**
: displays an interactive menu of available YouTube config files to select from

**-b brightness | setb brightness**
: sets the brightness level of the MagicMirror screen, *brightness* is an integer between 0 and 200

**-B | getb**
: gets the brightness level of the MagicMirror screen

**select**
: displays an interactive menu of available config files to select from

**-c name | name**
: validates the specified MagicMirror config file, if valid sets the active config file to *config/config-name.js* and restarts MagicMirror

**-d**
: start MagicMirror in developer/debug mode

**-i comp | info comp**
: get system information on *comp* where *comp* can be all|temp|mem|disk|usb|net|wireless|screen

**-I**
: get system information on all componentes

**-l comp | list comp**
: lists the specified component *comp* which can be one of active|installed|configs to list active modules, installed modules, or available configs

**-r direction | rotate direction**
: rotate screen where *direction* can be one of 'left', 'right', 'inverted', or 'normal'

**-s power | screen power**
: control screen power where *power* can be one of 'on', 'off', 'status', or 'info'

**-S**
: get screen info

**-v volume | mute | unmute | vol volume**
: set mirror audio volume level where *volume* can be one of 'mute', 'unmute', 'save', 'restore', 'get', or an integer representing the percentage of full volume desired

**-Z | screenshot**
: take a screenshot of the MagicMirror display and save the image in ~/Pictures/ScreenShots/

**videoplayback**
: displays an interactive menu of video playback controls 

**-V | videopause | videoplay | pausevideo | playvideo**
: toggle video play

**-R | replayvideo | videoreplay**
: replay video

**-H | hidevideo | videohide**
: Hide video

**-h | showvideo | videoshow**
: Show video

**-N | nextvideo | videonext**
: Next video

**next scene | nextscene | scenenext**
: display next configured MMM-Scenes module scene

**prev scene | prevscene | sceneprev**
: display previous configured MMM-Scenes module scene

**scene control**
: controls configured active MMM-Scenes module scenes where *control* can be one of 'next', 'prev', 'info', or a scene name to activate. If no *control* is specified then the next scene is displayed

**dev**
: restart MagicMirror in developer/debug mode

**reboot**
: reboot MagicMirror

**shutdown**
: shutdown MagicMirror

**restart**
: restart MagicMirror

**start**
: start MagicMirror

**stop**
: stop MagicMirror

**status**
: reports status of MagicMirror and active config

# EXAMPLES

**mirror**
: Invoked with no arguments the mirror command displays a command menu

**mirror list active**
: lists active modules

**mirror list configs**
: lists available configuration files

**mirror restart**
: Restart MagicMirror

**mirror fractals**
: Installs configuration file config-fractals.js and restarts MagicMirror

**mirror info**
: Displays all MagicMirror system information

**mirror info screen**
: Displays MagicMirror screen information

**mirror dev**
: Restarts the mirror in developer mode

**mirror rotate left/right/normal/inverted**
: rotates the screen left, right, inverted, or normal

**mirror screen 2**
:  Move the MagicMirror window to the secondary monitor

**mirror screen on**
:  Turns the Display ON

**mirror screen off**
: Turns the Display OFF

**mirror screenshot**
: Takes a screenshot of the MagicMirror

**mirror status [all]**
: Displays MagicMirror status, checks config syntax

**mirror getb**
: Displays current MagicMirror brightness level

**mirror setb 150**
: Sets MagicMirror brightness level to 150

**mirror vol 50**
: Sets MagicMirror volume level to 50

**mirror wh foobar**
: Creates and activates a slideshow config with pics in foobar

**mirror whrm foobar**
: Deactivate and remove slideshow in foobar

# AUTHORS
Written by Ronald Record &lt;github@ronrecord.com&gt;

# LICENSING
MIRROR is distributed under an Open Source license.
See the file LICENSE in the MIRROR source distribution
for information on terms &amp; conditions for accessing and
otherwise using MIRROR and for a DISCLAIMER OF ALL WARRANTIES.

# BUGS
Submit bug reports online at: &lt;https://gitlab.com/doctorfree/MirrorCommandLine/issues&gt;

# SEE ALSO
Full documentation and sources at: &lt;https://gitlab.com/doctorfree/MirrorCommandLine&gt;

