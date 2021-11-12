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
//    address: "localhost",
    address: "0.0.0.0", // Address to listen on, can be:
                          // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
                          // - another specific IPv4/6 to listen on a specific interface
                          // - "", "0.0.0.0", "::" to listen on any interface
                          // Default, when address config is left out, is "localhost"
    port: 8080,
    // Set [] to allow all IP addresses
    // or add a specific IPv4 of 192.168.1.5 :
    // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
    // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
    // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],
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

    customCss: "css/custom-ironman.css",
    language: "en",
    timeFormat: 12,
    units: "imperial",
    // serverOnly:  true/false/"local" ,
                 // local for armv6l processors, default 
                 //   starts serveronly and then starts chrome browser
                 // false, default for all  NON-armv6l devices
                 // true, force serveronly mode, because you want to.. no UI on this device
    
    modules: [
        {
            module: "alert",
        },
        {
            module: "updatenotification",
            classes: 'everyone',
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
            module: 'MMM-TelegramBot',
            config: {
              telegramAPIKey : 'xxxxxx_Your-Telegram-API-Key_xxxxxxxxxxxxxxxxx',
              allowedUser : ['Your-Telegram-Username'],
              adminChatId : Your-Telegram-Chat-ID,
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
            },
        },
        {
            module: "MMM-IronManGIF",
            position: "middle_center",
            classes: 'default everyone',
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
            classes: 'default everyone',
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
            module: "calendar",
            header: "Calendar Events",
            position: "top_left",
            classes: 'ronnie',
            config: {
                colored: true,
                maximumNumberOfDays: 10,
                maximumEntries: 20,
                showLocation: true,
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
            classes: 'default everyone',
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
            position: 'bottom_right',
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
            module: 'MMM-stocks',
            position: 'bottom_bar',
            classes: 'everyone',
            config: {
              apiKey: 'xxxxx_Stocks-API-Key_xxxxxxxxxxxxx',
              crypto: 'FILUSDT,ADAUSDT',
              separator: '&nbsp;&nbsp;•&nbsp;&nbsp;', // separator between stocks
              stocks: 'CND,ETHO,MIGFX,MSEGX,TRBCX,CGC,AAPL,JOBY', // stock symbols
              updateInterval: 1000000 // update interval in milliseconds (16:40)
            }
        },
        {
            module: 'MMM-iFrame',
            position: 'fullscreen_below',
            classes: 'everyone',
            config: {
                url: [
                      "https://www.youtube.com/embed/ZFBoN7yIMZw?autoplay=1&amp;controls=0&amp;start=40",
                      "https://www.youtube.com/embed/jVD67pMdv9k?autoplay=1&amp;controls=0&amp;start=40",
                      "https://www.youtube.com/embed/gdJjc6l6iII?autoplay=1&amp;controls=0&amp;start=40",
                      "https://www.youtube.com/embed/t6jlhqNxRYk?autoplay=1&amp;controls=0&amp;start=40",
                      "https://www.youtube.com/embed/zfgE_Bxears?autoplay=1&amp;controls=0",
                     ],
                     // "https://www.youtube.com/embed/95FxKgcgjN0?autoplay=1&amp;controls=0",
                updateInterval: 15 * 60 * 1000, // rotate URLs every 15 minutes
                width: "1080", // width of iframe
                height: "1580", // height of iframe
                // width of embedded iframe, height is beeing calculated by aspect ratio of iframe
                frameWidth: "1080"
            }
        },
        {
            module: "mmm-hue-lights",
            position: "lower_third",
            header: 'Hue Lights',
            classes: 'default everyone',
            config: {
                bridgeIp: "10.0.1.20",
                user: "xxxxxxxxxx_Hue-Hub-User_xxxxxxxxxxxxxxxx",
            }
        },
        {
            module: 'MMM-Solar',
            position: "bottom_center",
            classes: 'default everyone',
            config: {
                apiKey: "xxxxxx_Solar-API-Key_xxxxxxxxxxx",
                userId: "Solar-USER-ID",
                systemId: "Solar-System-ID",
                // basicHeader: "true",
            }
        },
		{
            module: 'MMM-Face-Reco-DNN',
            config: {
              // Logout 15 seconds after user was not detected any more
              // If they are detected within this period, the delay will start again
              logoutDelay: 15000,
              // How often the recognition starts in milliseconds
              // With a Raspberry Pi 3+ it works well every 2 seconds
              checkInterval: 2000,
              // Module set used for strangers or if no user is detected
              defaultClass: 'default',
              // Set of modules which should be shown for every recognised user
              everyoneClass: 'everyone',
              // XML to recognize with haarcascade
              cascade: 'modules/MMM-Face-Reco-DNN/tools/haarcascade_frontalface_default.xml',
              // Pre-encoded pickle with the faces
              encodings: 'modules/MMM-Face-Reco-DNN/tools/encodings.pickle',
              // Use Raspberry Pi camera or another type
              // 1 = RasPi camera, 0 = other camera
              usePiCamera: 0,
              // Method of facial recognition
              // dnn = deep neural network, haar = haarcascade
              method: 'dnn',
              // Which face detection model to use
              // "hog" is less accurate but faster on CPUs
              // "cnn" is a more accurate deep-learning model which is GPU/CUDA accelerated
              detectionMethod: 'hog',
              // How long in milliseconds modules take to hide and show
              animationSpeed: 0,
              // Path to Python to run the face recognition
              // null or '' means default path
              pythonPath: null,
              // Should a welcome message be shown using the MagicMirror alerts module?
              welcomeMessage: true,
              // Capture new pictures of recognized people,
			  // if unknown we save it in folder "unknown"
              // So you can extend your dataset and retrain
			  // it afterwards for better recognitions
              extendDataset: true,
              // If extendDataset is true, you need to set the full path of the dataset
              dataset: 'modules/MMM-Face-Reco-DNN/dataset/'
            }
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
