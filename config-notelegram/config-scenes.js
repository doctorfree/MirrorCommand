/* Magic Mirror Config
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * Modified by Ron Record http://ronrecord.com
 *     Intended to serve as the default MagicMirror configuration for a display
 *     that is not rotated but oriented normally in landscape mode.
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://docs.magicmirror.builders/configuration/introduction.html
 *
 */

var config = {
    address: "0.0.0.0", // Address to listen on, can be:
    port: 8080,
    ipWhitelist: [
        "0.0.0.0",
        "127.0.0.1",
        "AA.A.A.AA", // Mac Mini
        "BB.B.B.BBB", // iPad
        "CC.C.C.CC", // Mac Pro
        "DD.D.D.DDD", // Mac Pro over Tunnelblick
        "EE.E.E.EE", // Roon Core
        "FF.F.F.FF", // Mac Pro
        "GG.G.G.GG", // Ropieee
        "MM.M.M.MM", // Raspberry Pi MagicMirror
        "HH.H.H.HH", // Raspberry Pi 400
        "II.I.I.II", // iPad Air
        "JJ.J.J.JJ", // iPhone 12 Mini
        "::ffff:127.0.0.1",
        "::1",
    ],

    customCss: "css/custom-mirrorcommand.css",
    language: "en",
    locale: 'en-US',
    timeFormat: 12,
    units: "imperial",
    logLevel: ['INFO', 'LOG', 'WARN', 'ERROR'],
    // logLevel: ['DEBUG', 'INFO', 'LOG', 'WARN', 'ERROR'],
    useHttps: false, // Support HTTPS or not, default "false" will use HTTP
    httpsPrivateKey: '', // HTTPS private key path, only require when useHttps is true
    httpsCertificate: '', // HTTPS Certificate path, only require when useHttps is true
    
    electronOptions: {
        x: 0, // __X_OFFSET__ Do Not Remove
        y: 0, // __Y_OFFSET__ Do Not Remove
    },

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
                    shutdownCommand: '/usr/local/bin/myshutdown',
                    rebootCommand: '/usr/local/bin/myreboot',
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
		    module: "weather",
		    position: "top_right",
            header: "Current Weather",
            classes: 'scores stocks',
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
            classes: 'scores stocks',
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
                    // {
                    //     title: "Mercury News",
                    //     url: "https://www.mercurynews.com/feed"
                    // },
                ],
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            }
        },
        {
            module: 'MMM-Tools',
            position: 'bottom_right',
            classes: 'scores solar',
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
            module: "clock",
            position: "top_center",
            classes: 'scores solar stocks',
            config: {
                dateFormat: "dddd, LLL",
                timeFormat: "12",
                showPeriod: true,
                showDate: true,
                showTime: false,
            }
        },
        {
            module: "mmm-hue-lights",
            position: "upper_third",
            header: "Hue Lights",
            classes: 'solar',
            config: {
                bridgeIp: "xxxxxxxxxx_Hue-Hub-IP_xxxxxxxxxxxxxxxx",
                user: "xxxxxxxxxx_Hue-Hub-User_xxxxxxxxxxxxxxxx",
                // If you've added a Hue API user and set it in mirrorkeys
                // then replace the above setting of user with one of these
                // and rerun showkeys.
                // user: "xxxxxxxxx_Hue-Hub-User-Two_xxxxxxxxxxxx",
                // user: "xxxxxxxxx_Hue-Hub-User-Three_xxxxxxxxxx",
            }
        },
        {
            module: 'MMM-Solar',
            position: "bottom_left",
            classes: 'solar stocks',
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
                    '/usr/local/MirrorCommand/pics/Art/',
                ],
                slideshowSpeed: 30000, // 30 seconds
                transitionImages: true,
                randomizeImageOrder: true,
                recursiveSubDirectories: true,
                resizeImages: true,
                maxWidth: __WIDTH__, // __SET_MAX_WIDTH__ Do Not Remove
                maxHeight: __HEIGHT__, // __SET_MAX_HEIGHT__ Do Not Remove
                transitions: ['opacity', 'slideFromRight', 'slideFromLeft', 'slideFromTopLeft', 'slideFromTopRight', 'slideFromBottomLeft', 'slideFromBottomRight', 'flipX', 'flipY'],
            }
        },
        {
            module: "MMM-MyScoreboard",
            position: "top_left",
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
            module: 'MMM-Scenes',
            position: 'bottom_bar',
            classes: 'scores solar stocks art',
            config: {
                scenario: [
                    {
                        name: 'scores',
                        duration: 300000,
                        expelAnimation: 'pageUp',
                        admitAnimation: 'pageRight'
                    },
                    {
                        name: 'art',
                        duration: 900000,
                        expelAnimation: 'pageRight',
                        admitAnimation: [
                          { transform: 'rotate(-360deg) scale(0, 0)', opacity: 0 },
                          { transform: 'rotate(360deg) scale(1, 1)', opacity: 1 }
                        ]
                    },
                    {
                        name: 'solar',
                        duration: 300000,
                        expelAnimation: 'pageLeft',
                        admitAnimation: 'pageDown'
                    },
                    {
                        name: 'stocks',
                        duration: 300000,
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
        },
        {
            module: "EXT-Detector",
            classes: 'scores solar stocks art',
            position: "bottom_left",
            configDeepMerge: true,
            config: {
              debug: false,
              useIcon: false,
              touchOnly: false,
              detectors: [
                {
                  detector: "Porcupine",
                  Model: "computer",
                  Sensitivity: null
                },
                {
                  detector: "Porcupine",
                  Model: "ok google",
                  Sensitivity: null
                },
                {
                  detector: "Porcupine",
                  Model: "hey google",
                  Sensitivity: null
                }
              ]
            }
        },
        {
            module: "MMM-GoogleAssistant",
            classes: 'scores solar stocks art',
            position: "bottom_left",
            configDeepMerge: true,
            config: {
              debug: false,
              stopCommand: "stop",
              assistantConfig: {
                lang: "en-US",
                latitude: 36.970019,
                longitude: -122.042212,
                deviceRegistred: false
              },
              responseConfig: {
                useFullscreen: false,
                responseOutputCSS: "response_output.css",
                screenOutputTimer: 5000,
                useChime: true,
                confirmationChime: true
              },
              recipes: [
                "myReboot-Restart-Shutdown.js",
                "with-MMM-Scenes.js",
                "RoonCommand.js",
                "MirrorCommand.js"
              ]
            }
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
