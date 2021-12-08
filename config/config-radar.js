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
//  address: "localhost",
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
          enableRemoteModule: true
        }
    },
    
    modules: [
        {
            module: "alert",
            classes: 'radar traffic weather',
        },
        {
            module: "updatenotification",
            position: "top_bar",
            classes: 'radar traffic weather',
        },
        {
            module: 'MMM-Remote-Control',
            classes: 'radar traffic weather',
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
            module: "newsfeed",
            position: "top_bar",
            classes: 'radar weather',
            config: {
                feeds: [
                    {
                        title: "rssWeather Santa Cruz",
                        url: "http://www.rssweather.com/zipcode/95060/rss.php",
                    },
                    {
                        title: "Santa Cruz County Weather",
                        url: "http://www.rssweather.com/wx/us/ca/santa cruz county/rss.php",
                    },
                ],
                lengthDescription: 500,
                updateInterval: 30000,
                showDescription: true,
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            }
        },
        {
            module: "newsfeed",
            position: "top_bar",
            classes: 'traffic',
            config: {
                feeds: [
                    {
                        title: "Traffic Engineering Projects",
                        url: "https://www.cityofsantacruz.com/Home/Components/RssFeeds/RssFeed/View?ctID=5&cateIDs=6",
                    },
                    {
                        title: "Santa Cruz Traffic and Transit News",
                        url: "https://patch.com/rss.xml",
                    },
                ],
                lengthDescription: 500,
                updateInterval: 30000,
                showDescription: true,
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            }
        },
        {
            module: 'MMM-GoogleMapsTraffic',
            position: 'middle_center',
            classes: 'traffic',
            header: "Google Maps Traffic Information - Santa Cruz, California",
            config: {
                key: 'xxxxxx_Your-GoogleMapsTraffic-Key_xxxxxxxxxxx',
                lat: 36.970019,
                lng: -122.042212,
                height: '1240px',
                width: '1080px',
                styledMapType: "standard",
                disableDefaultUI: true,
                backgroundColor: 'hsla(0, 0%, 0%, 0)',
                markers: [
                    {
                        lat: 36.970019,
                        lng: -122.042212,
                        fillColor: '#9966ff'
                    },
                ],
            },
        },
        {
            module: 'MMM-RAIN-RADAR',
            position: 'middle_center',
            classes: 'radar',
            disabled: false,
            config: {
                height: "100vh",
                width: "800px",
                useHeader: false, // true if you want a header
                lat: "36.970019",
                lon: "-122.042212",
                area: 'CA', // US State
                zoomLevel: 7,
                mapType: 1, //0-Road Map 1-Satellite 2-Dark Map 3-OpenStreetMaps 4-Light Map
                color: 3, //0-Original 1-Universal Blue 2-TITAN 3-The Weather Channel
                          //5-NEXRAD Level-III 6-RAINBOW @ SELEX-SI
                snow: 1,
                smoothing: 1,
                opacity: 88,
                fastAnimation: 0,
                coverage: 0,
                darkTheme: 1,
                UTCtime: 0,
                legend: 1,
                legendMin: 0, //set legend to 1 if you want legendMin to show
                animate: 1,
                // 1: after updateInterval, weather warnings for your US states will be used
                // to determine if module should be hidden. 0 module is perpertually displayed
                updateOnWarning: 1,
                // number of milliseconds. change 5 to 60 and it will update each 10 minutes
                updateInterval: 60 * 60 * 1000,
            }
        },
        {
            module: "MMM-DateOnly",
            position: "top_bar",
            classes: 'weather',
            config: {
                showWeek: false,
                dateFormat: "dddd, LLL",
            }
        },
        {
            module: "MMM-DateOnly",
            position: "top_center",
            classes: 'radar traffic',
            config: {
                showWeek: false,
                dateFormat: "dddd, LLL",
            }
        },
        {
            module: "weather",
            position: "top_right",
            classes: 'weather',
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
            classes: 'weather',
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
            module: 'MMM-RAIN-RADAR',
            position: 'top_left',
            classes: 'weather',
            disabled: false,
            config: {
                useHeader: false, // true if you want a header
                lat: "36.970019",
                lon: "-122.042212",
                area: 'CA', // US State
                zoomLevel: 5,
                mapType: 1, //0-Road Map 1-Satellite 2-Dark Map 3-OpenStreetMaps 4-Light Map
                color: 3, //0-Original 1-Universal Blue 2-TITAN 3-The Weather Channel
                          //5-NEXRAD Level-III 6-RAINBOW @ SELEX-SI
                snow: 1,
                smoothing: 1,
                opacity: 88,
                fastAnimation: 0,
                coverage: 0,
                darkTheme: 1,
                UTCtime: 0,
                legend: 0,
                legendMin: 0, //set legend to 1 if you want legendMin to show
                animate: 1,
                // 1: after updateInterval, weather warnings for your US states will be used
                // to determine if module should be hidden. 0 module is perpertually displayed
                updateOnWarning: 1,
                // number of milliseconds. change 5 to 60 and it will update each 10 minutes
                updateInterval: 60 * 60 * 1000,
            }
        },
        {
            module: "MMM-DarkSkyForecast",
            header: "Dark Sky Weather Forecast",
            position: "top_right",
            classes: "weather",
            disabled: false,
            config: {
              apikey: "xxx_Dark-Sky-API-Key_xxxxxxxxxxx",
              latitude: "36.970019",
              longitude: "-122.042212",
              iconset: "5c",
              concise: false,
              units: "us",
              forecastLayout: "tiled"
            }
        },
        {
            module: 'MMM-TelegramCommands',
            classes: 'radar traffic weather',
        },
        {
            module: 'MMM-TelegramBot',
            classes: 'radar traffic weather',
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
          module: 'MMM-Scenes',
          position: 'bottom_bar',
          classes: 'radar traffic weather',
          config: {
            duration: 300000,
            scenario: [
              {
                name: 'radar',
                expelAnimation: 'pageRight',
                admitAnimation: [
                  { transform: 'rotate(-360deg) scale(0, 0)', opacity: 0 },
                  { transform: 'rotate(360deg) scale(1, 1)', opacity: 1 }
                ]
              },
              {
                name: 'traffic',
                expelAnimation: 'pageLeft',
                admitAnimation: 'pageDown'
              },
              {
                name: 'weather',
                expelAnimation: 'dismissOut',
                admitAnimation: 'pageDown'
              },
            ],
            autoLoop: 'infinity',
            inactiveIndicators: ['①', '②', '③'],
            activeIndicators: ['❶', '❷', '❸']
          }
        }
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
