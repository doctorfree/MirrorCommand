---
title: WEBSNAP
section: 1
header: User Manual
footer: websnap 2.6
date: December 07, 2021
---
# NAME
**websnap** - Take a photo with the camera attached to a MagicMirror

# SYNOPSIS
**websnap** [**options**] filename [[**options**] filename ... ]

# DESCRIPTION
The *websnap* command can be used to take a photo with a webcam or other camera
attached to the system. This provides a command line interface to the action of the
camera allowing a greater degree of flexibility in automated control of the camera

# COMMAND LINE OPTIONS
**-u**
: Display usage message

**-N**
: Tell me what you would do and exit

**-q**
: Hides all messages except for errors

**-v**
: Displays extra messages while capturing

**-i number/name**
: Selects the input to use

**-p name**
: Selects the palette format to use

**-d number**
: Sets the pre-capture delay time (seconds)

**-r size**
: Sets the capture resolution

**-R framerate**
: Sets the capture frame rate

**-n number**
: Sets the number of frames to capture

**-s number**
: Sets the number of frames to skip

# EXAMPLES
**websnap -r 1024x768**
: Take a picture with the webcam with width=1024 and height=768
Most modern webcams will support at least the following resolutions:
	1920x1080, 1280x720, 1024x768, 800x600,
	640x480, 640x360, 320x240, 320x180, 160x120
Execute 'v4l2-ctl --list-formats-ext' to find supported resolutions

# AUTHORS
Written by Ronald Record &lt;github@ronrecord.com&gt;

# LICENSING
WEBSNAP is distributed under an Open Source license.
See the file LICENSE in the WEBSNAP source distribution
for information on terms &amp; conditions for accessing and
otherwise using WEBSNAP and for a DISCLAIMER OF ALL WARRANTIES.

# BUGS
Submit bug reports online at: &lt;https://gitlab.com/doctorfree/MirrorCommandLine/issues&gt;

# SEE ALSO
Full documentation and sources at: &lt;https://gitlab.com/doctorfree/MirrorCommandLine&gt;

