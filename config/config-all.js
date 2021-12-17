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
                maximumEntries: 20,
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
            module: "clock",
            position: "upper_third",
            config: {
                dateFormat: "dddd, LLL",
                displayType: "analog",
                analogFace: "face-009",
                analogSize: "200px",
                displaySeconds: "true",
                secondsColor: "#BAA3DC",
                timeFormat: "12",
                showPeriod: "true",
                showDate: "true",
                clockBold: "false",
                analogPlacement: "top",
                analogShowDate: "top",
            }
        },
        {
            module: 'MMM-GoogleMapsTraffic',
            position: 'middle_center',
            config: {
                key: 'xxxxxx_Your-GoogleMapsTraffic-Key_xxxxxxxxxxx',
                lat: 36.970019,
                lng: -122.042212,
                height: '1240px',
                width: '1080px',
                styledMapType: "standard",
                disableDefaultUI: true,
                backgroundColor: 'hsla(0, 0%, 0%, 0)',
                markers: [
                    {
                        lat: 36.970019,
                        lng: -122.042212,
                        fillColor: '#9966ff'
                    },
                ],
            },
        },
        {
		    module: "weather",
		    position: "top_right",
            header: "Current Weather",
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
                    // {
                    //     title: "Mercury News",
                    //     url: "https://www.mercurynews.com/feed"
                    // },
                    {
                        title: "Centers for Disease Control",
                        url: "https://tools.cdc.gov/api/v2/resources/media/403372.rss"
                    },
                    {
                        title: "Johns Hopkins Medicine",
                        url: "https://www.hopkinsmedicine.org/news/media/releases/?format=rss"
                    },
                    {
                        title: "World Health Organization",
                        url: "https://www.who.int/feeds/entity/csr/don/en/rss.xml"
                    },
                ],
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            }
        },
        {
            module: 'MMM-Solar',
            position: "bottom_left",
            config: {
                apiKey: "xxxxxx_Solar-API-Key_xxxxxxxxxxx",
                userId: "Solar-USER-ID",
                systemId: "Solar-System-ID",
                // basicHeader: "true",
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
		    module: "MMM-DateOnly",
		    position: "top_bar",
		    config: {
                showWeek: false,
                dateFormat: "dddd, LLL",
		    }
	    },
        {
            module: 'MMM-CoinMarketCap',
            position: "middle_center",
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
            module: 'MMM-stocks',
            position: 'bottom_bar',
            config: {
              apiKey: 'xxxxx_Stocks-API-Key_xxxxxxxxxxxxx',
              crypto: 'FILUSDT,ADAUSDT',
              separator: '&nbsp;&nbsp;•&nbsp;&nbsp;', // separator between stocks
              stocks: 'CND,ETHO,MIGFX,MSEGX,TRBCX,CGC,AAPL,JOBY', // stock symbols
              updateInterval: 1000000 // update interval in milliseconds (16:40)
            }
        },
        {
            module: "mmm-hue-lights",
            position: "middle_center",
            header: 'Hue Lights',
            config: {
                bridgeIp: "xxxxxxxxxx_Hue-Hub-IP_xxxxxxxxxxxxxxxx",
                displayType: "grid",
                minimalGrid: false,
                updateInterval: 180000,
                user: "xxxxxxxxxx_Hue-Hub-User_xxxxxxxxxxxxxxxx",
                // If you've added a Hue API user and set it in mirrorkeys
                // then replace the above setting of user with one of these
                // and rerun showkeys.
                // user: "xxxxxxxxx_Hue-Hub-User-Two_xxxxxxxxxxxx",
                // user: "xxxxxxxxx_Hue-Hub-User-Three_xxxxxxxxxx",
            }
        },
        {
            module: 'MMM-iFrame',
            position: 'fullscreen_below',
            config: {
                url: [ "http://EE.E.E.EE:__Roon_Core_Port__/display/" ],
                updateInterval: 30 * 60 * 1000, // rotate URLs every 30 minutes
                width: "1080", // width of iframe
                height: "756", // height of iframe
                frameWidth: "1080"
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
                showOffline: true,
                keepAlive: 900,
                updateInterval: 60,
                // DO NOT REMOVE __ARP_SCAN_DEVICES__
                devices: [],
            },
        },
        {
            module: 'MMM-COVID19-SPARKLINE',
              position: "middle_center",
              config : {
                worldStats: true,
                sparklines: true,
                sparklineWidth: 100,
                sparklineHeight: 55,
                sparklineDays: 50,
                sparklineDeltavsDaily: true,
                sortby: "confirmed",
                columns: ["confirmed", "deaths", "recovered"],
                countries: ["US", "Mexico", "Brazil", "Canada", "Italy", "Germany", "China"],
                updateInterval: 1000 * 60 * 60 * 3,  //3 hours
                infoRowClass: "medium",
                headerRowClass: "small",
                fadeSpeed: 1000,
                showDelta: true,
                showDeltaPlotNDays: 7,
                sparklineDeathScale: -4,
                showDelimiter: true
              }
        },
        {
            module: 'MMM-RAIN-RADAR',
            position: 'top_center',
            disabled: false,
            config: {
                useHeader: false, // true if you want a header
                lat: "36.970019",
                lon: "-122.042212",
                area: 'CA', // US State
                zoomLevel: 8,
                mapType: 1, //0-Road Map 1-Satellite 2-Dark Map 3-OpenStreetMaps 4-Light Map
                color: 3, //0-Original 1-Universal Blue 2-TITAN 3-The Weather Channel
                          //5-NEXRAD Level-III 6-RAINBOW @ SELEX-SI
                snow: 1,
                smoothing: 1,
                opacity: 88,
                fastAnimation: 0,
                coverage: 0,
                darkTheme: 1,
                UTCtime: 0,
                legend: 1,
                legendMin: 0, //set legend to 1 if you want legendMin to show
                animate: 1,
                // 1: after updateInterval, weather warnings for your US states will be used
                // to determine if module should be hidden. 0 module is perpertually displayed
                updateOnWarning: 1,
                // number of milliseconds. change 5 to 60 and it will update each 10 minutes
                updateInterval: 60 * 60 * 1000,
            }
        },
		{
            module: "MMM-DarkSkyForecast",
            header: "Dark Sky Weather Forecast",
            position: "top_center",
            classes: "default everyone",
            disabled: false,
            config: {
              apikey: "xxx_Dark-Sky-API-Key_xxxxxxxxxxx",
		      latitude: "36.970019",
		      longitude: "-122.042212",
              iconset: "5c",
              concise: false,
			  units: "us",
              forecastLayout: "tiled"
            }
        },
        {
            module: 'MMM-TelegramCommands'
        },
        {
            module: 'MMM-TelegramBot',
            config: {
              telegramAPIKey : 'xxxxxx_Your-Telegram-API-Key_xxxxxxxxxxxxxxxxx',
              allowedUser : ['Your-Telegram-Username'],
              adminChatId : 0000000000,
              useWelcomeMessage: true,
              verbose: false,
              favourites:["/hideip", "/showip", "/hideOffline", "/showOffline"],
              screenshotScript: "scrot",
              detailOption: {},
            }
        },
        {
            module: "MMM-Detector",
            position: "bottom_center",
            configDeepMerge: true,
            config: {
              debug: false,
              autoStart: true,
              useLogos: true,
              newLogos: {
                listen: "voice_assistant_head.jpg"
              },
              detectors: [
                {
                  detector: "Porcupine",
                  Model: "ok google",
                  Sensitivity: null,
                  Logo: "listen",
                  autoRestart: false,
                  onDetected: {
                    notification: "GA_ACTIVATE"
                  }
                },
                {
                  detector: "Porcupine",
                  Model: "hey google",
                  Sensitivity: null,
                  Logo: "listen",
                  autoRestart: false,
                  onDetected: {
                    notification: "GA_ACTIVATE"
                  }
                },
                {
                  detector: "Porcupine",
                  Model: "computer",
                  Sensitivity: null,
                  Logo: "listen",
                  autoRestart: false,
                  onDetected: {
                    notification: "GA_ACTIVATE"
                  }
                }
              ],
              NPMCheck: {
                useChecker: true,
                delay: 10 * 60 * 1000,
                useAlert: true
              }
            }
        },
        {
            module: "MMM-GoogleAssistant",
            position: "top_center",
            configDeepMerge: true,
            config: {
              debug: false,
              assistantConfig: {
                lang: "en-US",
                latitude: 36.970019,
                longitude: -122.042212
              },
              responseConfig: {
                useFullscreen: false,
                useResponseOutput: true,
                responseOutputCSS: "response_output.css",
                screenOutputTimer: 5000,
                activateDelay: 250,
                useAudioOutput: true,
                useChime: true,
                confirmationChime: true,
                useInformations: true,
              },
              Extented: {
                useEXT: false,
                youtube: {
                  useYoutube: true,
                  youtubeCommand: "youtube",
                  displayResponse: true,
                  useVLC: true,
                  minVolume: 30,
                  maxVolume: 100
                },
                links: {
                  useLinks: false,
                  displayDelay: 60 * 1000,
                  scrollActivate: false,
                  scrollStep: 25,
                  scrollInterval: 1000,
                  scrollStart: 5000
                },
                photos: {
                  usePhotos: false,
                  useGooglePhotosAPI: false,
                  displayType: "none",
                  displayDelay: 10 * 1000,
                  albums: [],
                  sort: "new",
                  hiResolution: true,
                  timeFormat: "DD/MM/YYYY HH:mm",
                  moduleHeight: 300,
                  moduleWidth: 300,
                },
                volume: {
                  useVolume: false,
                  // volumePreset: "ALSA_HEADPHONE",
                  myScript: "/usr/local/bin/vol"
                },
                welcome: {
                  useWelcome: true,
                  welcome: "brief Today"
                },
                screen: {},
                touch: {},
                pir: {},
                governor: {},
                internet: {},
                cast: {},
                spotify: {
                  useSpotify: false,
                  visual: {},
                  player: {}
                },
              },
              recipes: ["myReboot-Restart-Shutdown.js"],
              NPMCheck: {}
            }
        },
        {
            module: 'MMM-pages',
            config: {
                modules:
                    [
                        ["MMM-iFrame", "MMM-Tools", "MMM-Solar",
                         "mmm-hue-lights", "MMM-MacAddressScan"],

                        ["weather", "clock", "calendar", "newsfeed",
                         "MMM-Tools", "MMM-Solar", "mmm-hue-lights",
                         "MMM-MacAddressScan"],

                        ["clock", "MMM-COVID19-SPARKLINE", "newsfeed",
                         "MMM-DateOnly", "MMM-Tools"],

                        ["weather", "clock", "MMM-GoogleMapsTraffic",
                         "newsfeed", "MMM-DateOnly"],

                        ["weather", "clock", "MMM-CoinMarketCap",
                         "MMM-stocks", "MMM-DateOnly", "newsfeed"],

                        ["weather", "clock", "MMM-RAIN-RADAR",
                         "MMM-DarkSkyForecast", "MMM-DateOnly"],
                    ],
                fixed:
                    ["alert", "updatenotification", "MMM-Remote-Control", "MMM-Detector",
                     "MMM-TelegramBot", "MMM-TelegramCommands", "MMM-GoogleAssistant"],
                rotationTime: 300000, // rotate page every 5 minutes = 5 * 60 * 1000
            }
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
