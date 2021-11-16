# Changelog

All notable changes to this project will be documented in this file.

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
