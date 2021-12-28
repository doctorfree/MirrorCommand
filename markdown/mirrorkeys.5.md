---
title: MIRRORKEYS
section: 1
header: User Manual
footer: mirrorkeys 2.6
date: December 07, 2021
---
# NAME
**mirrorkeys** - configuration file for MirrorCommand keys

# INTRODUCTION
MagicMirror modules often utilize services that require registration and
generation of private keys to enable access to the service. These keys are
used in MagicMirror configuration files in the modules' settings to allow
MagicMirror to securely access these services over the Internet. The creation
and maintenance of these multiple configuration settings can be tedious and
unreliable as these keys can be scattered over many files and locations within
files. The *mirrorkeys* configuration file gathers all keys used by MagicMirror
and MirrorCommand into a single location along with an extensible format
to allow for the addition of new keys and removal of old.

# DESCRIPTION
The */usr/local/MirrorCommand/etc/mirrorkeys* configuration file contains
two associative arrays, *keys* and *dumb*. Each service has an arbitrary
unique identifying string that serves as an array key. For example, the
array entries for the MagicMirror IP address use the string identifier *MMIP*
as the array key. Each service has an entry in the *keys* array and a
corresponding entry in the *dumb* array. The *dumb* array holds key/pair
values that denote the 'dummy' value of that key. These values serve as
templates in the MagicMirror configuration files. For example, the *dumb*
array entry for the MagicMirror IP address using the string identifier *MMIP*
is the string *MM.M.M.MM*:

    dumb[MMIP]='MM.M.M.MM'

The *keys* array holds the private key values and other settings used in the
MagicMirror and MirrorCommand configuration files. For example, if the
IP address of the MagicMirror system were *10.0.1.85* then the *keys*
array entry for the MagicMirror IP address using the string identifier *MMIP*
would be the string *10.0.1.85*:

    keys[MMIP]='10.0.1.85'

The MirrorCommand package initializes a *mirrorkeys* configuration file
with over 40 preconfigured 'dummy' values and several 'keys' values detected
during installation. It is the job of the MagicMirror system administrator to
update the *mirrorkeys* file with values for service keys used by activated
MagicMirror modules. For example, if the MagicMirror is configured with the
default *weather* module then an OpenWeather application ID will be required
to utilize the OpenWeather service. After acquiring an OpenWeather application
ID from https://openweathermap.org add it to the *mirrorkeys* configuration
file in the *keys* array for the *LOC* service identifier:

    keys[LOC]="somestringofcharactersthatisyourappid"

After adding all the keys and configuration values used by MagicMirror and
MirrorCommand to the *mirrorkeys* file, execute the *showkeys* command.
The *showkeys* command reads the *mirrorkeys* configuration file and, for
every key value that is set in the *keys* array, edits the MagicMirror
configuration files replacing the dummy values specified in the *dumb*
array with the corresponding *keys* array entry. If the *keys* array
entry for a service is empty then no change is made for that key.

# AUTHORS
Written by Ronald Record &lt;github@ronrecord.com&gt;

# LICENSING
MIRRORKEYS is distributed under an Open Source license.
See the file LICENSE in the MIRRORKEYS source distribution
for information on terms &amp; conditions for accessing and
otherwise using MIRRORKEYS and for a DISCLAIMER OF ALL WARRANTIES.

# BUGS
Submit bug reports online at: &lt;https://gitlab.com/doctorfree/MirrorCommand/issues&gt;

# SEE ALSO
**showkeys**(1)

Full documentation and sources at: &lt;https://gitlab.com/doctorfree/MirrorCommand&gt;

