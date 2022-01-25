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
    address: "0.0.0.0",
    // address: "localhost",
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
    customCss: "css/custom-huebig.css",
    electronOptions: {
        x: 0, // __X_OFFSET__ Do Not Remove
        y: 0, // __Y_OFFSET__ Do Not Remove
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
                ]
            }
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
            module: "mmm-hue-lights",
            position: "middle_center",
            header: 'Hue Lights',
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
                // DO NOT REMOVE __ARP_SCAN_DEVICES__
                devices: [],
            },
        },
        {
            module: "MMM-GoogleAssistant",
            position: "bottom_center",
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
                useEXT: true,
                youtube: {
                  useYoutube: true,
                  youtubeCommand: "youtube",
                  displayResponse: true,
                  useVLC: true,
                  minVolume: 30,
                  maxVolume: 100
                },
                links: {
                  useLinks: true,
                  displayDelay: 60 * 1000,
                  scrollActivate: false,
                  scrollStep: 25,
                  scrollInterval: 1000,
                  scrollStart: 5000
                },
                photos: {
                  usePhotos: true,
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
                  useVolume: true,
                  volumePreset: "ALSA_HEADPHONE",
                  myScript: "amixer sset -M 'Headphone' #VOLUME#%"
                },
                welcome: {
                  useWelcome: false,
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
                music: {
                  useMusic: true,
                  useUSB: false,
                  musicPath: "/media/pi/Transcend/Audio/Snow_Crash",
                  checkSubDirectory: true,
                  autoStart: true,
                  minVolume: 30,
                  maxVolume: 100
                },
              },
              recipes: [
                "myReboot-Restart-Shutdown.js",
                "ExtRadio.js","MirrorCommand.js",
              ],
              NPMCheck: {}
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
              ],
              NPMCheck: {
                useChecker: true,
                delay: 10 * 60 * 1000,
                useAlert: true
              }
            }
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
