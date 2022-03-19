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

    customCss: "css/custom-mirrorcommand.css",
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
            position: "top_bar"
        },
        {
            module: 'MMM-Remote-Control',
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
            position: "upper_third",
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
            module: 'MMM-Solar',
            position: "upper_third",
            config: {
                apiKey: "xxxxxx_Solar-API-Key_xxxxxxxxxxx",
                userId: "Solar-USER-ID",
                systemId: "Solar-System-ID",
                // basicHeader: "true",
            }
        },
        {
	        module: 'internet-monitor',
            position: 'top_center',
            header: 'Speed Test',
            config:{
                type: '',
                maxTime: 20000,
                updateInterval: 0,
                verbose: false,
                displayStrength: true,
                displaySpeed: true,
                strengthIconSize: 80,
                maxGaugeScale: 120,
		        // wifiSymbol:{
                //     size: 80,
                //     fullColor: '#3afc25',
                //     almostColor: '#ffff0c',
                //     halfColor: '#ff8c00',
	            //     noneColor: '#ff1111'
		        // },
            },
	    },
        {
            module: 'MMM-MacAddressScan',
            position: "bottom_right",
            header: "ARP Scan - Discovered Devices",
            config: {
                showLastSeen: false,
                showLastSeenWhenOffline: true,
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
            module: 'Gateway'
        },
        {
            module: "EXT-Detector",
            position: "bottom_left",
            configDeepMerge: true,
            config: {
              debug: false,
              useIcon: true,
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
                "RoonCommand.js",
                "MirrorCommand.js"
              ]
            }
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
