# Changelog

All notable changes to this project will be documented in this file.

03 February 2022, MirrorCommand version 3.0.2 release 2:

  This minor release update of MirrorCommand incorporates changes to improve
  integration with the MirrorImages package downloads. In addition, support
  is added for models by country in the MirrorImages downloads and in the
  MirrorCommand default config files. New Google Drive file ids have been
  used in the download scripts to reflect the MirrorImages distribution changes.

29 January 2022, MirrorCommand version 3.0.2 release 1:

  This release update of MirrorCommand incorporates changes to integrate with the
  MirrorImages RPM installations. The scripts that download image archives for the
  [MirrorImages](https://gitlab.com/doctorfree/MirrorImages) packages have been
  updated to execute in non-interactive mode when being run during an RPM installation.

27 January 2022, MirrorCommand version 3.0.1 release 3:

  This minor release update of MirrorCommand fixes a bug in the install
  scripts introduced by recent changes to Bash wrt the return status of
  the 'type' builtin. MMM-stocks module is now pulled from my fork to
  provide dependency on 'request' and security fixes.

22 January 2022, MirrorCommand version 3.0.1 release 2:

  This minor release update of MirrorCommand enhances support for
  RPM based Linux installation and fixes an error introduced into
  the MMM-BackgroundSlideshow module in recent commits. It is
  recommended that all RPM based systems utilize this release
  or later and any systems utilizing the MMM-BackgroundSlideshow
  module delete that module and reinstall with the `module_update`
  command included in this release.

17 January 2022, MirrorCommand version 3.0.1 release 1:

  This minor release update of MirrorCommand introduces support for
  non-interactive RPM installation.

16 January 2022, MirrorCommand version 3.0.0 release 2:

  This minor release update of MirrorCommand introduces support for
  Ubuntu 21.10 along with improved support for npm and nodejs installation.
  Image download utilities were updated to support downloads using the
  MirrorImages version 3.0.0 packages.

12 January 2022, MirrorCommand version 3.0.0 release 1:

  This major release of MirrorCommand introduces support for multiple
  monitors, switching MagicMirror screen display between monitors,
  full support for both portrait and landscape mode displays,
  and renames the project from MirrorCommandLine to MirrorCommand.
  Voice commands for screen switching have been added via the
  MMM-GoogleAssistant module recipe file MirrorCommand.js.

  Changes to packaging include the creation and distribution of an RPM
  format installation package as well as the implementation of release
  creation during the Gitlab continuous integration process.

21 December 2021, MirrorCommandLine version 2.7 release 2:

  This minor release update includes changes to enable automated
  ALSA USB audio device configuration, startup screen rotation for
  both portrait and landscape mode displays, and custom arp scan
  device lists for the MMM-MacAddressScan module.

17 December 2021, MirrorCommandLine version 2.7 release 1:

  This release of MirrorCommandLine primarily introduces support for
  landscape mode displays. All MagicMirror config files use templates
  for their display resolution settings. These and the MagicMirror CSS
  settings are set during installation of the package after detecting
  the display mode.

  Many other improvements are included in this release including fully
  automated installation and configuration. Supported systems are not
  limited to the Raspberry Pi but now include most standard Linux systems.

29 November 2021, MirrorCommandLine version 2.6 release 1:

  In this release the installed directory moved from
  /usr/local/MagicMirror to /usr/local/MirrorCommandLine

20 November 2021, MirrorCommandLine version 2.5:

  This release adds support for those not using PM2 and a shadow set of
  configs for those with no Telegram API key. The Debian packages for all
  the image archives downloads have been moved out into a separate repository
  - MirrorImagesPortrait. Several packaging enhancements including piping all
  downloaded compressed archives to stdout and extracting from that pipe.
  This drastically reduces disk space required to download and extract the
  image archives. The config files have been significantly simplified,
  replacing the complex customCommands sections with the
  MMM-TelegramCommands module.

Thu Feb 3 08:57:49 2022 -0800 97aee5a :
   Fix bug in mkdistarch
Thu Feb 3 08:18:02 2022 -0800 f0dade1 :
   Check for download directory before setting permissions and ownership
Wed Feb 2 15:46:38 2022 -0800 5fb7dd4 :
   Fix mkdistarch create archives at mode level
Wed Feb 2 15:09:29 2022 -0800 12d6f2e :
   Update sizes of image archive downloads
Wed Feb 2 12:45:03 2022 -0800 ba7c33d :
   Models by country images moved into Countries subdirectory
Wed Feb 2 12:16:49 2022 -0800 d008663 :
   Update image download scripts with new file ids, add download script for country models
Tue Feb 1 15:13:58 2022 -0800 bb9f2c2 :
   Add options to mkdistarch, add video archives
Tue Feb 1 10:25:07 2022 -0800 e614a5a :
   Added mkdistarch to create the Gdrive archive downloads
Mon Jan 31 14:54:14 2022 -0800 99d84cb :
   pre-removal script check for folder or plain config file
Mon Jan 31 14:24:36 2022 -0800 1257ef4 :
   Do not skip folders previously created
Mon Jan 31 08:57:41 2022 -0800 fcb0c7e :
   Add configs for models by country, mknew scripts process args replacing spaces with underscores
Sun Jan 30 15:13:42 2022 -0800 75f0f25 :
   Add Colombian config
Sun Jan 30 14:35:31 2022 -0800 0a5661a :
   Fix typo in mknewtop, add model configs for countries
Sun Jan 30 13:58:22 2022 -0800 06e52b8 :
   Add Angelika Wachowska config
Sat Jan 29 15:27:30 2022 -0800 7d7f22a :
   Update changelog and release notes in preparation for v3.0.2r1 release
Sat Jan 29 12:33:22 2022 -0800 4ad4452 :
   Link pics dir if not already set during mirror startup
Sat Jan 29 08:28:36 2022 -0800 7fcbb42 :
   Use pkg/release.md for release description in Gitlab release creation
Fri Jan 28 16:55:05 2022 -0800 e022bf1 :
   Add -i flag to image archive download scripts for non-interactive RPM installs
Thu Jan 27 15:00:05 2022 -0800 86d2a18 :
   Use top folder rather than subfolders for Art and Gif images
Thu Jan 27 10:30:20 2022 -0800 4fbedd5 :
   Updated release note template
Thu Jan 27 10:28:07 2022 -0800 45e63bd :
   Update Changelog and bump release number in preparation for Version 3.0.1 release 3
Tue Jan 25 11:22:18 2022 -0800 4a0d07c :
   Do not symlink image subfolders
Tue Jan 25 11:07:11 2022 -0800 f989664 :
   Redirect type -p checks to /dev/null, install fake vcgencmd
Tue Jan 25 10:40:56 2022 -0800 84ef3a7 :
   Copy in my custom arp devices
Mon Jan 24 17:47:39 2022 -0800 a13b034 :
   Pull MMM-stocks from my fork
Mon Jan 24 16:49:33 2022 -0800 9bd840d :
   Change default media location from /mnt/transcend to /media/pi/Transcend
Mon Jan 24 15:13:30 2022 -0800 48ea48c :
   Wrap type -p command checks in if-then-else to prevent ERR triggering exit with set -e execution
Sat Jan 22 10:30:24 2022 -0800 5ce4b11 :
   Note Debian or RPM where necessary
Sat Jan 22 10:26:03 2022 -0800 711498e :
   Update release notes and README with support and testing on Fedora
Sat Jan 22 10:07:37 2022 -0800 232c4aa :
   Update changelog for Version 3.0.1 release 2
Fri Jan 21 18:55:14 2022 -0800 837d8f7 :
   Checkout pre-sharp commit of MMM-BackgroundSlideshow until this issue is resolved
Fri Jan 21 17:40:48 2022 -0800 1b13765 :
   Fixup myreboot and myshutdown to look in /media/user/* by default
Fri Jan 21 08:41:46 2022 -0800 b9b8b20 :
   Set no dependency install env in module_update rather than package scripts
Fri Jan 21 07:44:04 2022 -0800 f0c603e :
   Add section on rerunning initialization scripts
Thu Jan 20 14:42:15 2022 -0800 70017b0 :
   Added systemd-devel to rpm requires to get libudev support
Thu Jan 20 14:09:10 2022 -0800 c469257 :
   Install/Uninstall scripts handle debian or rpm
Thu Jan 20 10:52:04 2022 -0800 5560981 :
   Try trick with redirecting stderr and stdout to parent process in RPM scriptlets
Thu Jan 20 10:25:04 2022 -0800 15d9afe :
   Pass env in sudo when invoking module_update in postinstall
Wed Jan 19 17:23:12 2022 -0800 ffa20b6 :
   Use env var to disable dependency installs during debian installation
Wed Jan 19 17:20:46 2022 -0800 ace48fd :
   Use env var to disable dependency installs during installation
Wed Jan 19 16:50:52 2022 -0800 e0aaaac :
   Try reducing dependencies in RPM spec
Wed Jan 19 15:30:20 2022 -0800 1be419f :
   Now I'm just flailing, rpm has me by the dependencies
Wed Jan 19 15:12:34 2022 -0800 3170a10 :
   Give up, rpm is stupid, make it an x86_64 package
Wed Jan 19 15:03:41 2022 -0800 e07b4e0 :
   Workaround for noarch package requiring x86_64 package
Wed Jan 19 14:46:53 2022 -0800 54334de :
   Use architecture to identify some package dependencies
Wed Jan 19 14:28:46 2022 -0800 f63b8a6 :
   Use forked repositories for RPM based platform support
Tue Jan 18 17:43:34 2022 -0800 3d4c0d6 :
   Add xrandr, xdpyinfo, and xset as dependencies in RPM spec
Tue Jan 18 17:21:28 2022 -0800 cd9409a :
   Use DISPLAY env var if set
Tue Jan 18 15:10:02 2022 -0800 d432423 :
   Remove RPM requires that are not available
Tue Jan 18 15:01:14 2022 -0800 0b2fb33 :
   Add development tools to RPM requires, add -n switch to module_update to skip dependency check
Tue Jan 18 10:18:17 2022 -0800 b65557c :
   Check OS compatibility with RPM based systems
Mon Jan 17 16:02:40 2022 -0800 498bad3 :
   Fix RPM dependencies
Mon Jan 17 15:47:37 2022 -0800 0731a3e :
   Update changelog and version in preparation for release
Mon Jan 17 15:44:48 2022 -0800 0ff55bb :
   Changes to support non-interactive RPM install
Sun Jan 16 10:24:45 2022 -0800 00476d7 :
   Updated changelog in preparation for version 3.0.0 release 2
Sun Jan 16 09:57:59 2022 -0800 052b69a :
   Move npm from dependency to preinstall script install with n
Sun Jan 16 08:36:15 2022 -0800 ab1c7cb :
   Added new photographer download
Sun Jan 16 08:04:17 2022 -0800 e27fc50 :
   Modify mknew scripts to support both orientations
Sat Jan 15 19:39:04 2022 -0800 a00be0e :
   Create new asound.conf if none exists
Sat Jan 15 19:13:46 2022 -0800 fb7887b :
   Add user to audio group before installing modules
Sat Jan 15 18:43:42 2022 -0800 59b9b03 :
   Add dependencies required by modules
Sat Jan 15 16:04:09 2022 -0800 b6eea4b :
   Use fallback default values for screens if no X display
Sat Jan 15 14:42:14 2022 -0800 476ad66 :
   Add npm dependency
Sat Jan 15 13:29:15 2022 -0800 f52f337 :
   Update Google Drive IDs, add getjav
Wed Jan 12 11:11:13 2022 -0800 a0f9192 :
   Get the RPM file name right
Wed Jan 12 10:04:29 2022 -0800 78e21d4 :
   Fix typo in gitlab ci, sed out noarch from rpm name
Wed Jan 12 09:16:00 2022 -0800 56cf589 :
   Update changelog in prep for version 3.0.0 release 1
Wed Jan 12 09:10:01 2022 -0800 ab8bc46 :
   Create release during CI, distribute zip archive and rpm
Tue Jan 11 14:01:36 2022 -0800 9c6817c :
   Distribute zip format, name compressed tar with tgz suffix
Tue Jan 11 13:57:13 2022 -0800 bdabe35 :
   Rename RPMs if necessary
Tue Jan 11 13:33:46 2022 -0800 90720a8 :
   Copy dist files in install in spec file, do not do post install strip
Fri Jan 7 09:07:59 2022 -0800 c3b88d2 :
   New model config
Fri Jan 7 07:52:18 2022 -0800 51075fe :
   New model config
Thu Jan 6 11:58:09 2022 -0800 5ac56d5 :
   Ignore Vim files
Mon Jan 3 18:43:18 2022 -0800 be23e6d :
   Added config files for new model
Mon Jan 3 18:04:46 2022 -0800 813691f :
   Change repos for MMM-Solar and mmm-hue-lights to get request dependency
Sat Jan 1 09:44:46 2022 -0800 fa2a6eb :
   Added fractals filter
Sat Jan 1 09:01:30 2022 -0800 39d35db :
   Improved screen info
Fri Dec 31 18:17:06 2021 -0800 131f82e :
   More images to filter
Fri Dec 31 10:52:54 2021 -0800 4b9f0c9 :
   Add rmlist-mode for images in wrong mode folder, update rmlist
Fri Dec 31 09:50:07 2021 -0800 c3e6af4 :
   Merge branch 'master' of ssh://gitlab.com/doctorfree/MirrorCommand
Fri Dec 31 09:49:53 2021 -0800 294498d :
   Update rmlist with landscape rejections
Thu Dec 30 18:32:17 2021 -0800 03fc460 :
   Add section for Known Limitations
Thu Dec 30 15:13:13 2021 -0800 d356277 :
   Fix updtop, add updalljav to exports
Thu Dec 30 14:04:59 2021 -0800 4faa5c1 :
   Add updalljav
Thu Dec 30 13:47:33 2021 -0800 04e8f99 :
   Use multiple image folders for water config, do not perform asound check prior to setting asound.conf in postinstall
Thu Dec 30 11:22:02 2021 -0800 4657019 :
   Adjust positions in scenes and scoreboard configs, add Instagram keys to mirrorkeys
Thu Dec 30 09:49:46 2021 -0800 b3be4a1 :
   Check if numscreens is greater than one before setting config screen sizes, check if screen number is already set before changing it
Wed Dec 29 17:14:16 2021 -0800 f4db465 :
   Adjust layout for default in landscape
Wed Dec 29 16:52:18 2021 -0800 dc6b747 :
   Replace MMM-DateOnly with default clock module
Wed Dec 29 15:55:29 2021 -0800 ca9a15c :
   Use digital clock, no IronMan
Wed Dec 29 15:42:08 2021 -0800 7c07cde :
   Replace DateOnly with IronManGIF overlayed clock
Wed Dec 29 15:00:39 2021 -0800 65a9c98 :
   Added comments to help configure mirrorkeys, some services no longer used, added keys for lattitude and longitude
Wed Dec 29 12:21:06 2021 -0800 8967862 :
   Silently exit if no MagicMirror window detected
Wed Dec 29 12:10:21 2021 -0800 7f70bc8 :
   Fixup fake vcgencmd, elaborate on mirrorkeys config in README
Wed Dec 29 09:49:58 2021 -0800 3d369af :
   Add dependencies to RPM spec file
Tue Dec 28 18:23:35 2021 -0800 2ece7a2 :
   Update section on Compatibility to include RPM based systems
Tue Dec 28 18:16:57 2021 -0800 f97fb72 :
   update rmlist
Tue Dec 28 18:02:59 2021 -0800 d7a28ee :
   Determine minimum width and height based on screen orientation
Tue Dec 28 15:47:50 2021 -0800 9c534f1 :
   update get image archive scripts with landscape mode
Tue Dec 28 14:09:17 2021 -0800 14e608d :
   Added sections on getting to the command line, switching screens, and using voice commands
Tue Dec 28 12:40:42 2021 -0800 05fc1c3 :
   Updated README with RPM installation and removal guides
Tue Dec 28 12:04:47 2021 -0800 db4b860 :
   Add rpm to CI artifacts
Tue Dec 28 11:39:20 2021 -0800 cbb5ac5 :
   Initial pass at RPM build
Tue Dec 28 10:54:12 2021 -0800 fe0504f :
   update changelog
Tue Dec 28 10:51:45 2021 -0800 db61919 :
   Pass the right number to mmscreen
Tue Dec 28 10:43:44 2021 -0800 277cdf0 :
   Renamed custom-mirrorcommandline.css to custom-mirrorcommand.css
Tue Dec 28 17:06:05 2021 +0000 b1b6306 :
   Merge branch 'mirrorcommand' into 'master'
Tue Dec 28 08:55:05 2021 -0800 f18d47f :
   Set version to 3.0, release to 1, updated changelog
Tue Dec 28 08:31:24 2021 -0800 f12f7b4 :
   Rename from MirrorCommandLine to MirrorCommand
Tue Dec 28 07:42:54 2021 -0800 5a93305 :
   Added switch screen commands
Tue Dec 28 07:24:13 2021 -0800 7f6b18d :
   Add screen switching voice commands
Tue Dec 28 07:19:12 2021 -0800 259f96f :
   Accept 'one' and 'two' as screen number args
Mon Dec 27 19:14:20 2021 -0800 4066a04 :
   Update scripts to support both orientation folders for images
Mon Dec 27 18:07:20 2021 -0800 5198c21 :
   Create image folder symlinks during installation
Mon Dec 27 17:37:20 2021 -0800 b0401b1 :
   Set images folder link dynamically on startup
Mon Dec 27 17:04:53 2021 -0800 f3d3324 :
   Create links to image and movie folders if detected
Mon Dec 27 16:40:54 2021 -0800 dd17d93 :
   First pass at image scripts support for both orientations, Models only first
Mon Dec 27 14:14:17 2021 -0800 53ca04e :
   All MM configs now use a custom CSS file with custom-mirrorcommandline.css the default
Mon Dec 27 12:19:23 2021 -0800 51e961f :
   Adjust network configs for landscape mode layout
Mon Dec 27 11:31:07 2021 -0800 4a1780a :
   Adjust config-default layout for smaller resolution landscape mode
Mon Dec 27 11:13:33 2021 -0800 619307d :
   Fix typo in updcsswidth
Mon Dec 27 11:06:29 2021 -0800 47b5802 :
   Note about tested screen resolutions and orientation
Mon Dec 27 10:52:10 2021 -0800 78e11b5 :
   Finish off getting rid of css-landscape in favor of combined CSS with dynamic configuration
Mon Dec 27 10:38:12 2021 -0800 499bd36 :
   Combine CSS files and edit CSS settings when switching modes or screen geometry
Mon Dec 27 09:45:40 2021 -0800 5d641c9 :
   Clean up calendars, only user home.ics or holidays in distributed configs
Mon Dec 27 08:50:52 2021 -0800 f80c0da :
   Do not setup asound-conf system service
Sun Dec 26 18:01:47 2021 -0800 bed7d5e :
   Add new man pages to README Documentation section
Sun Dec 26 17:51:17 2021 -0800 b999ea5 :
   New man pages for showkeys, set_asound_conf, mmscreen, and mirrorkeys
Sun Dec 26 14:14:37 2021 -0800 db7fc94 :
   Roon always in fullscreen mode
Sun Dec 26 14:09:01 2021 -0800 1a6e964 :
   Filter window listing by class as well as title
Sun Dec 26 13:34:01 2021 -0800 8d7f570 :
   Switch config.js link if mode switches when screen switches
Sun Dec 26 11:58:36 2021 -0800 d8895de :
   Set portrait or landscape mode when switching screens
Sun Dec 26 11:28:27 2021 -0800 691ac3c :
   Symlink MagicMirror directory in users home directories if globally installed in /usr/local
Sun Dec 26 11:06:57 2021 -0800 08c3576 :
   Always fixup the screen dimension config settings when linking a new config.js
Sun Dec 26 10:48:12 2021 -0800 ed1ad91 :
   Reset MM_SCREEN when switching screens
Sat Dec 25 14:21:01 2021 -0800 a2550fe :
   Stamp out last of the hard coded config dimensions
Sat Dec 25 13:38:56 2021 -0800 a6b8b4b :
   Add all screen dimension markers to dynamically configure to updwidth
Sat Dec 25 13:11:43 2021 -0800 e70cfab :
   Add comment templates to width and height config settings to enable dynamic configuration
Fri Dec 24 19:25:02 2021 -0800 aa3db5b :
   Add updwidth to set width and height config values on installation, startup, and new config.js
Fri Dec 24 17:25:14 2021 -0800 dab4be1 :
   Use mirrorscreen config rather than xrandr to get screen width and height
Fri Dec 24 16:57:24 2021 -0800 2502800 :
   Present a menu for ALSA device selection
Fri Dec 24 13:10:58 2021 -0800 6bc28c1 :
   Create symlink in MMM-Videoplayer for MirrorCommandLine movies
Fri Dec 24 12:17:29 2021 -0800 65dc265 :
   Display /etc/asound.conf if no .asoundrc found
Fri Dec 24 11:35:25 2021 -0800 1ce4aca :
   Add wmctrl to dependencies
Fri Dec 24 10:58:06 2021 -0800 96d2aa7 :
   Cleanup messages when setting mirror screens
Fri Dec 24 09:43:12 2021 -0800 883326d :
   Add option to restore all screens to their default rotation
Fri Dec 24 09:16:02 2021 -0800 53a436e :
   Ignore tests subdir in git
Fri Dec 24 08:35:20 2021 -0800 02fd14c :
   Reset PORTRAIT when switching screens
Fri Dec 24 08:31:08 2021 -0800 bca4a09 :
   Add bin/mmscreen for command control of which screen to use for display
Thu Dec 23 21:47:14 2021 -0800 c26fef9 :
   Let user know when configuring config files during postinst
Thu Dec 23 21:38:03 2021 -0800 a5c0c21 :
   Give local root user window access with xhost rather than everyone
Thu Dec 23 21:35:34 2021 -0800 23f5894 :
   Move setting mirrorscreens to postinst and use etc/set_mirror_screens script
Thu Dec 23 20:52:18 2021 -0800 98e3ecc :
   Config for Alexander Grinn
Thu Dec 23 20:45:11 2021 -0800 b0842d5 :
   Options to mirror script to set screen display number
Thu Dec 23 17:37:19 2021 -0800 5dae5e6 :
   Fix bug in module_update_all
Thu Dec 23 16:42:03 2021 -0800 e06edd8 :
   Set Electron offset options in config files, startup script, and mirror script
Wed Dec 22 17:44:00 2021 -0800 a0329f7 :
   Add MM_SCREEN to mirrorscreen config but not working yet
Wed Dec 22 16:10:24 2021 -0800 8dbad2e :
   First pass at multi-monitor support
Wed Dec 22 06:50:01 2021 -0800 180a281 :
   Updated job number
Tue Dec 21 16:51:29 2021 -0800 4bbee01 :
   Bump release number and update changelog in preparation for new minor release
Tue Dec 21 15:50:41 2021 -0800 d29e948 :
   Fix startup screen rotation for both portrait and landscape mode displays
Tue Dec 21 15:32:06 2021 -0800 63213ea :
   Fix mirror_start finding mirrorscreen setting
Mon Dec 20 18:14:23 2021 -0800 e78d008 :
   Add section on ALSA configuration and system service
Mon Dec 20 17:58:25 2021 -0800 30134db :
   Create and install asound-conf service to update ALSA /etc/asound.conf during boot
Mon Dec 20 16:24:57 2021 -0800 000f3d3 :
   Use MMM-IronManGIF repo instead of my fork
Mon Dec 20 16:00:38 2021 -0800 71cc0de :
   Add options to set_asound_conf and invoke with update and quiet options in postinst
Sun Dec 19 19:58:02 2021 -0800 687a23a :
   Use existing mirrorscreen rather than prompt and update
Sun Dec 19 19:47:17 2021 -0800 0babd89 :
   Fix set_asound_conf if no existing config found, debug preinst
Sun Dec 19 18:50:20 2021 -0800 b47515a :
   Set audio input/output ALSA configuration in postinst
Sun Dec 19 13:23:27 2021 -0800 dbfd375 :
   Rename custom arp devices files
Sun Dec 19 13:08:11 2021 -0800 ba3cb8e :
   Remove mirrorscreen and arp-devices in prerm
Sun Dec 19 13:05:12 2021 -0800 ef7cbed :
   Check for columns setting to determine arp devices to use
Sun Dec 19 12:37:31 2021 -0800 f8ae97d :
   Copy in custom arp devices during installation if found
Sun Dec 19 11:38:21 2021 -0800 71272e6 :
   Use etc/mirrorscreen to hold display mode configuration
Sun Dec 19 09:27:38 2021 -0800 1f1ff72 :
   Fix detection of screen rotation with xrandr in startup and special configs
Sat Dec 18 17:53:03 2021 -0800 eaf1d0e :
   Do not use myGooglePhotos recipe yet, it's still in development
Sat Dec 18 11:22:46 2021 -0800 db064a7 :
   Set arp-scan version dependency so it will be met on Raspbian Buster or later
Sat Dec 18 09:53:03 2021 -0800 4f4ff95 :
   Added scripts for creation of JAV pic folders and config files, revised create functions in mirror script
Fri Dec 17 08:50:28 2021 -0800 5609e3d :
   Stamping out the last of the hard coded Hue Hub IP addresses
Fri Dec 17 08:20:33 2021 -0800 d4deef2 :
   Simplify US Holidays default calendar module config
Fri Dec 17 08:09:14 2021 -0800 1b0fcd7 :
   Restore sample config on removal of package
Fri Dec 17 07:58:39 2021 -0800 cb963f7 :
   Fix typo in screen size setting for half height
Thu Dec 16 18:14:38 2021 -0800 c40b2a4 :
   Set widths and heights in config files dynamically during installation
Thu Dec 16 17:28:25 2021 -0800 26ba392 :
   Set ownership on created files during installation
Thu Dec 16 17:17:52 2021 -0800 76b93cf :
   Fix sed in set_roon_conf, set DISPLAY in postinst, xhost + in Install
Thu Dec 16 16:56:58 2021 -0800 a944992 :
   delete calendars
Thu Dec 16 16:50:19 2021 -0800 281819c :
   Use templates for width and height in all config subdirs
Thu Dec 16 16:45:25 2021 -0800 e4b2bd1 :
   Set screen size settings in config files and css during postinst
Thu Dec 16 09:16:45 2021 -0800 f490f91 :
   Add markers for half screen size, add landscape config for traffic
Wed Dec 15 20:50:02 2021 -0800 a189c78 :
   Add MMM-MoonPhase and weather config in landscape mode
Wed Dec 15 19:35:50 2021 -0800 ea3629c :
   Landscape mode YouTube config
Wed Dec 15 19:17:26 2021 -0800 cc46798 :
   Use width and height templates in background config
Wed Dec 15 19:11:39 2021 -0800 412c3d2 :
   Revise candy config to use templates for width and height, sed the installed screen resolution in config files during installation
Wed Dec 15 17:52:59 2021 -0800 1f6eb68 :
   Added landscape mode config for calendar
Wed Dec 15 15:29:16 2021 -0800 a289884 :
   Converted Roon config for landscape mode, add multiple Hue keys to key management
Wed Dec 15 13:25:13 2021 -0800 b745cd5 :
   Fixup MMM-MacAddressScan devices entry in default configs
Wed Dec 15 13:03:44 2021 -0800 467eda0 :
   Add Hue Hub IP to key management
Wed Dec 15 12:01:38 2021 -0800 437cb9f :
   Add installation of MMM-Detector resources
Wed Dec 15 11:15:58 2021 -0800 cd1dc6b :
   Only unmount disks if they are mounted
Wed Dec 15 10:48:17 2021 -0800 856e193 :
   Add audiotest script
Tue Dec 14 19:52:57 2021 -0800 aec8afc :
   Add new config dirs to key management scripts
Tue Dec 14 19:07:46 2021 -0800 a8f18bb :
   Add config directories for landscape mode, start with config-default.js
Tue Dec 14 12:12:52 2021 -0800 2a0efb1 :
   Limit rotation in landscape mode for now
Tue Dec 14 08:55:56 2021 -0800 3349a6a :
   Set mirror user in remote scripts
Mon Dec 13 23:20:41 2021 -0800 33be2fe :
   Retry typedir
Mon Dec 13 23:06:05 2021 -0800 719ce88 :
   Add -l option to mknew scripts
Mon Dec 13 22:56:43 2021 -0800 e7a28ee :
   Un-ignore rmlist.txt
Mon Dec 13 22:44:42 2021 -0800 fa3e0c5 :
   Move rmlist.txt to install folder
Mon Dec 13 21:49:04 2021 -0800 a714376 :
   Comment out vcgencmd linking for now as it fails
Mon Dec 13 21:00:36 2021 -0800 a1cb059 :
   Remove all arp-devices files in etc in prerm
Mon Dec 13 20:56:33 2021 -0800 8611e31 :
   Add -l option to update pics scripts for landscape mode support
Mon Dec 13 19:06:08 2021 -0800 5c9d3ce :
   Use xrandr for monitor power if no vcgencmd
Mon Dec 13 18:38:52 2021 -0800 d6cc33b :
   Add vcgencmd compatibility script
Mon Dec 13 18:10:08 2021 -0800 4c4d43e :
   Check for pics dir in mykeys
Mon Dec 13 18:04:40 2021 -0800 a91060b :
   Remove config-notelegram directory in prerm
Mon Dec 13 17:59:25 2021 -0800 254aa98 :
   Empty devices array in remaining MMM-MacAddressScan config files
Mon Dec 13 17:41:02 2021 -0800 7ec5698 :
   Make the installation prompts clear
Mon Dec 13 17:38:00 2021 -0800 b0fbb48 :
   Remove configs in config-notelegram during prerm
Mon Dec 13 17:12:50 2021 -0800 897c90a :
   Fix pm2 startup config, move mirror_start to etc/mirror_start.sh
Mon Dec 13 16:04:40 2021 -0800 f618dfc :
   Remove installed config files even if they differ, exit 0 from arpscanconf
Mon Dec 13 15:45:12 2021 -0800 1488344 :
   Test setting ARP scan devices config for MacAddressScan module
Mon Dec 13 14:39:27 2021 -0800 87e2590 :
   Add config-nokeys.js and arps2mm
Mon Dec 13 14:13:55 2021 -0800 8d97969 :
   First pass at installing a keyless default config on first install
Mon Dec 13 13:37:37 2021 -0800 33631e0 :
   Tidy up weather configs
Mon Dec 13 13:22:58 2021 -0800 de4b1dc :
   Add config files for new artists and YouTube playlists
Mon Dec 13 13:15:06 2021 -0800 0e3ffc4 :
   Set HDMI variable to active monitor
Mon Dec 13 12:33:44 2021 -0800 039d9ff :
   Save PM2 process list after removal
Mon Dec 13 12:24:21 2021 -0800 b019d06 :
   Perform PM2 initialization silently
Mon Dec 13 12:19:21 2021 -0800 5c16a9f :
   Perform checks before deleting MagicMirror PM2 process
Mon Dec 13 11:19:33 2021 -0800 28c40a7 :
   Move setting MagicMirror home in mirror script out of showkeys to postinst
Mon Dec 13 10:11:40 2021 -0800 bea2575 :
   Initialize PM2 during install
Sun Dec 12 18:24:28 2021 -0800 395713a :
   Redirect stderr as well as stdout in quiet mode
Sun Dec 12 18:16:18 2021 -0800 6fe4ada :
   Use quiet mode installing modules during initial installation
Sun Dec 12 17:35:35 2021 -0800 c73c9f4 :
   Fix error in preinst with sudo user
Sun Dec 12 15:32:28 2021 -0800 c338c71 :
   Add dependency on nodejs
Sun Dec 12 13:32:31 2021 -0800 6d04066 :
   Install MagicMirror in preinst and needed modules in postinst
Sun Dec 12 09:21:51 2021 -0800 b67f019 :
   Add section on MagicMirror installation
Sat Dec 11 18:08:20 2021 -0800 04c243b :
   Add MagicMirror HOME to mirrorkeys
Sat Dec 11 17:54:28 2021 -0800 8e9badb :
   Search for MagicMirror installation directory
Sat Dec 11 17:07:30 2021 -0800 ce656c6 :
   Deleted duplicates in MirrorCommandLine and DoctorFreeScripts
Sat Dec 11 16:22:50 2021 -0800 43b2277 :
   Remove updgit.sh, only in DoctorFreeScripts
Sat Dec 11 16:20:00 2021 -0800 ed083a0 :
   Check for platform in vncview
Sat Dec 11 15:14:27 2021 -0800 8a0fdb2 :
   Add /usr/local to locations searched for MagicMirror install directory
Fri Dec 10 09:32:31 2021 -0800 e23cb0a :
   Use .git suffix on MMM-TlegramCommands clone
Fri Dec 10 08:29:34 2021 -0800 dba832e :
   Updated audio card settings after adding a camera
Thu Dec 9 15:14:49 2021 -0800 6366629 :
   Install Google Assistant recipes
Thu Dec 9 12:19:36 2021 -0800 424cec2 :
   Add Google Assistant recipe for Roon voice control
Wed Dec 8 17:24:40 2021 -0800 5d92145 :
   Do not use sudo when creating new image folders
Wed Dec 8 14:54:31 2021 -0800 4981714 :
   Motivation and History sections
Wed Dec 8 07:40:42 2021 -0800 452520c :
   Fix list with backticks
Wed Dec 8 07:39:00 2021 -0800 ec1d94b :
   Add Documentation section to README
Tue Dec 7 21:34:54 2021 -0800 06fb225 :
   Add module_update to exports
Tue Dec 7 20:26:08 2021 -0800 702c1c1 :
   Remove vim swap file
Tue Dec 7 20:23:35 2021 -0800 b9ed267 :
   Distribute files with dummy IP addresses and update them during installation
Tue Dec 7 12:57:46 2021 -0800 53824e6 :
   Create markdown and generate man pages from markdown for commands
Tue Dec 7 10:45:17 2021 -0800 a1bc93b :
   Man page generation and viewing, new model configs
Sun Dec 5 19:00:56 2021 -0800 21db58e :
   Add browse-artifacts.txt
Sun Dec 5 13:17:46 2021 -0800 7fd758c :
   Add Niemira and Priscilla_Huggins aliases
Sat Dec 4 08:23:16 2021 -0800 d515cbe :
   Add MMM-Selfieshot module to default config, new model configs
Fri Dec 3 16:41:48 2021 -0800 603a8d4 :
   Add Niemira_A to Elite aliases
Tue Nov 30 14:50:23 2021 -0800 316234e :
   Add section with screenshots
Tue Nov 30 14:46:14 2021 -0800 6eb90e9 :
   Added screenshots of mirror command menu
Tue Nov 30 13:05:30 2021 -0800 db36e3e :
   Add GoogleAssistant recipes for selfie modules
Tue Nov 30 08:09:14 2021 -0800 202422a :
   Use getopt with additional options to fswebcam
Mon Nov 29 15:05:50 2021 -0800 9af943f :
   Add websnap utility, front-end for fswebcam
Mon Nov 29 09:06:07 2021 -0800 f88b2c9 :
   Added bin/gettantra script to download tutorial archive
Sat Nov 27 17:48:10 2021 -0800 95e0ccd :
   Set permissions and ownership after downloading images
Sat Nov 27 14:09:53 2021 -0800 12b0419 :
   Change install directory from /usr/local/MagicMirror to /usr/local/MirrorCommandLine
Sat Nov 27 12:33:37 2021 -0800 9358209 :
   Copy config-notelegram directory into dist for packaging
Sat Nov 27 12:23:52 2021 -0800 3fb4518 :
   Move NoTelegram configs up to config-notelegram folder
Sat Nov 27 11:56:13 2021 -0800 e598d72 :
   Prompt for images package removal during Uninstall
Sat Nov 27 10:58:47 2021 -0800 500005b :
   Merge branch 'master' of ssh://gitlab.com/doctorfree/MirrorCommandLine
Sat Nov 27 10:58:27 2021 -0800 e487f1a :
   Move .config-nokeys config folder to config/NoTelegram
Fri Nov 26 07:06:48 2021 -0800 71fef2b :
   Create new image folders in installed pics location rather than HOME/Pictures
Wed Nov 24 13:16:20 2021 -0800 aa01e44 :
   Scripts repo was renamed to DoctorFreeScripts
Mon Nov 22 11:35:46 2021 -0800 c15f6f3 :
   Set Architecture to 'all' in control file
Sun Nov 21 10:21:05 2021 -0800 49f04e6 :
   Delete Playboy scripts, add clone-wiki convenience script
Sun Nov 21 08:15:02 2021 -0800 96a462f :
   Use my own Veritasium playlist
Sat Nov 20 20:22:30 2021 -0800 25a92b7 :
   Add mirror_start MagicMirror PM2 startup script and configuration file for PM2
Sat Nov 20 16:17:20 2021 -0800 fdb0b97 :
   Use --update-env when restarting with pm2, add Mandelbrot zoom config
Sat Nov 20 15:08:24 2021 -0800 5d48911 :
   Update CHANGELOG for v2.5
Sat Nov 20 14:17:43 2021 -0800 56cc6de :
   New config file for Neu Ling
Sat Nov 20 14:02:48 2021 -0800 14b217f :
   Fix Uninstall check for installed packages
Sat Nov 20 13:47:57 2021 -0800 0d5d222 :
   Moved the image packages out into their own repository
Sat Nov 20 08:40:10 2021 -0800 b9f654f :
   Set Installed-Size in control file for downloaded images
Sat Nov 20 08:30:17 2021 -0800 0286786 :
   Default to base package and base images package in Install script
Sat Nov 20 08:22:45 2021 -0800 a54a986 :
   Download images piped to stdout and extract with tar from stdin to conserve disk space usage, only package mirrorcommandline here
Fri Nov 19 15:14:34 2021 -0800 866cadf :
   Fix redirection to /dev/null in packaging scripts
Thu Nov 18 13:22:45 2021 -0800 24af451 :
   Add capability to stop MagicMirror without pm2
Thu Nov 18 12:21:48 2021 -0800 a454c20 :
   Check if we recognize the PM2 process name
Thu Nov 18 11:35:25 2021 -0800 6b3b0df :
   Check if pm2 is installed, if not then use npm directly where possible
Wed Nov 17 17:36:30 2021 -0800 78fcc22 :
   Add module_update script
Wed Nov 17 13:40:36 2021 -0800 e4a49b4 :
   Use substrings of keys to check if set
Wed Nov 17 12:40:54 2021 -0800 ae81bff :
   Post and Pre need to handle case where config subdirs already exist
Wed Nov 17 12:02:45 2021 -0800 72afe7c :
   Always use setconf to set the config file link
Wed Nov 17 11:57:50 2021 -0800 bee8a5e :
   Check if Telegram API key set before linking config
Wed Nov 17 11:40:08 2021 -0800 dda0cc4 :
   Add a mirror config subdir with no Telegram modules
Wed Nov 17 10:41:15 2021 -0800 75120ba :
   Show keys in both installed config and deployed config
Wed Nov 17 08:55:53 2021 -0800 b17fb8b :
   Remove symlinks in pics dir, delete check for apikey in mirror script
Wed Nov 17 08:17:20 2021 -0800 4403814 :
   Copy config and css files rather than symlink, only symlink selected files out to /usr/local/bin
Tue Nov 16 15:12:43 2021 -0800 ed10a71 :
   Line break
Tue Nov 16 14:44:24 2021 -0800 078b60e :
   Add section on MMM-TelegramCommands
Tue Nov 16 14:18:57 2021 -0800 bb7b8f0 :
   Remove the customCommands section and use MMM-TelegramCommands instead
Tue Nov 16 13:31:31 2021 -0800 5e39f1a :
   Add support for reboot and shutdown
Mon Nov 15 16:33:01 2021 -0800 663254a :
   Remove old release artifacts
Mon Nov 15 16:07:22 2021 -0800 a9dda7b :
   Update Changelog in preparation for version 2.4 tag
Mon Nov 15 12:31:30 2021 -0800 d96940a :
   Use sudo to make pics dirs
Mon Nov 15 12:28:15 2021 -0800 a480d04 :
   Copy image lists after creating destination path
Mon Nov 15 12:21:26 2021 -0800 7a480a9 :
   Create pics subdir path in image packages
Mon Nov 15 12:04:21 2021 -0800 aee18c3 :
   Move image lists to respective packages
Mon Nov 15 10:35:26 2021 -0800 b66336f :
   Stop MagicMirror before attempting to unmount external drive
Mon Nov 15 10:19:02 2021 -0800 a3397fb :
   Rename scripts that conflict with Scripts package names
Mon Nov 15 09:48:43 2021 -0800 60cfd7c :
   Moved mm and vncview into remote subdir
Mon Nov 15 08:41:07 2021 -0800 3f3bf7f :
   Only check config files if -c argument is given
Mon Nov 15 08:14:14 2021 -0800 1bfa105 :
   Resolve duplicates with Scripts package
Sun Nov 14 12:27:37 2021 -0800 86b5f9f :
   Use dist subdir for CI artifacts, only copy dist files to releases when not in CI
Sun Nov 14 11:35:04 2021 -0800 99fadfe :
   Only run Gitlab CI when there is a new tag
Sun Nov 14 11:28:15 2021 -0800 358cd40 :
   Do not create zip archive release when running in Gitlab CI
Sun Nov 14 11:22:37 2021 -0800 4ebd422 :
   Install zip in continuous integration container, set permissions on maintainer scripts
Sun Nov 14 11:10:50 2021 -0800 7d65b89 :
   Set permissions on control directory
Sun Nov 14 11:05:05 2021 -0800 19d957b :
   Set umask
Sun Nov 14 10:54:12 2021 -0800 f1ddbac :
   Don't use sudo in Gitlab continuous integration
Sun Nov 14 10:30:26 2021 -0800 ae0b69b :
   Check if mkpkg.sh is running in a Gitlab continuous integration build
Sun Nov 14 09:51:14 2021 -0800 87f89d7 :
   Bump version for testing
Sun Nov 14 09:42:44 2021 -0800 dcf6e96 :
   Configure ci/cd to perform Debian package build and expose release artifacts
Sun Nov 14 17:26:07 2021 +0000 3fdc67a :
   Create .gitlab-ci.yml file from template
Sun Nov 14 08:51:15 2021 -0800 a014ef4 :
   Move scripts into scripts subdir
Sun Nov 14 08:36:46 2021 -0800 0ea598f :
   Use a numeric dummy value for Telegram adminChatId
Sun Nov 14 08:17:49 2021 -0800 ec23c71 :
   Move packaging folders into pkg subdirs
Sun Nov 14 08:07:24 2021 -0800 069d3d6 :
   Change location of MMM-BackgroundSlideshow pics to /usr/local/MagicMirror/pics
Sat Nov 13 18:57:09 2021 -0800 96bb508 :
   Version 2.3 release assets
Sat Nov 13 18:22:44 2021 -0800 ebde905 :
   Revised README with notes on new packages
Sat Nov 13 17:37:41 2021 -0800 884ef2b :
   Don't package Artists and Models images
Sat Nov 13 16:38:53 2021 -0800 e95e715 :
   Use pip module gdown for downloading from Google Drive
Sat Nov 13 16:01:26 2021 -0800 9d1b675 :
   Don't flush stdout during download
Sat Nov 13 15:50:56 2021 -0800 a1369b3 :
   In downloads abort quietly using signal.signal()
Sat Nov 13 15:30:20 2021 -0800 7694394 :
   BrokenPipeError not available in Python 2, use IOError
Sat Nov 13 15:11:53 2021 -0800 6709000 :
   Check for folders in subdirs
Sat Nov 13 15:01:13 2021 -0800 efaae28 :
   catch BrokenPipeError and IOError in downloads
Sat Nov 13 14:26:01 2021 -0800 af20b34 :
   For yes/no prompts use read rather than select
Sat Nov 13 14:04:04 2021 -0800 78e031d :
   Try flushing stdout during downloads
Sat Nov 13 12:49:49 2021 -0800 5eb253c :
   Write downloads to stdout and pipe to jar to extract
Sat Nov 13 11:54:17 2021 -0800 7624f82 :
   Remove Model sub-subdirs
Sat Nov 13 11:44:40 2021 -0800 155d93b :
   Add option for interactive installation, prompt for removal of images
Sat Nov 13 08:57:09 2021 -0800 61d7dbb :
   Get version from VERSION file
Fri Nov 12 22:32:09 2021 -0800 287ad80 :
   Output message when extracting zip archives
Fri Nov 12 22:11:54 2021 -0800 9e6d5e3 :
   Perform checks on package names supplied as arguments
Fri Nov 12 20:19:58 2021 -0800 cb01b18 :
   Add ModelsPortrait package
Fri Nov 12 15:44:33 2021 -0800 de9e202 :
   Try using zip archive for images, add argument processing to Install script
Fri Nov 12 14:54:22 2021 -0800 f0a1f7d :
   Add Artists images package
Fri Nov 12 13:07:52 2021 -0800 d40db4d :
   Add package for Photographers images
Fri Nov 12 12:35:33 2021 -0800 e30a1b2 :
   Rename images package to denote portrait mode images
Fri Nov 12 11:53:27 2021 -0800 bc731b9 :
   Install/Uninstall both packages
Fri Nov 12 11:37:26 2021 -0800 04bf1ee :
   Split images out into separate package
Fri Nov 12 09:37:37 2021 -0800 cbba8da :
   Silence npm during install
Fri Nov 12 09:00:30 2021 -0800 66f531b :
   Set ownership and group on installed files and directories
Fri Nov 12 08:51:27 2021 -0800 9a3c419 :
   Ignore fail on empty when removing directories, remove subdirectories in pics
Fri Nov 12 08:48:08 2021 -0800 148846c :
   Install modules as MagicMirror user, not root
Fri Nov 12 08:06:22 2021 -0800 1156cfa :
   First pass at integrating download of images into package installation
Thu Nov 11 20:27:26 2021 -0800 490df56 :
   Move location of images
Thu Nov 11 20:19:56 2021 -0800 f9bd0b2 :
   Run npm install
Thu Nov 11 19:51:56 2021 -0800 0126db6 :
   Merge branch 'master' of ssh://gitlab.com/doctorfree/MirrorCommandLine
Thu Nov 11 19:50:32 2021 -0800 7bc9bb9 :
   Add images and post install symlinks out to image dirs
Thu Nov 11 11:32:38 2021 -0800 2e3cac0 :
   Integrate MMM-IronManGIF overlay with clock into configs and css
Tue Nov 9 06:03:52 2021 -0800 cdf6027 :
   Move contents listing to wiki, add License section
Mon Nov 8 17:34:13 2021 -0800 49fc4b1 :
   Match *.js rather than config-* when patching config files with keys
Mon Nov 8 17:00:41 2021 -0800 aaba2ce :
   Recreated 2.2 distribution installation archives
Mon Nov 8 16:58:23 2021 -0800 be151e5 :
   Added section on removal
Mon Nov 8 16:43:05 2021 -0800 8fe16b8 :
   More about setting the Remote Control API key
Mon Nov 8 16:36:04 2021 -0800 7dd7897 :
   Limit sed of bin files to those with keys
Mon Nov 8 16:26:50 2021 -0800 dde8cac :
   Sync keys and stubs with new distribution key management
Mon Nov 8 15:16:36 2021 -0800 c4c25f1 :
   Don't set ownership to root on /usr/local/MagicMirror/bin
Mon Nov 8 15:02:11 2021 -0800 5c4453e :
   Add instructions on adding new keys
Mon Nov 8 14:52:25 2021 -0800 d88f9d5 :
   Fix sed command in key showing scripts
Mon Nov 8 14:28:22 2021 -0800 5259a0e :
   ignore my mirror keys
Mon Nov 8 14:19:07 2021 -0800 57b2797 :
   Add note on download of zip and gzip archives
Mon Nov 8 14:08:10 2021 -0800 314468b :
   Install from the releases directory
Mon Nov 8 13:58:53 2021 -0800 23e9cd3 :
   Recreate package distribution release files with updated package scripts
Mon Nov 8 13:55:26 2021 -0800 b809720 :
   Update README with new installation and configuration procedure, add linking/unlinking of config and css to package scripts
Mon Nov 8 12:29:03 2021 -0800 5aaec9a :
   Create 'releases' folder and upload initial release, version 2.2
Mon Nov 8 12:22:25 2021 -0800 dc118e0 :
   Renamed installation script to 'Install'
Mon Nov 8 12:21:45 2021 -0800 c758c07 :
   Installation and removal scripts
Mon Nov 8 08:46:46 2021 -0800 6df009b :
   Copy AUTHORS and README to /usr/share/doc/...
Mon Nov 8 08:28:56 2021 -0800 c03c949 :
   Create zip archive for distribution, new config file for Iron Man gifs
Mon Nov 8 07:05:35 2021 -0800 7bd57e6 :
   Reflect change in MMM-InstagramView, showComments changed to showCaptions
Sun Nov 7 20:12:54 2021 -0800 b03f70b :
   License and Changelog
Sun Nov 7 20:12:07 2021 -0800 4a4dbe0 :
   Packaging improvements, postinstall and preremove scripts, License, and Changelog
Sun Nov 7 15:59:05 2021 -0800 a85c936 :
   Add install and packaging commands, add key management scripts
Sat Nov 6 22:46:39 2021 -0700 ac8cc2f :
   Add contextIsolation and enableRemoteModule settings to electronOptions webPreferences
Sat Nov 6 20:36:57 2021 -0700 1ee83a5 :
   Bug fix for MMM-GoogleAssistant in extented.js
Sat Nov 6 20:36:04 2021 -0700 5cf7c3d :
   Updated with config-instagram.js diff
Sat Nov 6 20:24:49 2021 -0700 881f88c :
   Update custom.css with entry for MMM-InstagramView
Sat Nov 6 20:20:55 2021 -0700 8bcac67 :
   Release config-instagram.js config file using new MMM-InstagramView module
Fri Nov 5 14:47:20 2021 -0700 bbe7c5f :
   Sync up chksums with latest changes, update asoundrc with mic setting
Fri Nov 5 12:42:42 2021 -0700 f5f717b :
   Moved back to using the default updatenotification module
Thu Nov 4 22:51:36 2021 -0700 745b613 :
   Add recipe voice command to show scene by name
Thu Nov 4 22:45:53 2021 -0700 66343b6 :
   Add test config subdir
Thu Nov 4 22:44:01 2021 -0700 ebda0da :
   Animated gif config
Thu Nov 4 22:43:26 2021 -0700 5ce4360 :
   Move from default updatenotification module to MMM-UpdateNotification
Wed Nov 3 20:12:11 2021 -0700 f4513b2 :
   Add Google Photos config file subdir and configs using MMM-GoogleAssistant photos module
Wed Nov 3 15:22:23 2021 -0700 077d6b0 :
   Update MMM-GoogleAssistant config to enable YouTube extension with VLC playback
Wed Nov 3 14:35:07 2021 -0700 b7fadaa :
   Describe process for GoogleAssistant access token generation
Wed Nov 3 07:22:22 2021 -0700 9b2c4ee :
   Add section on Google API keys
Tue Nov 2 07:45:25 2021 -0700 1689e21 :
   Brackets and braces and Markup, oh my
Tue Nov 2 07:41:25 2021 -0700 0e1f229 :
   Update usage message
Mon Nov 1 19:21:32 2021 -0700 aac486e :
   Add sections to README for MMM-GoogleAssistant and MMM-Scenes integration
Mon Nov 1 16:29:23 2021 -0700 92099aa :
   Split MMM-Scenes voice commands out into its own recipe
Mon Nov 1 13:34:21 2021 -0700 f073980 :
   Deleted the MMM-Scenes commands as there is a conflict with that module
Mon Nov 1 12:52:25 2021 -0700 a437e77 :
   Update templates, new configs for voice and snowcrash audio book, script to manage MMM-Scenes
Mon Nov 1 12:49:19 2021 -0700 fae2dd1 :
   Custom MMM-GoogleAssistant recipes, mirror commands to manage MMM-Scenes and voice control
Sat Oct 30 23:26:35 2021 -0700 a558c5a :
   Add support for MMM-GoogleAssistant to config files and custom css
Fri Oct 29 15:59:09 2021 -0700 a2eebdf :
   Add customCommands entry for mirror Telegram command to README, new config/telegrambot file with that module's config entry
Fri Oct 29 14:20:46 2021 -0700 b86db68 :
   Exit 0 when sending Telegram Bot messages otherwise Telegram thinks the command failed
Fri Oct 29 12:43:07 2021 -0700 0e1af73 :
   Deleted sample configs
Fri Oct 29 12:34:10 2021 -0700 24cc1bb :
   Added MMM-TelegramBot config to remaining config files
Fri Oct 29 10:17:30 2021 -0700 dd1f571 :
   Clean up description of remote access capabilities and usage
Fri Oct 29 10:05:26 2021 -0700 9d3d7f7 :
   Update usage message and README to reflect remote access integration
Thu Oct 28 18:18:43 2021 -0700 1ef3e8f :
   Correct MMM-TelegramBot integration section title link
Thu Oct 28 18:16:28 2021 -0700 fe0eda6 :
   Add section on TelegramBot integration
Thu Oct 28 16:28:43 2021 -0700 0ae8c26 :
   Add customCommands to TelegramBot config section
Thu Oct 28 16:07:51 2021 -0700 f5d9135 :
   Additional output format tailoring for Telegram
Thu Oct 28 15:47:42 2021 -0700 248b2dd :
   Tailor ouput of some commands for Telegram messages
Thu Oct 28 15:37:40 2021 -0700 89c6875 :
   Delete unused Models_Photogs config file
Thu Oct 28 11:27:45 2021 -0700 7fc0f18 :
   Add MARKDOWN mode for Telegram message formatting
Tue Oct 26 11:13:35 2021 -0700 f7c0a97 :
   Add sponsor funding link
Tue Oct 26 07:59:32 2021 -0700 2036082 :
   Add MMM-TelegramBot to fixed entry for MMM-pages configs
Tue Oct 26 07:39:50 2021 -0700 b161bbe :
   Updated configs with new TelegramBot settings
Sun Oct 24 15:40:15 2021 -0700 93586bf :
   Sync chkinst.sh with latest config changes
Sun Oct 24 14:18:08 2021 -0700 3555c62 :
   Updated bin utils
Sun Oct 24 13:48:47 2021 -0700 1ec3cad :
   New config file for MMM-DarkSkyForecast
Sun Oct 24 10:07:11 2021 -0700 d571bb3 :
   New config for radar, traffic, and weather scenes
Sat Oct 23 17:53:16 2021 -0700 29aa1b1 :
   Moved nuts and tuigirls into Models config subdir
Sat Oct 23 17:47:07 2021 -0700 4eef602 :
   New config for Santa Cruz News, split out config specific CSS into separate custom css files, highlight newsfeed description and source
Sat Oct 23 14:24:25 2021 -0700 642d544 :
   ARP scan in columns layout
Sat Oct 23 13:45:12 2021 -0700 4b5acde :
   Add headers, reorg layouts, new css for network columns, use stock Solar header
Fri Oct 22 09:59:27 2021 -0700 86f4975 :
   Updated configs to use MMM-MacAddressScan rather than MMM-NetworkScanner
Fri Oct 22 08:12:04 2021 -0700 047582e :
   Updated MMM-NetworkScanner module settings in configs to reflect my modified version of that module
Thu Oct 21 18:20:52 2021 -0700 3867fa3 :
   Create network and unknown configs, update default scan devices
Thu Oct 21 08:44:37 2021 -0700 f541527 :
   Look in top config dir for possible matches as well
Wed Oct 20 17:47:24 2021 -0700 4bea5cd :
   Updated ip whitelist with new iPad IP
Wed Oct 20 10:42:45 2021 -0700 901d79c :
   Declare frequently used strings as variables
Wed Oct 20 10:36:59 2021 -0700 e0142cd :
   Sync mknew scripts
Tue Oct 19 16:31:35 2021 -0700 e9bf295 :
   Ignore key manipulation scripts
Tue Oct 19 16:28:45 2021 -0700 e8e8bf1 :
   Finally got a working 4 scene config
Tue Oct 19 12:34:39 2021 -0700 6a50f53 :
   New config files for art and waterfalls, updated scenes config
Mon Oct 18 09:37:16 2021 -0700 9745851 :
   Added fourth scene to MMM-Scenes scenario, commented out fifth scene as it exceeds module resources
Mon Oct 18 09:33:41 2021 -0700 76a2305 :
   Don't start MagicMirror until after the config file is linked, enabled command line developer mode with -d switch and config file specification
Mon Oct 18 08:32:35 2021 -0700 9add843 :
   Updated iPhone IP in all configs, added unicode circled numbers for Scenes
Sun Oct 17 18:59:28 2021 -0700 34c52d5 :
   Add an optional second argument specifying subdirectory in which to locate config file
Mon Oct 18 01:34:49 2021 +0000 13a201b :
   Add bold and spacing to quotation in README.md
Mon Oct 18 01:32:05 2021 +0000 639bbd6 :
   Format command in leading README.md quotation
Sun Oct 17 18:28:58 2021 -0700 d21e6e6 :
   Integrated MMM-Scenes into some configs, created desktop background config
Sun Oct 17 18:25:40 2021 -0700 19f1506 :
   Add Neal Stephenson quote as preface
Sun Oct 17 11:27:03 2021 -0700 f8d0fc7 :
   Add MMM-Remote-Control integration to Table of Contents
Sun Oct 17 11:21:52 2021 -0700 26a3971 :
   Add section on MMM-Remote-Control integration
Sun Oct 17 10:14:53 2021 -0700 edac29a :
   Add commented out electron logging for dev mode
Sat Oct 16 18:23:13 2021 -0700 7e76f99 :
   Created a custom menu for MMM-Remote-Control and added mirror commands to all configs for that module
Sat Oct 16 08:17:29 2021 -0700 6f28e2c :
   Add volume control to feature list
Fri Oct 15 11:43:45 2021 -0700 b6062df :
   Add new volume controls
Fri Oct 15 11:03:12 2021 -0700 a82874e :
   Add mute/unmute/save/restore to volume control script
Fri Oct 15 09:36:08 2021 -0700 c397f1b :
   Update mounted filesystem
Fri Oct 15 08:36:37 2021 -0700 cd37322 :
   New YouTube configs for Harry Nilsson
Thu Oct 14 16:29:40 2021 -0700 82fb9e3 :
   Add breaks to youtube selection dialog to redisplay menu options
Thu Oct 14 16:04:00 2021 -0700 c8547f3 :
   Integrate new Bowie config into mirror script
Thu Oct 14 16:01:16 2021 -0700 0786020 :
   Create bowie config file
Thu Oct 14 11:36:49 2021 -0700 714cb83 :
   Updated installation check with new diffs and reinstated check for asoundrc
Thu Oct 14 11:14:37 2021 -0700 ee38a81 :
   Update show_all_keys with new repository location
Thu Oct 14 10:38:53 2021 -0700 a3b1708 :
   Merged several selection dialog functions into one, cleanup menus
Thu Oct 14 09:36:18 2021 -0700 c5a7b0d :
   Use functions rather than reinvocation of mirror where appropriate so we can test return value easily
Thu Oct 14 08:29:47 2021 -0700 58e4248 :
   New config files for Babymetal, Deep Purple, and Pipe Organ videos
Wed Oct 13 17:00:53 2021 -0700 10ab2b4 :
   Add YouTube configs to interactive menu config selection, new configs for ZHU and TV Themes
Wed Oct 13 13:30:42 2021 -0700 ddda39e :
   Created config files for Dua Lipa and Queens of the Stone Age
Wed Oct 13 09:48:38 2021 -0700 8a373cf :
   Cleanup
Wed Oct 13 09:47:53 2021 -0700 20ed172 :
   Add screenshot capability
Wed Oct 13 09:45:21 2021 -0700 a32682f :
   Hide referrer config setting, add artist wiki links to kpop config
Tue Oct 12 19:03:20 2021 -0700 2da7f89 :
   Add YouTube config files, new config-candy.js config
Mon Oct 11 14:34:55 2021 -0700 0f2638c :
   Add YouTube to config subdirs to search
Mon Oct 11 11:52:36 2021 -0700 3efba57 :
   Add explanatory comments for default settings
Mon Oct 11 11:31:04 2021 -0700 0a75e90 :
   No need to calculate percentage in vol script, use % format argument
Mon Oct 11 10:22:59 2021 -0700 8836b86 :
   Add vol.sh to Contents and listing
Mon Oct 11 10:20:09 2021 -0700 c641ce5 :
   Add volume control via vol.sh command line script
Sun Oct 10 17:41:39 2021 -0700 e9a7521 :
   Delete MMM-News
Sun Oct 10 17:31:21 2021 -0700 2fdaa0c :
   Merge branch 'master' of ssh://gitlab.com/doctorfree/MirrorCommandLine
Sun Oct 10 17:31:01 2021 -0700 3f6999e :
   Update IP Whitelist for all configs
Sun Oct 10 14:21:58 2021 -0700 93284b7 :
   Add connected display to info output
Sun Oct 10 11:43:35 2021 -0700 a90234b :
   Rotate Videoplayer orientation
Sun Oct 10 11:26:08 2021 -0700 a0878b7 :
   Updated config files with latest options, stocks, cryptocurrencies, etc
Sun Oct 10 11:19:26 2021 -0700 13f0ff5 :
   Rotate screen based on which config file is selected, add support for inverted screen rotation
Sat Oct 9 13:11:17 2021 -0700 13da4eb :
   Update to default Weather Module
Thu Oct 7 14:27:39 2021 -0700 e266431 :
   Added video playback controls to interactive menus
Thu Oct 7 13:55:29 2021 -0700 abc2e1c :
   Update usage message with video hide/show
Thu Oct 7 13:47:32 2021 -0700 b7b8a9c :
   Add ability to hide and show video module, update api calls to use new module syntax
Thu Oct 7 12:10:20 2021 -0700 a28681a :
   Format usage message
Thu Oct 7 12:06:40 2021 -0700 9f2f97a :
   Updated usage and feature list with video playback control
Thu Oct 7 11:56:56 2021 -0700 a8c558a :
   Use remote api to control video play with notifications
Thu Oct 7 11:11:01 2021 -0700 ec91781 :
   Added custom CSS for video player
Thu Oct 7 11:09:32 2021 -0700 c1cee18 :
   Added config files for video player
Thu Oct 7 08:35:03 2021 -0700 5317c18 :
   Expand summary description, no auto link repo url
Wed Oct 6 15:52:04 2021 -0700 ea89fd2 :
   Check config files in subdirectories
Wed Oct 6 15:32:39 2021 -0700 d5971b9 :
   Brought chkinst up to date with recent config reorg
Wed Oct 6 13:25:07 2021 -0700 caf62db :
   Update and improve update convenience scripts
Wed Oct 6 13:21:31 2021 -0700 60ac467 :
   Rename update convenience scripts
Tue Oct 5 12:52:17 2021 -0700 1826319 :
   Fix bug when chkinst invoked with -d argument
Tue Oct 5 12:44:10 2021 -0700 8af3c20 :
   Add comments to guide customization of backgrounds script image folders
Tue Oct 5 12:38:46 2021 -0700 81d016c :
   Fix Remote Access section link
Tue Oct 5 12:32:26 2021 -0700 3037aec :
   Add section on Remote Access
Tue Oct 5 11:08:10 2021 -0700 9dc4cbd :
   Still sorting out and updating old IP addresses
Tue Oct 5 10:07:54 2021 -0700 5acfe9a :
   Format usage message
Tue Oct 5 10:05:19 2021 -0700 58d31e1 :
   Reformat to avoid mistaken markdown syntax
Tue Oct 5 09:55:28 2021 -0700 3600fab :
   Merge branch 'master' of ssh://gitlab.com/doctorfree/MirrorCommandLine
Tue Oct 5 09:54:41 2021 -0700 ccf7c49 :
   Update mirror ip to current setting
Tue Oct 5 09:41:56 2021 -0700 4be1be9 :
   Complete the Contents listing
Mon Oct 4 14:01:22 2021 -0700 9f57d1b :
   Fix bug in searching config subdirs, update README with additional configuration settings
Mon Oct 4 13:42:12 2021 -0700 7176a2d :
   Moved moon and sol configs into Models folder
Mon Oct 4 12:24:05 2021 -0700 7654f89 :
   Cleanup
Mon Oct 4 12:21:52 2021 -0700 f18e939 :
   Format git clone lines
Mon Oct 4 12:20:23 2021 -0700 43ff6a4 :
   First pass at the Installation instructions
Mon Oct 4 11:24:41 2021 -0700 db185e7 :
   Re-initialize mirror.sh
Mon Oct 4 11:23:43 2021 -0700 c00518a :
   Redo mirror script init
Mon Oct 4 11:04:06 2021 -0700 8e38a20 :
   Greater detail on supported capabilities
Mon Oct 4 10:59:32 2021 -0700 086a60f :
   Preformat tag for usage message
Mon Oct 4 10:52:02 2021 -0700 1149198 :
   First pass at a more descriptive and organized README and usage
Mon Oct 4 10:13:07 2021 -0700 8ee74d3 :
   Update README with correct paths for files in new repo
Mon Oct 4 08:52:20 2021 -0700 f1e960b :
   Initial MirrorCommandLine git repository
