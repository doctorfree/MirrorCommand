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
//	address: "localhost",
	address: "0.0.0.0", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
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
        "HH.H.H.HH", // Raspberry Pi 400
        "II.I.I.II", // iPad Air
        "JJ.J.J.JJ", // iPhone 12 Mini
        "KK.K.K.KK", // Ubuntu MagicMirror
        "::ffff:127.0.0.1",
        "::1",
    ],

    customCss: "css/custom.css",
	language: "en",
	timeFormat: 12,
	units: "imperial",
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
			position: "top_center"
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
              favourites: [
                  "/hideip",
                  "/showip",
                  "/hideOffline",
                  "/showOffline",
                  "/myReboot",
                  "/myShutdown"
              ],
              screenshotScript: "scrot",
              detailOption: {},
            },
        },
        {
            module: "clock",
            position: "top_center",
            config: {
                dateFormat: "dddd, LLL",
                timeFormat: "12",
                showPeriod: true,
                showDate: true,
                showTime: false,
            }
        },
		{
			module: "calendar",
			header: "Calendar Events",
			position: "top_center",
			config: {
                colored: true,
                maximumNumberOfDays: 14,
                maximumEntries: 40,
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
		    position: "top_left",
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
                  useWelcome: true,
                  welcome: "brief"
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
                  musicPath: "/home/pi/Music",
                  checkSubDirectory: true,
                  autoStart: false,
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
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
