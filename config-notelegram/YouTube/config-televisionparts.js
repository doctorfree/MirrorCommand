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
		enableRemoteModule: false,
      },
    },
    
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
            module: "MMM-YouTubeWebView",
            position: "top_center",
            config: {
              playlist: "PLU_ycxo-Q7PsmZWsUkbgcUzfsIXESn8-Z",
              autoplay: true,
              controls: false,
              loop: true,
              modestbranding: true,
              width: "1080px",
              height: "800px",
              referrer: "http://your.domain.com",
              notification: "YOUTUBE_WEBVIEW",
            }
        },
        {
            module: 'MMM-iFrame',
            position: 'bottom_center',
            config: {
                url: [
                      "https://en.wikipedia.org/wiki/Television_Parts",
                      "https://en.wikipedia.org/wiki/Elephant_Parts",
                      "https://en.wikipedia.org/wiki/Michael_Nesmith",
                      "https://en.wikipedia.org/wiki/The_Monkees",
                      "https://en.wikipedia.org/wiki/Michael_Nesmith#Solo_career",
                      "https://en.wikipedia.org/wiki/Michael_Nesmith#Filmography",
                     ],
                updateInterval: 4 * 60 * 1000, // rotate URLs every 4 minutes
                width: "1080", // width of iframe
                height: "1000", // height of iframe
                frameWidth: "1080"
            }
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}