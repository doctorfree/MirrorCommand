---
title: SET_ASOUND_CONF
section: 1
header: User Manual
footer: set_asound_conf 2.6
date: December 07, 2021
---
# NAME
**set_asound_conf** - Set/get the ALSA sound configuration

# SYNOPSIS
**set_asound_conf** [-c] [-e] [-l] [-n] [-o outfile] [-q] [-r] [-t template] [-u]

# DESCRIPTION
The *set_asound_conf* command can be used to interactively set the ALSA sound configuration in */etc/asound.conf* at the command line.

# COMMAND LINE OPTIONS
**-u**
: Display usage message

**-c**
: Indicates perform a check and notify if update needed

**-e**
: Indicates perform an update of */etc/asound.conf*

**-l**
: Indicates list audio input/output configured devices

**-n**
: Indicates non-interactive execution (guess at settings)

**-o outfile**
: 'outfile' specifies an alternate output file for generated asound.conf

**-q**
: Indicates quiet execution

**-r**
: Indicates restore original */etc/asound.conf*

**-t template**
: 'template' specifies an alternate *asound.conf* template to use

Default generated output is the file */etc/asound.conf*

Default asound.conf template can be found in:

	*/usr/local/MirrorCommand/etc/asound.conf.tmpl*

# EXAMPLES
**set_asound_conf -c -q**
: Quietly check the */etc/asound.conf* configuration and exit with status

**set_asound_conf -e**
: Display an interactive menu to allow selection of audio input and output
devices and update the */etc/asound.conf* configuration

# AUTHORS
Written by Ronald Record &lt;github@ronrecord.com&gt;

# LICENSING
SET_ASOUND_CONF is distributed under an Open Source license.
See the file LICENSE in the SET_ASOUND_CONF source distribution
for information on terms &amp; conditions for accessing and
otherwise using SET_ASOUND_CONF and for a DISCLAIMER OF ALL WARRANTIES.

# BUGS
Submit bug reports online at: &lt;https://gitlab.com/doctorfree/MirrorCommand/issues&gt;

# SEE ALSO
Full documentation and sources at: &lt;https://gitlab.com/doctorfree/MirrorCommand&gt;

