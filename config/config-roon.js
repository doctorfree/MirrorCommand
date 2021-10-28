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
            module: 'MMM-iFrame',
            position: 'fullscreen_below',
            config: {
                url: [ "http://10.0.1.81:9100/display/" ],
                updateInterval: 30 * 60 * 1000, // rotate URLs every 30 minutes
                width: "1080", // width of iframe
                height: "756", // height of iframe
                frameWidth: "1080"
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
            position: "middle_center",
            // position: "lower_third",
            config: {
                bridgeIp: "10.0.1.20",
                displayType: "grid",
                minimalGrid: false,
                updateInterval: 180000,
                user: "xxxxxxxxxx_Hue-Hub-User_xxxxxxxxxxxxxxxx",
            }
        },
        {
            module: 'MMM-Solar',
            position: "middle_center",
            config: {
                apiKey: "xxxxxx_Solar-API-Key_xxxxxxxxxxx",
                userId: "Solar-USER-ID",
                systemId: "Solar-System-ID",
                // basicHeader: "true",
            }
        },
        {
            module: 'MMM-MacAddressScan',
            position: "bottom_center",
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
            module: 'MMM-TelegramBot',
            config: {
              telegramAPIKey : 'xxxxxx_Your-Telegram-API-Key_xxxxxxxxxxxxxxxxx',
              allowedUser : ['Your-Telegram-Username'],
              adminChatId : Your-Telegram-Chat-ID,
              useWelcomeMessage: true,
              verbose: false,
              favourites:["/hideip", "/showip", "/hideOffline", "/showOffline"],
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
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
