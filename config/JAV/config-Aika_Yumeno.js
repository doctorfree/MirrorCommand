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
			module: "MMM-UpdateNotification",
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
            module: 'MMM-BackgroundSlideshow',
            position: 'fullscreen_below',
            // classes: 'scheduler',
            config: {
                imagePaths: [
                    'modules/MMM-BackgroundSlideshow/pics/JAV/Aika_Yumeno',
                ],
                slideshowSpeed: 15000, // 15 seconds
                resizeImages: true,
                maxWidth: 1080,
                maxHeight: 1920,
                transitionImages: true,
                randomizeImageOrder: true,
                recursiveSubDirectories: true,
                resizeImages: true,
                maxWidth: 1080,
                maxHeight: 1920,
                transitions: ['opacity', 'slideFromRight', 'slideFromLeft', 'slideFromTopLeft', 'slideFromTopRight', 'slideFromBottomLeft', 'slideFromBottomRight', 'flipX', 'flipY'],
                //backgroundSize: "contain",
                // DISPLAY THE SLIDE SHOW BETWEEN 1PM and 6PM then again between 9PM and Midnight
                //module_schedule: [
                //  {from: '0 13 * * *', to:   '0 18 * * *'},
                //  {from: '0 21 * * *', to:   '59 23 * * *'}
                //]
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
              favourites:["/hideall", "/showall", "/screenshot", "/shutdown"],
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
