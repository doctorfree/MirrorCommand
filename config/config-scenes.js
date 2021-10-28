/* Magic Mirror Config
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * Modified by Ron Record http://ronrecord.com
 *     Intended to serve as the default MagicMirror configuration for a display
 *     that is not rotated but oriented normally in landscape mode.
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
    locale: 'en-US',
    timeFormat: 12,
    units: "imperial",
    logLevel: ['INFO', 'LOG', 'WARN', 'ERROR'],
    // logLevel: ['DEBUG', 'INFO', 'LOG', 'WARN', 'ERROR'],
    useHttps: false, // Support HTTPS or not, default "false" will use HTTP
    httpsPrivateKey: '', // HTTPS private key path, only require when useHttps is true
    httpsCertificate: '', // HTTPS Certificate path, only require when useHttps is true
    
    modules: [
        {
            module: "alert",
            classes: 'scores solar stocks art',
        },
        {
            module: "updatenotification",
            position: "top_bar",
            classes: 'scores solar stocks art',
        },
        {
            module: 'MMM-Remote-Control',
            classes: 'scores solar stocks art',
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
                },
                showModuleApiMenu: true,
                secureEndpoints: true,
                customMenu: "custom_menu.json",
            }
        },
        {
            module: "calendar",
            header: "Calendar Events",
            position: "top_left",
            classes: 'scores solar stocks',
            config: {
                colored: true,
                maximumNumberOfDays: 7,
                maximumEntries: 10,
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
//                  {
//                      symbol: "calendar",
//                      color: '#33FFFA',
//                      url: "http://localhost:8080/modules/default/calendar/calendars/W14D7ECFB-D078-4696-9558-E422AE330A63.ics"
//                  }
                ]
            }
        },
        {
		    module: "weather",
		    position: "top_right",
            header: "Current Weather",
            classes: 'scores solar stocks',
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
            classes: 'scores solar stocks',
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
        {
            module: "newsfeed",
            position: "top_bar",
            classes: 'stocks',
            config: {
                feeds: [
                    {
                        title: "CoinDesk",
                        url: "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml"
                    },
                    {
                        title: "CoinJournal",
                        url: "https://coinjournal.net/news/tag/usa/feed/"
                    },
                    {
                        title: "CoinTelegraph",
                        url: "https://cointelegraph.com/rss/tag/altcoin"
                    },
                ],
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            }
        },
        {
            module: "newsfeed",
            position: "top_bar",
            classes: 'scores',
            config: {
                feeds: [
                    {
                        title: "Sporting News",
                        url: "https://www.sportingnews.com/rss"
                    },
                    {
                        title: "ESPN Sports News",
                        url: "https://www.espn.com/espn/rss/news"
                    },
                    {
                        title: "Independent Sports News",
                        url: "https://www.independent.co.uk/sport/rss"
                    },
                ],
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            }
        },
        {
            module: "newsfeed",
            position: "top_bar",
            classes: 'solar',
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
            module: 'MMM-Tools',
            position: 'bottom_left',
            header: "System Info",
            classes: 'scores solar stocks',
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
		    module: "MMM-DateOnly",
		    position: "upper_third",
            classes: 'scores solar stocks',
		    config: {
                showWeek: false,
                dateFormat: "dddd, LLL",
		    }
	    },
        {
            module: "mmm-hue-lights",
            position: "middle_center",
            header: "Hue Lights",
            classes: 'solar',
            config: {
                bridgeIp: "10.0.1.20",
                user: "xxxxxxxxxx_Hue-Hub-User_xxxxxxxxxxxxxxxx",
            }
        },
        {
            module: 'MMM-Solar',
            position: "bottom_center",
            classes: 'solar',
            config: {
                apiKey: "xxxxxx_Solar-API-Key_xxxxxxxxxxx",
                userId: "Solar-USER-ID",
                systemId: "Solar-System-ID",
                // basicHeader: "true",
            }
        },
        {
            module: 'MMM-CoinMarketCap',
            position: "middle_center",
            classes: 'stocks',
            header: "Cryptocurrency Prices",
            config: {
                apiKey: 'xxxxx_CoinMarket-API-Key_xxxxxxxxx',
                currencies: ['ADA', 'FIL', 'The Graph', 'AGIX', 'HNT', 'ICP', 'ETH' ],
                view: 'graphWithChanges',
                columns: [ 'logo', 'name', 'priceWithChanges', 'graph' ],
                fontSize: 'medium',
                percentChangeColored: true,
                logoColored: true,
                graphRange: 7,
                graphSize: 'medium',
                graphColored: true,
                conversion: 'USD',
            }
        },
        {
            module: 'MMM-BackgroundSlideshow',
            position: 'fullscreen_below',
            classes: 'art',
            config: {
                imagePaths: [
                    'modules/MMM-BackgroundSlideshow/pics/Art/Kandinsky/',
                    'modules/MMM-BackgroundSlideshow/pics/Art/Klee/',
                    'modules/MMM-BackgroundSlideshow/pics/fractals/',
                    'modules/MMM-BackgroundSlideshow/pics/Art/Picasso/',
                    'modules/MMM-BackgroundSlideshow/pics/Art/Zdzisław_Beksiński/',
                ],
                slideshowSpeed: 15000, // 15 seconds
                transitionImages: true,
                randomizeImageOrder: true,
                recursiveSubDirectories: true,
                resizeImages: true,
                maxWidth: 1080,
                maxHeight: 1920,
                transitions: ['opacity', 'slideFromRight', 'slideFromLeft', 'slideFromTopLeft', 'slideFromTopRight', 'slideFromBottomLeft', 'slideFromBottomRight', 'flipX', 'flipY'],
            }
        },
        {
            module: "MMM-MyScoreboard",
            position: "middle_center",
            classes: "scores default everyone",
            header: "Sports Scoreboard",
            config: {
              showLeagueSeparators: true,
              colored: true,
              viewStyle: "largeLogos",
              sports: [
                {
                  league: "NHL",
                  teams: ["SJ"],
                },
                {
                  league: "NBA",
                  teams: ["GS"],
                  groups: ["Pacific"]
                },
                {
                  league: "MLB",
                  teams: ["SF", "LAD", "BOS"],
                  groups: ["NL West"]
                },
                {
                  league: "NFL",
                  teams: ["OAK", "LAR", "SF", "ARI"],
                  groups: ["NFC West", "AFC West"]
                },
                {
                  league: "NCAAF",
                  teams: ["OKLA", "OKST"],
                }
              ]
            }
        },
        {
            module: 'MMM-MacAddressScan',
            position: "bottom_right",
            classes: 'scores solar stocks',
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
                      macAddress: "d4:90:9c:da:31:9e",
                      name: "Homepod",
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
                      name: "Linksys Router",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                ],
            },
        },
        {
            module: 'MMM-TelegramBot',
            classes: 'scores solar stocks art',
            config: {
              telegramAPIKey : 'xxxxxx_Your-Telegram-API-Key_xxxxxxxxxxxxxxxxx',
              allowedUser : ['Your-Telegram-Username'],
              adminChatId : Your-Telegram-Chat-ID,
              useWelcomeMessage: true,
              verbose: false,
              favourites:["/scene next", "/scene prev", "/screenshot", "/shutdown"],
              screenshotScript: "scrot",
              detailOption: {},
              customCommands: [
                {
                  command: 'myReboot',
                  description: "Executes custom MagicMirror `reboot` command",
                  callback: (command, handler, self) => {
                      var exec = "/usr/local/bin/reboot"
                      handler.reply("TEXT", "Executing command: " + exec)
                      var sessionId = Date.now() + "_" + self.commonSession.size
                      if (exec) {
                        self.commonSession.set(sessionId, handler)
                        self.sendSocketNotification("SHELL", {
                          session: sessionId,
                          exec: exec
                        })
                      }
                  },
                },
                {
                  command: 'myShutdown',
                  description: "Executes custom MagicMirror `shutdown` command",
                  callback: (command, handler, self) => {
                      var exec = "/usr/local/bin/shutdown"
                      handler.reply("TEXT", "Executing command: " + exec)
                      var sessionId = Date.now() + "_" + self.commonSession.size
                      if (exec) {
                        self.commonSession.set(sessionId, handler)
                        self.sendSocketNotification("SHELL", {
                          session: sessionId,
                          exec: exec
                        })
                      }
                  },
                },
                {
                  command: 'mirror',
                  description: "Executes MagicMirror `mirror` command\nTry `/mirror status`.",
                  callback: (command, handler, self) => {
                      if (handler.args) {
                        var exec = "mirror -D " + handler.args
                      } else {
                        var exec = "mirror -D status"
                      }
                      handler.reply("TEXT", "Executing command: " + exec)
                      var sessionId = Date.now() + "_" + self.commonSession.size
                      if (exec) {
                        self.commonSession.set(sessionId, handler)
                        self.sendSocketNotification("SHELL", {
                          session: sessionId,
                          exec: exec
                        })
                      }
                  },
                },
              ],
            }
        },
        {
            module: 'MMM-Scenes',
            position: 'bottom_bar',
            classes: 'scores solar stocks art',
            config: {
                duration: 300000,
                scenario: [
                    {
                        name: 'scores',
                        expelAnimation: 'pageUp',
                        admitAnimation: 'pageRight'
                    },
                    {
                        name: 'art',
                        expelAnimation: 'pageRight',
                        admitAnimation: [
                          { transform: 'rotate(-360deg) scale(0, 0)', opacity: 0 },
                          { transform: 'rotate(360deg) scale(1, 1)', opacity: 1 }
                        ]
                    },
                    {
                        name: 'solar',
                        expelAnimation: 'pageLeft',
                        admitAnimation: 'pageDown'
                    },
                    {
                        name: 'stocks',
                        expelAnimation: 'dismissOut',
                        admitAnimation: 'pageDown'
                    },
                ],
                autoLoop: 'infinity',
                // inactiveIndicators: ['①', '②', '③', '④', '⑤'],
                // activeIndicators: ['❶', '❷', '❸', '❹', '❺']
                inactiveIndicators: ['①', '②', '③', '④'],
                activeIndicators: ['❶', '❷', '❸', '❹']
            }
        }
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
