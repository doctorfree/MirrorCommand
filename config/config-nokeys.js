/* Magic Mirror Config
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * Modified by Ron Record http://ronrecord.com
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
    address: "0.0.0.0", // Address to listen on, can be:
    port: 8080,
    ipWhitelist: [
        "0.0.0.0",
        "127.0.0.1",
        "10.0.1.88", // Mac Mini
        "10.0.1.204", // iPad
        "10.0.1.57", // Mac Pro
        "10.0.8.130", // Mac Pro over Tunnelblick
        "10.0.1.81", // Roon Core
        "10.0.1.82", // Mac Pro
        "10.0.1.94", // Ropieee
        "10.0.1.55", // Raspberry Pi MagicMirror
        "10.0.1.80", // Raspberry Pi 400
        "10.0.1.69", // iPad Air
        "10.0.1.52", // iPhone 12 Mini
        "::ffff:127.0.0.1",
        "::1",
    ],

    customCss: "css/custom-ironman.css",
    language: "en",
    timeFormat: 12,
    units: "imperial",
    electronOptions: {
        webPreferences: {
          webviewTag: true,
          contextIsolation: false,
          enableRemoteModule: true
        }
    },
    
    modules: [
        {
            module: "alert",
        },
        {
            disabled: false,
            module: "MMM-Selfieshot",
            config: {}
        },
        {
            module: "updatenotification",
            position: "top_bar",
        },
        {
            module: "MMM-IronManGIF",
            position: "middle_center",
            config: {
                style: 1,              // Style number
                maxWidth: "100%",      // Sizes the images.
                rotate: true,
                updateInterval: 300000
            }
        },
        {
            module: "clock",
            position: "middle_center",
            config: {
                dateFormat: "dddd, LLL",
                displayType: "analog",
                analogFace: "face-006",
                analogSize: "295px",
                displaySeconds: "true",
                secondsColor: "#00FFFF",
                timeFormat: "12",
                showPeriod: "true",
                showDate: "true",
                clockBold: "false",
                analogPlacement: "top",
                analogShowDate: "top",
            }
        },
        {
            module: "compliments",
            position: "bottom_bar"
        },
        {
            module: 'MMM-Remote-Control',
            config: {
                // apiKey: 'd8d8947ad3da477288bcbe3c7353523b',
                customCommand: {
                    shutdownCommand: '/usr/local/bin/shutdown',
                    rebootCommand: '/usr/local/bin/reboot',
                    monitorOnCommand: 'vcgencmd display_power 1',
                    monitorOffCommand: 'vcgencmd display_power 0',
                    restartCommand: '/usr/local/bin/mirror restart',
                    screenshotCommand: '/usr/local/bin/mirror screenshot',
                    rotateScreenRight: '/usr/local/bin/mirror rotate right',
                    rotateScreenLeft: '/usr/local/bin/mirror rotate left',
                    rotateScreenNormal: '/usr/local/bin/mirror rotate normal',
                    rotateScreenInverted: '/usr/local/bin/mirror rotate inverted',
                    playVideo: '/usr/local/bin/mirror playvideo',
                    pauseVideo: '/usr/local/bin/mirror pausevideo',
                    replayVideo: '/usr/local/bin/mirror replayvideo',
                    nextVideo: '/usr/local/bin/mirror nextvideo',
                    hideVideo: '/usr/local/bin/mirror hidevideo',
                    showVideo: '/usr/local/bin/mirror showvideo',
                    // Shell command to return status of monitor,
                    // must return either "HDMI" or "true" if screen is on
                    // "TV is Off" or "false" if it is off to be recognized
                    // monitorStatusCommand: '/usr/local/bin/mirror screen status',
                },
                showModuleApiMenu: true,
                secureEndpoints: true,
                customMenu: "custom_menu.json",
                // classes: {} // Optional, See "Custom Classes" below
            }
        },
        {
            module: "calendar",
            header: "US Holidays",
            position: "top_center",
            config: {
                colored: true,
                maximumNumberOfDays: 10,
                maximumEntries: 9,
                showLocation: true,
                tableClass: "medium",
                timeFormat: "absolute",
                nextDaysRelative: true,
                displaySymbol: true,
                defaultSymbol: "calendar-alt",
                calendars: [
                    {
                        symbol: "calendar-check",
                        url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
                    }
                ]
            }
        },
        {
            module: "newsfeed",
            position: "top_bar",
            config: {
                feeds: [
                    {
                        title: "New York Times",
                        url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
                    },
                    {
                        title: "Washington Post",
                        url: "http://feeds.washingtonpost.com/rss/national"
                    },
                ],
                lengthDescription: 500,
                updateInterval: 30000,
                showDescription: true,
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            }
        },
        {
            module: 'MMM-Tools',
            position: 'bottom_left',
            header: "System Info",
            config: {
              refresh: 1000 * 5,
              containerSize: null,
              itemSize: null,
              MM: {
                displayMM: true,
                orderMM: 0
              },
              OS: {
                displayOs: true,
                orderOs: 1
              },
              CPU: {
                displayUsage: true,
                orderUsage: 4,
                displayTemp: true,
                celciusTemp: true,
                orderTemp: 7,
                displayType: true,
                orderType: 2
              },
              RAM: {
                displayRam: true,
                orderRam: 5
              },
              STORAGE: {
                displayStorage: true,
                orderStorage: 6,
                partitionExclude : []
              },
              NETWORK: {
                displayNetwork: true,
                orderNetwork: 3,
                nativeNetwork: false,
                displayDefaultNetwork: true
              },
              UPTIME: {
                displayUptime: true,
                useMagicMirror: true,
                orderUptime: 8,
                displayRecord: true,
                orderRecord: 9
              },
              WARNING: {
                enableWarning: false,
                interval: 1000 * 60 * 5,
                check : {
                  CPU_TEMP : 65,
                  CPU_USAGE : 75,
                  STORAGE_USED : 80,
                  MEMORY_USED : 80,
                }
              }
            }
        },
        {
            module: 'MMM-MacAddressScan',
            position: "bottom_right",
            header: "ARP Scan - Discovered Devices",
            config: {
                showLastSeen: false,
                showLastSeenWhenOffline: false,
                sort: false,
                colored: true,
                showDeviceColumns: false,
                coloredState: true,
                showIP: true,
                showUnknown: false,
                showOffline: false,
                keepAlive: 900,
                updateInterval: 60,
                devices: [
    { macAddress: "b8:b7:f1:83:60:c8", name: "Wistron", icon: "mobile" },    // 10.0.1.101
    { macAddress: "3c:6a:9d:12:84:49", name: "Dexatek", icon: "mobile" },    // 10.0.1.12
    { macAddress: "48:e1:e9:29:51:ad", name: "Chengdu", icon: "mobile" },    // 10.0.1.128
    { macAddress: "58:d3:49:2a:9f:f7", name: "(Unknown)", icon: "mobile" },    // 10.0.1.131
    { macAddress: "f4:39:09:93:bd:49", name: "Hewlett", icon: "mobile" },    // 10.0.1.164
    { macAddress: "00:11:d9:60:8b:53", name: "TiVo", icon: "mobile" },    // 10.0.1.176
    { macAddress: "00:11:d9:60:8b:54", name: "TiVo", icon: "mobile" },    // 10.0.1.177
    { macAddress: "00:1d:ba:c3:c7:17", name: "Sony", icon: "mobile" },    // 10.0.1.193
    { macAddress: "e8:9f:80:14:95:fe", name: "(Unknown)", icon: "mobile" },    // 10.0.1.1
    { macAddress: "00:17:88:49:1a:cd", name: "Philips", icon: "mobile" },    // 10.0.1.20
    { macAddress: "00:1d:c0:62:42:67", name: "Enphase", icon: "mobile" },    // 10.0.1.24
    { macAddress: "3c:6a:9d:12:7d:7a", name: "Dexatek", icon: "mobile" },    // 10.0.1.243
    { macAddress: "c4:41:1e:f2:14:f5", name: "Belkin", icon: "mobile" },    // 10.0.1.246
    { macAddress: "d4:90:9c:da:31:9e", name: "Apple,", icon: "mobile" },    // 10.0.1.31
    { macAddress: "58:d3:49:0f:02:23", name: "(Unknown)", icon: "mobile" },    // 10.0.1.46
    { macAddress: "74:1b:b2:da:2e:d9", name: "Apple,", icon: "mobile" },    // 10.0.1.51
    { macAddress: "36:7f:9e:f1:78:5a", name: "(Unknown:", icon: "mobile" },    // 10.0.1.52
    { macAddress: "48:e1:e9:39:19:94", name: "Chengdu", icon: "mobile" },    // 10.0.1.54
    { macAddress: "00:3e:e1:c8:14:5b", name: "Apple,", icon: "mobile" },    // 10.0.1.57
    { macAddress: "dc:a6:32:e3:e5:48", name: "Raspberry", icon: "mobile" },    // 10.0.1.60
    { macAddress: "dc:a6:32:e3:e5:48", name: "Raspberry", icon: "mobile" },    // 10.0.1.60
    { macAddress: "00:7e:56:91:28:b2", name: "China", icon: "mobile" },    // 10.0.1.72
    { macAddress: "40:6c:8f:11:6a:79", name: "Apple,", icon: "mobile" },    // 10.0.1.74
    { macAddress: "00:04:20:f4:ea:9c", name: "Slim", icon: "mobile" },    // 10.0.1.79
    { macAddress: "1c:69:7a:65:19:9e", name: "EliteGroup", icon: "mobile" },    // 10.0.1.81
    { macAddress: "48:e1:e9:37:f0:1b", name: "Chengdu", icon: "mobile" },    // 10.0.1.83
    { macAddress: "48:e1:e9:37:f0:1b", name: "Chengdu", icon: "mobile" },    // 10.0.1.83
    { macAddress: "dc:a6:32:14:0a:b1", name: "Raspberry", icon: "mobile" },    // 10.0.1.85
    { macAddress: "dc:a6:32:14:0a:b1", name: "Raspberry", icon: "mobile" },    // 10.0.1.86
    { macAddress: "dc:a6:32:14:0a:b4", name: "Raspberry", icon: "mobile" },    // 10.0.1.86
    { macAddress: "dc:a6:32:14:0a:b4", name: "Raspberry", icon: "mobile" },    // 10.0.1.86
    { macAddress: "98:10:e8:f1:77:6d", name: "Apple,", icon: "mobile" },    // 10.0.1.88
    { macAddress: "c4:41:1e:f2:2e:cc", name: "Belkin", icon: "mobile" },    // 10.0.1.89
                ],

            },
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
