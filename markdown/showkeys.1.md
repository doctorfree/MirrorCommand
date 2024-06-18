---
title: SHOWKEYS
section: 1
header: User Manual
footer: showkeys 2.6
date: December 07, 2021
---
# NAME
**showkeys** - update MirrorCommand config file templates with keys configured in
*/usr/local/MirrorCommand/etc/mirrorkeys*

# SYNOPSIS
**showkeys** [options]
: The *showkeys* command is invoked with no arguments or a **-q** option to indicate quiet execution

# DESCRIPTION
The *showkeys* command reads the keys configured in 
*/usr/local/MirrorCommand/etc/mirrorkeys* and modifies all MagicMirror config
file templates in */usr/local/MagicMirror* replacing key templates with values
from the *mirrorkeys* key configuration file.

# COMMAND LINE OPTIONS
**-q**
: Indicates quiet execution mode

# AUTHORS
Written by Ronald Record &lt;github@ronrecord.com&gt;

# LICENSING
SHOWKEYS is distributed under an Open Source license.
See the file LICENSE in the SHOWKEYS source distribution
for information on terms &amp; conditions for accessing and
otherwise using SHOWKEYS and for a DISCLAIMER OF ALL WARRANTIES.

# BUGS
Submit bug reports online at: &lt;https://github.com/doctorfree/MirrorCommand/issues&gt;

# SEE ALSO
**mirrorkeys**(5)

Full documentation and sources at: &lt;https://github.com/doctorfree/MirrorCommand&gt;

