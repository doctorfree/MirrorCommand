# Changelog

All notable changes to this project will be documented in this file.

## Sun Nov 7 15:59:05 2021 -0800 a85c936 :
   Add install and packaging commands, add key management scripts
## Sat Nov 6 22:46:39 2021 -0700 ac8cc2f :
   Add contextIsolation and enableRemoteModule settings to electronOptions webPreferences
## Sat Nov 6 20:36:57 2021 -0700 1ee83a5 :
   Bug fix for MMM-GoogleAssistant in extented.js
## Sat Nov 6 20:36:04 2021 -0700 5cf7c3d :
   Updated with config-instagram.js diff
## Sat Nov 6 20:24:49 2021 -0700 881f88c :
   Update custom.css with entry for MMM-InstagramView
## Sat Nov 6 20:20:55 2021 -0700 8bcac67 :
   Release config-instagram.js config file using new MMM-InstagramView module
## Fri Nov 5 14:47:20 2021 -0700 bbe7c5f :
   Sync up chksums with latest changes, update asoundrc with mic setting
## Fri Nov 5 12:42:42 2021 -0700 f5f717b :
   Moved back to using the default updatenotification module
## Thu Nov 4 22:51:36 2021 -0700 745b613 :
   Add recipe voice command to show scene by name
## Thu Nov 4 22:45:53 2021 -0700 66343b6 :
   Add test config subdir
## Thu Nov 4 22:44:01 2021 -0700 ebda0da :
   Animated gif config
## Thu Nov 4 22:43:26 2021 -0700 5ce4360 :
   Move from default updatenotification module to MMM-UpdateNotification
## Wed Nov 3 20:12:11 2021 -0700 f4513b2 :
   Add Google Photos config file subdir and configs using MMM-GoogleAssistant photos module
## Wed Nov 3 15:22:23 2021 -0700 077d6b0 :
   Update MMM-GoogleAssistant config to enable YouTube extension with VLC playback
## Wed Nov 3 14:35:07 2021 -0700 b7fadaa :
   Describe process for GoogleAssistant access token generation
## Wed Nov 3 07:22:22 2021 -0700 9b2c4ee :
   Add section on Google API keys
## Tue Nov 2 07:45:25 2021 -0700 1689e21 :
   Brackets and braces and Markup, oh my
## Tue Nov 2 07:41:25 2021 -0700 0e1f229 :
   Update usage message
## Mon Nov 1 19:21:32 2021 -0700 aac486e :
   Add sections to README for MMM-GoogleAssistant and MMM-Scenes integration
## Mon Nov 1 16:29:23 2021 -0700 92099aa :
   Split MMM-Scenes voice commands out into its own recipe
## Mon Nov 1 13:34:21 2021 -0700 f073980 :
   Deleted the MMM-Scenes commands as there is a conflict with that module
## Mon Nov 1 12:52:25 2021 -0700 a437e77 :
   Update templates, new configs for voice and snowcrash audio book, script to manage MMM-Scenes
## Mon Nov 1 12:49:19 2021 -0700 fae2dd1 :
   Custom MMM-GoogleAssistant recipes, mirror commands to manage MMM-Scenes and voice control
## Sat Oct 30 23:26:35 2021 -0700 a558c5a :
   Add support for MMM-GoogleAssistant to config files and custom css
## Fri Oct 29 15:59:09 2021 -0700 a2eebdf :
   Add customCommands entry for mirror Telegram command to README, new config/telegrambot file with that module's config entry
## Fri Oct 29 14:20:46 2021 -0700 b86db68 :
   Exit 0 when sending Telegram Bot messages otherwise Telegram thinks the command failed
## Fri Oct 29 12:43:07 2021 -0700 0e1af73 :
   Deleted sample configs
## Fri Oct 29 12:34:10 2021 -0700 24cc1bb :
   Added MMM-TelegramBot config to remaining config files
## Fri Oct 29 10:17:30 2021 -0700 dd1f571 :
   Clean up description of remote access capabilities and usage
## Fri Oct 29 10:05:26 2021 -0700 9d3d7f7 :
   Update usage message and README to reflect remote access integration
## Thu Oct 28 18:18:43 2021 -0700 1ef3e8f :
   Correct MMM-TelegramBot integration section title link
## Thu Oct 28 18:16:28 2021 -0700 fe0eda6 :
   Add section on TelegramBot integration
