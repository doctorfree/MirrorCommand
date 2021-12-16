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
        "HH.H.H.HH", // Raspberry Pi 400
        "II.I.I.II", // iPad Air
        "JJ.J.J.JJ", // iPhone 12 Mini
        "KK.K.K.KK", // Ubuntu MagicMirror
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
                url: [
                      "https://www.youtube.com/embed/ZFBoN7yIMZw?autoplay=1&amp;controls=0&amp;start=40",
                      "https://www.youtube.com/embed/jVD67pMdv9k?autoplay=1&amp;controls=0&amp;start=40",
                      "https://www.youtube.com/embed/gdJjc6l6iII?autoplay=1&amp;controls=0&amp;start=40",
                      "https://www.youtube.com/embed/t6jlhqNxRYk?autoplay=1&amp;controls=0&amp;start=40",
                      "https://www.youtube.com/embed/zfgE_Bxears?autoplay=1&amp;controls=0",
                     ],
                     // "https://www.youtube.com/embed/95FxKgcgjN0?autoplay=1&amp;controls=0",
                updateInterval: 5 * 60 * 1000, // rotate URLs every 5 minutes
                width: "__WIDTH__", // width of iframe
                height: "__HEIGHT__", // height of iframe
                frameWidth: "__WIDTH__"
            }
        },
		{
			module: "updatenotification",
			position: "top_bar"
		},
        {
            module: 'MMM-BackgroundSlideshow',
            position: 'fullscreen_below',
            //classes: 'scheduler',
            config: {
                imagePaths: [
                    '/usr/local/MirrorCommandLine/pics/Fractals/',
                    '/usr/local/MirrorCommandLine/pics/Gif/Nature/',
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
              favourites:["/hideall", "/showall", "/screenshot", "/shutdown"],
              screenshotScript: "scrot",
              detailOption: {},
            }
        },
        {
            module: 'MMM-pages',
            // module: 'MMM-iFrame',
            // module: 'MMM-BackgroundSlideshow'
            config: {
                modules:
                    [
                        ["MMM-iFrame"],
                        ["MMM-BackgroundSlideshow"],
                    ],
                fixed:
                    ["alert", "updatenotification", "MMM-Remote-Control",
                     "MMM-TelegramCommands", "MMM-TelegramBot"],
                rotationTime: 1200000, // rotate page every 20 minutes = 20 * 60 * 1000
            }
        },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
