---
title: VOL
section: 1
header: User Manual
footer: vol 2.6
date: December 07, 2021
---
# NAME
**vol** - control the MagicMirror volume level

# SYNOPSIS
**vol** [ **-c** cardnumber ] [ **-mqrsu** ] [ **- | + | N** ]
: Where N is a whole number percentage between 0 and 100, inclusive.

# DESCRIPTION
The *vol* command gets, sets, saves, and restores the MagicMirror volume level

# COMMAND LINE OPTIONS
**-u**
: display usage message

**-m**
: toggles volume mute/unmute

**-q**
: indicates quiet mode, do not output messages

**-r**
: indicates restore saved volume setting

**-s**
: indicates save current volume setting in /home/pi/.mirror_volume

**+/-**
: increase/decrease the volume setting by 3%

# EXAMPLES
**vol**
: Outputs the current volume as a number between 0 and 100

**vol +**
: Turn up the volume by $ADJ percent

**vol -**
: Turn down the volume by $ADJ percent

**vol 85**
: Set the volume to 85%

**vol -c 2 ...**
: Get/Set volume on card number 2

**vol -q**
: Quiet mode

**vol -m**
: Mute/Unmute volume

**vol -r**
: Restore volume to previous level setting

**vol -s**
: Save current volume setting

# AUTHORS
Written by Ronald Record &lt;github@ronrecord.com&gt;

# LICENSING
VOL is distributed under an Open Source license.
See the file LICENSE in the VOL source distribution
for information on terms &amp; conditions for accessing and
otherwise using VOL and for a DISCLAIMER OF ALL WARRANTIES.

# BUGS
Submit bug reports online at: &lt;https://gitlab.com/doctorfree/MirrorCommandLine/issues&gt;

# SEE ALSO
**mirror**(1)

Full documentation and sources at: &lt;https://gitlab.com/doctorfree/MirrorCommandLine&gt;