## Thu Oct 28 16:28:43 2021 -0700 0ae8c26 :
   Add customCommands to TelegramBot config section
## Thu Oct 28 16:07:51 2021 -0700 f5d9135 :
   Additional output format tailoring for Telegram
## Thu Oct 28 15:47:42 2021 -0700 248b2dd :
   Tailor ouput of some commands for Telegram messages
## Thu Oct 28 15:37:40 2021 -0700 89c6875 :
   Delete unused Models_Photogs config file
## Thu Oct 28 11:27:45 2021 -0700 7fc0f18 :
   Add MARKDOWN mode for Telegram message formatting
## Tue Oct 26 11:13:35 2021 -0700 f7c0a97 :
   Add sponsor funding link
## Tue Oct 26 07:59:32 2021 -0700 2036082 :
   Add MMM-TelegramBot to fixed entry for MMM-pages configs
## Tue Oct 26 07:39:50 2021 -0700 b161bbe :
   Updated configs with new TelegramBot settings
## Sun Oct 24 15:40:15 2021 -0700 93586bf :
   Sync chkinst.sh with latest config changes
## Sun Oct 24 14:18:08 2021 -0700 3555c62 :
   Updated bin utils
## Sun Oct 24 13:48:47 2021 -0700 1ec3cad :
   New config file for MMM-DarkSkyForecast
## Sun Oct 24 10:07:11 2021 -0700 d571bb3 :
   New config for radar, traffic, and weather scenes
## Sat Oct 23 17:53:16 2021 -0700 29aa1b1 :
   Moved nuts and tuigirls into Models config subdir
## Sat Oct 23 17:47:07 2021 -0700 4eef602 :
   New config for Santa Cruz News, split out config specific CSS into separate custom css files, highlight newsfeed description and source
## Sat Oct 23 14:24:25 2021 -0700 642d544 :
   ARP scan in columns layout
## Sat Oct 23 13:45:12 2021 -0700 4b5acde :
   Add headers, reorg layouts, new css for network columns, use stock Solar header
## Fri Oct 22 09:59:27 2021 -0700 86f4975 :
   Updated configs to use MMM-MacAddressScan rather than MMM-NetworkScanner
## Fri Oct 22 08:12:04 2021 -0700 047582e :
   Updated MMM-NetworkScanner module settings in configs to reflect my modified version of that module
## Thu Oct 21 18:20:52 2021 -0700 3867fa3 :
   Create network and unknown configs, update default scan devices
## Thu Oct 21 08:44:37 2021 -0700 f541527 :
   Look in top config dir for possible matches as well
## Wed Oct 20 17:47:24 2021 -0700 4bea5cd :
   Updated ip whitelist with new iPad IP
## Wed Oct 20 10:42:45 2021 -0700 901d79c :
   Declare frequently used strings as variables
## Wed Oct 20 10:36:59 2021 -0700 e0142cd :
   Sync mknew scripts
## Tue Oct 19 16:31:35 2021 -0700 e9bf295 :
   Ignore key manipulation scripts
## Tue Oct 19 16:28:45 2021 -0700 e8e8bf1 :
   Finally got a working 4 scene config
## Tue Oct 19 12:34:39 2021 -0700 6a50f53 :
   New config files for art and waterfalls, updated scenes config
## Mon Oct 18 09:37:16 2021 -0700 9745851 :
   Added fourth scene to MMM-Scenes scenario, commented out fifth scene as it exceeds module resources
## Mon Oct 18 09:33:41 2021 -0700 76a2305 :
   Don't start MagicMirror until after the config file is linked, enabled command line developer mode with -d switch and config file specification
## Mon Oct 18 08:32:35 2021 -0700 9add843 :
   Updated iPhone IP in all configs, added unicode circled numbers for Scenes
## Sun Oct 17 18:59:28 2021 -0700 34c52d5 :
   Add an optional second argument specifying subdirectory in which to locate config file
Ron Record, Mon Oct 18 01:34:49 2021 +0000 13a201b :
   Add bold and spacing to quotation in README.md
Ron Record, Mon Oct 18 01:32:05 2021 +0000 639bbd6 :
   Format command in leading README.md quotation
## Sun Oct 17 18:28:58 2021 -0700 d21e6e6 :
   Integrated MMM-Scenes into some configs, created desktop background config
## Sun Oct 17 18:25:40 2021 -0700 19f1506 :
   Add Neal Stephenson quote as preface
