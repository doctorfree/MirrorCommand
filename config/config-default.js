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
        "10.0.1.85", // Raspberry Pi MagicMirror
        "10.0.1.80", // Raspberry Pi 400
        "10.0.1.69", // iPad Air
        "10.0.1.52", // iPhone 12 Mini
        "::ffff:127.0.0.1",
        "::1",
    ],

    language: "en",
    timeFormat: 12,
    units: "imperial",
    
    modules: [
        {
            module: "alert",
        },
        {
            module: "updatenotification",
            position: "top_bar"
        },
        {
            module: 'MMM-Remote-Control',
            config: {
                apiKey: 'xxx_Remote-Control-API-Key_xxxxx',
                customCommand: {
                    shutdownCommand: '/usr/local/bin/shutdown',
                    rebootCommand: '/usr/local/bin/reboot',
                    monitorOnCommand: 'vcgencmd display_power 1',
                    monitorOffCommand: 'vcgencmd display_power 0',
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
            header: "Calendar Events",
            position: "top_left",
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
                        symbol: "calendar",
                        color: '#73FF33',
                        url: "http://localhost:8080/modules/default/calendar/calendars/home.ics"
                    },
                    {
                        symbol: "calendar",
                        color: '#BAA3DC',
                        url: "http://localhost:8080/modules/default/calendar/calendars/14D7ECFB-D078-4696-9558-E422AE330A63.ics"
                    },
                ]
            }
        },
        {
		    module: "weather",
		    position: "top_right",
		    config: {
             type: 'current',
             location: "Santa Cruz,United States",
             locationID: "5393052",
             units: "imperial",
             apiKey: "xx_OpenWeather-App-ID_xxxxxxxxxx"
		    }
	    },
        {
            module: "weather",
            position: "top_right",
            header: "Weather Forecast",
            config: {
			    type: 'forecast',
                location: "Santa Cruz,United States",
                locationID: "5393052",
                units: "imperial",
                showRainAmount: "true",
                colored: "true",
                apiKey: "xx_OpenWeather-App-ID_xxxxxxxxxx"
            }
        },
        // {
        //     module: "currentweather",
        //     position: "top_right",
        //     config: {
        //         location: "Santa Cruz",
        //         locationID: "5393052",
        //         units: "imperial",
        //         appid: "xx_OpenWeather-App-ID_xxxxxxxxxx"
        //     }
        // },
        // {
        //     module: "weatherforecast",
        //     position: "top_right",
        //     header: "Weather Forecast",
        //     config: {
        //         location: "Santa Cruz",
        //         locationID: "5393052",
        //         units: "imperial",
        //         showRainAmount: "true",
        //         colored: "true",
        //         appid: "xx_OpenWeather-App-ID_xxxxxxxxxx"
        //     }
        // },
        {
            module: "newsfeed",
            position: "top_bar",
            config: {
                feeds: [
                    {
                        title: "New York Times",
                        url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
                    },
                    {
                        title: "Washington Post",
                        url: "http://feeds.washingtonpost.com/rss/national"
                    },
                    {
                        title: "Mercury News",
                        url: "https://www.mercurynews.com/feed"
                    },
                ],
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            }
        },
        {
            module: 'MMM-SystemStats',
            position: "bottom_left",
            config: {
                updateInterval: 10000, // every 10 seconds
                align: 'right', // align labels
                header: 'System Stats', // This is optional
                units: 'imperial', // default, metric, imperial
                view: 'textAndIcon',
            }
        },
        {
            module: 'MMM-Tools',
            position: 'bottom_right',
            config: {
              device : "RPI", // "RPI" is also available
              refresh_interval_ms : 10000,
              warning_interval_ms : 1000 * 60 * 5,
              enable_warning : true,
              warning : {
                CPU_TEMPERATURE : 65,
                GPU_TEMPERATURE : 65,
                CPU_USAGE : 75,
                STORAGE_USED_PERCENT : 80,
                MEMORY_USED_PERCENT : 80
              },
              warning_text: {
                CPU_TEMPERATURE : "The temperature of CPU is over %VAL%",
                GPU_TEMPERATURE : "The temperature of GPU is over %VAL%",
                CPU_USAGE : "The usage of CPU is over %VAL%",
                STORAGE_USED_PERCENT : "The storage is used over %VAL% percent",
                MEMORY_USED_PERCENT : "The memory is used over %VAL% percent",
              }
            }
        },
        {
            module: "mmm-hue-lights",
            position: "upper_third",
            config: {
                bridgeIp: "10.0.1.20",
                user: "xxxxxxxxxx_Hue-Hub-User_xxxxxxxxxxxxxxxx",
            }
        },
        {
            module: 'MMM-Solar',
            position: "upper_third",
            config: {
                apiKey: "xxxxxx_Solar-API-Key_xxxxxxxxxxx",
                userId: "Solar-USER-ID",
                systemId: "Solar-System-ID",
                basicHeader: "true",
            }
        },
        {
            module: 'MMM-NetworkScanner',
            position: "bottom_center",
            header: "ARP Local Area Scan - Discovered Devices",
            config: {
                showLastSeen: false,
                showLastSeenWhenOffline: false,
                sort: false,
                colored: true,
                showDeviceColums: false,
                coloredState: true,
                // showIP can only be used with my modified version of the module
                // Comment showIP out if using the stock MMM-NetworkScanner module
                showIP: true,
                showUnknown: false,
                showOffline: true,
                keepAlive: 900,
                updateInterval: 60,
                // residents: ["iPhone 12 Mini"],
                // occupiedCMD: {
                //     notification: 'REMOTE_ACTION',
                //     payload: {
                //         action: 'MONITORON'
                //     }
                // },
                // vacantCMD  : {
                //     notification: 'REMOTE_ACTION',
                //     payload: {
                //         action: 'MONITOROFF'
                //     }
                // },
                devices: [
                    {
                      macAddress: "98:10:e8:f1:77:6d",
                      name: "Mac Mini",
                      icon: "desktop",
                      color: "#F61DF3",
                    },
                    {
                      macAddress: "40:6C:8F:11:6A:79",
                      name: "Macbook Air",
                      icon: "desktop",
                      color: "#F61DF3",
                    },
                    {
                      macAddress: "00:3e:e1:c8:14:5b",
                      name: "Mac Pro",
                      icon: "desktop",
                      color: "#F61DF3",
                    },
                    {
                      macAddress: "74:1b:b2:da:2e:d9",
                      name: "Mac Pro WiFi",
                      icon: "desktop",
                      color: "#F61DF3",
                    },
                    {
                      macAddress: "d4:90:9c:da:31:9e",
                      name: "Homepod Max",
                      icon: "music",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "58:d3:49:2a:9f:f7",
                      name: "Homepod Mini Left",
                      icon: "music",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "58:d3:49:0f:02:23",
                      name: "Homepod Mini Right",
                      icon: "music",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "1c:69:7a:65:19:9e",
                      name: "Roon ROCK",
                      icon: "music",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "b0:6e:bf:2b:3a:f8",
                      name: "Miner - doctor",
                      icon: "hammer",
                      color: "#ffff00",
                    },
                    // { macAddress: "30:85:a9:8d:02:9d",
                    //   name: "Miner - vivo",
                    //   icon: "hammer",
                    //   color: "#ffff00"},
                    {
                      macAddress: "4c:cc:6a:27:be:6a",
                      name: "Miner - ronnie",
                      icon: "hammer",
                      color: "#ffff00",
                    },
                    {
                      ipAddress: "10.0.1.80",
                      name: "Raspberry Pi 400",
                      icon: "signal",
                      color: "#00ff00",
                    },
                    {
                      macAddress: "dc:a6:32:75:32:ef",
                      name: "RPi Ropieee",
                      icon: "signal",
                      color: "#00ff00",
                    },
                    // {
                    //   macAddress: "dc:a6:32:14:0a:b1",
                    //   name: "RPi MagicMirror",
                    //   icon: "signal",
                    //   color: "#00ff00",
                    // },
                    // {
                    //   macAddress: "dc:a6:32:14:0a:b4",
                    //   name: "MagicMirror",
                    //   icon: "signal",
                    //   color: "#00ff00",
                    // },
                    {
                      macAddress: "2E:0E:84:7B:ED:39",
                      name: "Ronnie's iPad",
                      icon: "tablet",
                      color: "#DE41EF",
                    },
                    {
                      macAddress: "00:1F:F3:C7:0D:15",
                      name: "Time Capsule",
                      icon: "database",
                      color: "#DE41EF"},
                    {
                      macAddress: "36:7F:9E:F1:78:5A",
                      name: "iPhone 12 Mini",
                      icon: "mobile",
                      color: "#DE41EF",
                    },
                    {
                      macAddress: "00:1d:c0:62:42:67",
                      name: "Rooftop Solar Array",
                      icon: "solar-panel",
                      color: "#83EE97",
                    },
                    {
                      macAddress: "00:17:88:49:1a:cd",
                      name: "Philips Hue",
                      icon: "lightbulb",
                      color: "#83EE97",
                    },
                    {
                      macAddress: "00:04:20:f4:ea:9c",
                      name: "Harmony Hub",
                      icon: "weight",
                      color: "#83EE97",
                    },
                    {
                      macAddress: "C8:69:CD:84:EC:47",
                      name: "Apple TV",
                      icon: "tv",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "00:11:d9:60:8b:53",
                      name: "TiVo",
                      icon: "tv",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "00:1d:ba:c3:c7:17",
                      name: "Sony TV",
                      icon: "tv",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "e8:9f:80:14:95:fe",
                      name: "Linksys Velops Router",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "C4:41:1E:F2:14:F5",
                      name: "Kitchen WiFi Router",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "C4:41:1E:F2:2E:CC",
                      name: "Main Bedroom WiFi Router",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "C4:41:1E:F2:38:72",
                      name: "Guest Bedroom WiFi Router",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "C4:41:1E:F1:57:31",
                      name: "Workshop WiFi Router",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                ],
            },
        },
        // {
        //     module: 'MMM-TelegramBot',
        //     config: {
        //       telegramAPIKey : 'xxxxxx_Your-Telegram-API-Key_xxxxxxxxxxxxxxxxx',
        //       allowedUser : ['Your-Telegram-Username'],
        //       adminChatId : Your-Telegram-Chat-ID,
        //       useWelcomeMessage: true,
        //       verbose: false,
        //       favourites:["/hideall", "/showall", "/screenshot", "/shutdown"],
        //       screenshotScript: "scrot",
        //       detailOption: {},
        //       customCommands: [],
        //     }
        // },
        // {
        //     module: "MMM-GoogleAssistant",
        //     position: "top_right",
        //     config: {
        //         maxWidth: "100%",
        //         header: "",
        //     publishKey: 'xxxxxx_Your-GoogleVoice-Pub-Key_xxxxxxxx',
        //     subscribeKey: 'xxxxxx_Your-GoogleVoice-Sub-Key_xxxxxxxx',
        //     updateDelay: 500
        //     }
        // },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
