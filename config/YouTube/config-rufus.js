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
        "10.0.1.51", // Mac Pro
        "10.0.1.57", // Mac Pro
        "10.0.8.130", // Mac Pro over Tunnelblick
        "10.0.1.81", // Roon Core
        "10.0.1.82", // Mac Pro
        "10.0.1.94", // Ropieee
        "10.0.1.85", // Raspberry Pi MagicMirror
        "10.0.1.80", // Raspberry Pi 400
        "10.0.1.69", // iPad Air
        "10.0.1.76", // iPhone Max Xs
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
      },
    },
    modules: [
        {
            module: "alert",
        },
        {
            module: 'MMM-Remote-Control',
            config: {
                apiKey: 'xxx_Remote-Control-API-Key_xxxxx'
            }
        },
        {
            module: "MMM-YouTubeWebView",
            position: "top_bar",
            config: {
              video_id: "gmW4TqOybzA",
              video_list: [
                  "CtVyl402W5s",
                  "wmUVy43tqw4",
                  "J_TxPQKcG7w",
                  "avWZsKyuRVE",
                  "IpkIGGJMHBA",
                  "B9zgwx6mhrk",
                  "6KvTDeHlIfI"
              ],
              autoplay: true,
              controls: false,
              loop: true,
              modestbranding: true,
              width: "100%",
              height: "800px",
              referrer: "http://your.domain.com",
            }
        },
        {
            module: 'MMM-iFrame',
            position: 'bottom_center',
            config: {
                url: [
                      "https://en.wikipedia.org/wiki/Rufus_Wainwright",
                      "https://rufuswainwright.com",
                      "https://rufuswainwright.com/disc",
                     ],
                updateInterval: 5 * 60 * 1000, // rotate URLs every 5 minutes
                width: "1080",
                height: "1000",
                frameWidth: "1080"
            }
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}