## Sun Oct 17 11:27:03 2021 -0700 f8d0fc7 :
   Add MMM-Remote-Control integration to Table of Contents
## Sun Oct 17 11:21:52 2021 -0700 26a3971 :
   Add section on MMM-Remote-Control integration
## Sun Oct 17 10:14:53 2021 -0700 edac29a :
   Add commented out electron logging for dev mode
## Sat Oct 16 18:23:13 2021 -0700 7e76f99 :
   Created a custom menu for MMM-Remote-Control and added mirror commands to all configs for that module
## Sat Oct 16 08:17:29 2021 -0700 6f28e2c :
   Add volume control to feature list
## Fri Oct 15 11:43:45 2021 -0700 b6062df :
   Add new volume controls
## Fri Oct 15 11:03:12 2021 -0700 a82874e :
   Add mute/unmute/save/restore to volume control script
## Fri Oct 15 09:36:08 2021 -0700 c397f1b :
   Update mounted filesystem
## Fri Oct 15 08:36:37 2021 -0700 cd37322 :
   New YouTube configs for Harry Nilsson
## Thu Oct 14 16:29:40 2021 -0700 82fb9e3 :
   Add breaks to youtube selection dialog to redisplay menu options
## Thu Oct 14 16:04:00 2021 -0700 c8547f3 :
   Integrate new Bowie config into mirror script
## Thu Oct 14 16:01:16 2021 -0700 0786020 :
   Create bowie config file
## Thu Oct 14 11:36:49 2021 -0700 714cb83 :
   Updated installation check with new diffs and reinstated check for asoundrc
## Thu Oct 14 11:14:37 2021 -0700 ee38a81 :
   Update show_all_keys with new repository location
## Thu Oct 14 10:38:53 2021 -0700 a3b1708 :
   Merged several selection dialog functions into one, cleanup menus
## Thu Oct 14 09:36:18 2021 -0700 c5a7b0d :
   Use functions rather than reinvocation of mirror where appropriate so we can test return value easily
## Thu Oct 14 08:29:47 2021 -0700 58e4248 :
   New config files for Babymetal, Deep Purple, and Pipe Organ videos
## Wed Oct 13 17:00:53 2021 -0700 10ab2b4 :
   Add YouTube configs to interactive menu config selection, new configs for ZHU and TV Themes
## Wed Oct 13 13:30:42 2021 -0700 ddda39e :
   Created config files for Dua Lipa and Queens of the Stone Age
## Wed Oct 13 09:48:38 2021 -0700 8a373cf :
   Cleanup
## Wed Oct 13 09:47:53 2021 -0700 20ed172 :
   Add screenshot capability
## Wed Oct 13 09:45:21 2021 -0700 a32682f :
   Hide referrer config setting, add artist wiki links to kpop config
## Tue Oct 12 19:03:20 2021 -0700 2da7f89 :
   Add YouTube config files, new config-candy.js config
Ron Record, Mon Oct 11 14:34:55 2021 -0700 0f2638c :
   Add YouTube to config subdirs to search
Ron Record, Mon Oct 11 11:52:36 2021 -0700 3efba57 :
   Add explanatory comments for default settings
Ron Record, Mon Oct 11 11:31:04 2021 -0700 0a75e90 :
   No need to calculate percentage in vol script, use % format argument
Ron Record, Mon Oct 11 10:22:59 2021 -0700 8836b86 :
   Add vol.sh to Contents and listing
Ron Record, Mon Oct 11 10:20:09 2021 -0700 c641ce5 :
   Add volume control via vol.sh command line script
Ron Record, Sun Oct 10 17:41:39 2021 -0700 e9a7521 :
   Delete MMM-News
## Sun Oct 10 17:31:21 2021 -0700 2fdaa0c :
   Merge branch 'master' of ssh://gitlab.com/doctorfree/MirrorCommandLine
## Sun Oct 10 17:31:01 2021 -0700 3f6999e :
   Update IP Whitelist for all configs
Ron Record, Sun Oct 10 14:21:58 2021 -0700 93284b7 :
   Add connected display to info output
## Sun Oct 10 11:43:35 2021 -0700 a90234b :
   Rotate Videoplayer orientation
## Sun Oct 10 11:26:08 2021 -0700 a0878b7 :
   Updated config files with latest options, stocks, cryptocurrencies, etc
