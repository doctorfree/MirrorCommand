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
        "KK.K.K.KK", // Raspberry Pi MagicMirror
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
        x: 1920, // __X_OFFSET__ Do Not Remove
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
                    {
                      macAddress: "30:85:a9:8d:02:9d",
                      name: "Miner - doctorwhen",
                      icon: "hammer",
                      color: "#ffff00",
                    },
                    {
                      // macAddress: "4c:cc:6a:27:be:6a",
                      ipAddress: "KK.K.K.KK",
                      name: "Miner - ronnie",
                      icon: "hammer",
                      color: "#ffff00",
                    },
                    {
                      ipAddress: "HH.H.H.HH",
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
                      name: "Linksys Router",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "C4:41:1E:F2:14:F5",
                      name: "Kitchen WiFi",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "C4:41:1E:F2:2E:CC",
                      name: "Main Bedroom WiFi",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "C4:41:1E:F2:38:72",
                      name: "Guest Bedroom WiFi",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                    {
                      macAddress: "C4:41:1E:F1:57:31",
                      name: "Workshop WiFi",
                      icon: "wifi",
                      color: "#26C6DA",
                    },
                ],
            },
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