Ron Record, Sun Oct 10 11:19:26 2021 -0700 13f0ff5 :
   Rotate screen based on which config file is selected, add support for inverted screen rotation
## Sat Oct 9 13:11:17 2021 -0700 13da4eb :
   Update to default Weather Module
Ron Record, Thu Oct 7 14:27:39 2021 -0700 e266431 :
   Added video playback controls to interactive menus
Ron Record, Thu Oct 7 13:55:29 2021 -0700 abc2e1c :
   Update usage message with video hide/show
Ron Record, Thu Oct 7 13:47:32 2021 -0700 b7b8a9c :
   Add ability to hide and show video module, update api calls to use new module syntax
Ron Record, Thu Oct 7 12:10:20 2021 -0700 a28681a :
   Format usage message
Ron Record, Thu Oct 7 12:06:40 2021 -0700 9f2f97a :
   Updated usage and feature list with video playback control
Ron Record, Thu Oct 7 11:56:56 2021 -0700 a8c558a :
   Use remote api to control video play with notifications
## Thu Oct 7 11:11:01 2021 -0700 ec91781 :
   Added custom CSS for video player
## Thu Oct 7 11:09:32 2021 -0700 c1cee18 :
   Added config files for video player
## Thu Oct 7 08:35:03 2021 -0700 5317c18 :
   Expand summary description, no auto link repo url
Ron Record, Wed Oct 6 15:52:04 2021 -0700 ea89fd2 :
   Check config files in subdirectories
Ron Record, Wed Oct 6 15:32:39 2021 -0700 d5971b9 :
   Brought chkinst up to date with recent config reorg
Ron Record, Wed Oct 6 13:25:07 2021 -0700 caf62db :
   Update and improve update convenience scripts
Ron Record, Wed Oct 6 13:21:31 2021 -0700 60ac467 :
   Rename update convenience scripts
Ron Record, Tue Oct 5 12:52:17 2021 -0700 1826319 :
   Fix bug when chkinst invoked with -d argument
## Tue Oct 5 12:44:10 2021 -0700 8af3c20 :
   Add comments to guide customization of backgrounds script image folders
## Tue Oct 5 12:38:46 2021 -0700 81d016c :
   Fix Remote Access section link
## Tue Oct 5 12:32:26 2021 -0700 3037aec :
   Add section on Remote Access
## Tue Oct 5 11:08:10 2021 -0700 9dc4cbd :
   Still sorting out and updating old IP addresses
## Tue Oct 5 10:07:54 2021 -0700 5acfe9a :
   Format usage message
## Tue Oct 5 10:05:19 2021 -0700 58d31e1 :
   Reformat to avoid mistaken markdown syntax
Ron Record, Tue Oct 5 09:55:28 2021 -0700 3600fab :
   Merge branch 'master' of ssh://gitlab.com/doctorfree/MirrorCommandLine
Ron Record, Tue Oct 5 09:54:41 2021 -0700 ccf7c49 :
   Update mirror ip to current setting
## Tue Oct 5 09:41:56 2021 -0700 4be1be9 :
   Complete the Contents listing
## Mon Oct 4 14:01:22 2021 -0700 9f57d1b :
   Fix bug in searching config subdirs, update README with additional configuration settings
## Mon Oct 4 13:42:12 2021 -0700 7176a2d :
   Moved moon and sol configs into Models folder
## Mon Oct 4 12:24:05 2021 -0700 7654f89 :
   Cleanup
## Mon Oct 4 12:21:52 2021 -0700 f18e939 :
   Format git clone lines
## Mon Oct 4 12:20:23 2021 -0700 43ff6a4 :
   First pass at the Installation instructions
## Mon Oct 4 11:24:41 2021 -0700 db185e7 :
   Re-initialize mirror.sh
## Mon Oct 4 11:23:43 2021 -0700 c00518a :
   Redo mirror script init
## Mon Oct 4 11:04:06 2021 -0700 8e38a20 :
   Greater detail on supported capabilities
## Mon Oct 4 10:59:32 2021 -0700 086a60f :
   Preformat tag for usage message
## Mon Oct 4 10:52:02 2021 -0700 1149198 :
   First pass at a more descriptive and organized README and usage
## Mon Oct 4 10:13:07 2021 -0700 8ee74d3 :
   Update README with correct paths for files in new repo
## Mon Oct 4 08:52:20 2021 -0700 f1e960b :
   Initial MirrorCommandLine git repository
