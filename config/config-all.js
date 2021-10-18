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
            module: "calendar",
            header: "Calendar Events",
            position: "top_left",
            config: {
                colored: true,
                maximumNumberOfDays: 10,
                maximumEntries: 20,
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
                    {
                        symbol: "calendar",
                        color: '#BAA3DC',
                        url: "http://localhost:8080/modules/default/calendar/calendars/14D7ECFB-D078-4696-9558-E422AE330A63.ics"
                    },
                ]
            }
        },
        {
            module: "clock",
            position: "upper_third",
            config: {
                dateFormat: "dddd, LLL",
                displayType: "analog",
                analogFace: "face-009",
                analogSize: "200px",
                displaySeconds: "true",
                secondsColor: "#BAA3DC",
                timeFormat: "12",
                showPeriod: "true",
                showDate: "true",
                clockBold: "false",
                analogPlacement: "top",
                analogShowDate: "top",
            }
        },
        {
            module: 'MMM-GoogleMapsTraffic',
            position: 'middle_center',
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
		    module: "weather",
		    position: "top_right",
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
                    {
                        title: "Centers for Disease Control",
                        url: "https://tools.cdc.gov/api/v2/resources/media/403372.rss"
                    },
                    {
                        title: "Johns Hopkins Medicine",
                        url: "https://www.hopkinsmedicine.org/news/media/releases/?format=rss"
                    },
                    {
                        title: "World Health Organization",
                        url: "https://www.who.int/feeds/entity/csr/don/en/rss.xml"
                    },
                ],
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            }
        },
        {
            module: 'MMM-SystemStats',
            position: "bottom_left",
            config: {
                updateInterval: 10000, // every 10 seconds
                align: 'right', // align labels
                header: 'System Stats', // This is optional
                units: 'imperial', // default, metric, imperial
                view: 'textAndIcon',
            }
        },
        {
            module: 'MMM-Tools',
            position: 'bottom_left',
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
		    module: "MMM-DateOnly",
		    position: "top_bar",
		    config: {
                showWeek: false,
                dateFormat: "dddd, LLL",
		    }
	    },
        // {
        //     module: "MMM-AVStock",
        //     position: "bottom_bar", //"bottom_bar" is better for `mode:ticker`
        //     config: {
        //         apiKey : "xx_AVStock-API_x", // https://www.alphavantage.co/
        //         timeFormat: "YYYY-MM-DD HH:mm:ss",
        //         symbols : ["AAPL", "HEXO", "TLRY", "CGC", "ACB"],
        //         alias: ["Apple", "Hexo", "Tilray", "Canopy", "Aurora"],
        //         tickerDuration: 60, // Ticker will be cycled once per this second.
        //         chartDays: 90, //For `mode:series`, how much daily data will be taken. (max. 90)
        //         poolInterval : 1000*15, // (Changed in ver 1.1.0) - Only For Premium Account
        //         mode : "ticker", // "table", "ticker", "series"
        //         decimals: 4,
        //         candleSticks : true, //show candle sticks if mode is Series
        //         coloredCandles : true, //colored bars: red and green for negative and positive candles
        //         premiumAccount: false,
        //     }
        // },
        {
            module: 'MMM-CoinMarketCap',
            position: "middle_center",
            header: "Cryptocurrencies",
            config: {
                apiKey: 'xxxxx_CoinMarket-API-Key_xxxxxxxxx',
                currencies: ['ADA', 'FIL', 'The Graph', 'AGIX', 'HNT', 'ICP', 'ETH' ],
                view: 'graphWithChanges',
                columns: [ 'logo', 'name', 'priceWithChanges', 'graph' ],
                fontSize: 'medium',
                percentChangeColored: true,
                logoColored: true,
                graphRange: 7,
                graphSize: 'medium',
                graphColored: true,
                conversion: 'USD',
            }
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
            module: "mmm-hue-lights",
            position: "middle_center",
            config: {
                bridgeIp: "10.0.1.20",
                displayType: "grid",
                minimalGrid: false,
                updateInterval: 180000,
                user: "xxxxxxxxxx_Hue-Hub-User_xxxxxxxxxxxxxxxx",
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
            module: 'MMM-Solar',
            position: "middle_center",
            config: {
                apiKey: "xxxxxx_Solar-API-Key_xxxxxxxxxxx",
                userId: "Solar-USER-ID",
                systemId: "Solar-System-ID",
                basicHeader: "true",
            }
        },
        {
            module: 'MMM-NetworkScanner',
            position: "bottom_right",
            header: "",
            config: {
                showLastSeen: "true",
                colored: "true",
                devices: [
                    { macAddress: "98:10:e8:f1:77:6d",
                      name: "Mac Mini",
                      icon: "desktop",
                      color: "#00ff00"},
                    { macAddress: "00:3e:e1:c8:14:5b",
                      name: "Mac Pro",
                      icon: "desktop",
                      color: "#ffff00"},
                    { macAddress: "d4:90:9c:da:31:9e",
                      name: "Homepod Max",
                      icon: "music",
                      color: "#26C6DA " },
                    { macAddress: "58:d3:49:2a:9f:f7",
                      name: "Homepod Mini Left",
                      icon: "music",
                      color: "#26C6DA " },
                    { macAddress: "58:d3:49:0f:02:23",
                      name: "Homepod Mini Right",
                      icon: "music",
                      color: "#26C6DA " },
                    { macAddress: "b0:6e:bf:2b:3a:f8",
                      name: "Miner (doctor)",
                      icon: "hammer",
                      color: "#ffff00"},
                    { macAddress: "30:85:a9:8d:02:9d",
                      name: "Miner (vivo)",
                      icon: "hammer",
                      color: "#ffff00"},
                    { macAddress: "4c:cc:6a:27:be:6a",
                      name: "Miner (ronnie)",
                      icon: "hammer",
                      color: "#ffff00"},
                    { ipAddress: "10.0.1.80",
                      name: "Raspberry Pi 400",
                      icon: "signal",
                      color: "#00ff00" },
                    { ipAddress: "10.0.1.81",
                      name: "Roon ROCK",
                      icon: "music",
                      color: "#00ff00" },
                    { ipAddress: "10.0.1.94",
                      name: "RPi Ropieee",
                      icon: "signal",
                      color: "#00ff00" },
                    { ipAddress: "10.0.1.85",
                      name: "RPi MagicMirror",
                      icon: "signal",
                      color: "#00ff00" },
                    { macAddress: "00:17:88:49:1a:cd",
                      name: "Philips Hue",
                      icon: "lightbulb",
                      color: "#00ff00" },
                    { macAddress: "00:04:20:f4:ea:9c",
                      name: "Harmony Hub",
                      icon: "weight",
                      color: "#00ff00" },
                    { macAddress: "2E:0E:84:7B:ED:39",
                      name: "Ronnie's iPad",
                      icon: "tablet",
                      color: "#FF8A65" },
                    { macAddress: "C8:69:CD:84:EC:47",
                      name: "Apple TV",
                      icon: "tv",
                      color: "#26C6DA " },
                    { macAddress: "36:7F:9E:F1:78:5A",
                      name: "iPhone 12 Mini",
                      icon: "mobile",
                      color: "#FF8A65" },
                    { macAddress: "00:1d:c0:62:42:67",
                      name: "Enphase",
                      icon: "solar-panel",
                      color: "#ffff00" },
                    { macAddress: "00:11:d9:60:8b:54",
                      name: "TiVo",
                      icon: "tv",
                      color: "#26C6DA " },
                    { macAddress: "00:1d:ba:c3:c7:17",
                      name: "Sony TV",
                      icon: "tv",
                      color: "#26C6DA " },
                    // { macAddress: "44:d8:84:6b:5f:b3",
                    //   name: "AirPort Express",
                    //   icon: "wifi",
                    //   color: "#81C784" },
                    // { macAddress: "24:a0:74:79:7f:9f",
                    //   name: "AirPort Extreme",
                    //   icon: "network-wired",
                    //   color: "#81C784" },
                ],
            },
        },
        // {
        //     module: 'MMM-TelegramBot',
        //     config: {
        //       telegramAPIKey : 'xxxxxx_Your-Telegram-API-Key_xxxxxxxxxxxxxxxxx',
        //       allowedUser : ['Your-Telegram-Username'],
        //       adminChatId : Your-Telegram-Chat-ID,
        //       useWelcomeMessage: true,
        //       verbose: false,
        //       favourites:["/hideall", "/showall", "/screenshot", "/shutdown"],
        //       screenshotScript: "scrot",
        //       detailOption: {},
        //       customCommands: [],
        //     }
        // },
        // {
        //     module: 'MMM-iFrame',
        //     position: 'fullscreen_below',
        //     config: {
        //         url: [
        //               "https://ncov2019.live/map",
        //               "https://healthweather.us/",
        //               "https://ncov2019.live/tweets",
        //               "https://windy.app/coronavirus_map",
        //              ],
        //         updateInterval: 3 * 60 * 1000,  // rotate URLs every 3 minutes
        //         width: "1080", // width of iframe
        //         height: "1920", // height of iframe
        //         frameWidth: "1080"
        //     }
        // },
        {
            module: 'MMM-COVID19-SPARKLINE',
              position: "middle_center",
              config : {
                worldStats: true,
                sparklines: true,
                sparklineWidth: 100,
                sparklineHeight: 55,
                sparklineDays: 50,
                sparklineDeltavsDaily: true,
                sortby: "confirmed",
                columns: ["confirmed", "deaths", "recovered"],
                countries: ["US", "Mexico", "Brazil", "Canada", "Italy", "Germany", "China"],
                updateInterval: 1000 * 60 * 60 * 3,  //3 hours
                infoRowClass: "medium",
                headerRowClass: "small",
                fadeSpeed: 1000,
                showDelta: true,
                showDeltaPlotNDays: 7,
                sparklineDeathScale: -4,
                showDelimiter: true
              }
        },
        {
            module: 'MMM-RAIN-RADAR',
            position: 'top_center',
            disabled: false,
            config: {
                useHeader: false, // true if you want a header
                lat: "36.970019",
                lon: "-122.042212",
                area: 'CA', // US State
                zoomLevel: 8,
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
            module: "MMM-DarkSkyForecast",
            header: "Dark Sky Weather Forecast",
            position: "top_center",
            classes: "default everyone",
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
            module: 'MMM-pages',
            config: {
                modules:
                    [
                        ["MMM-iFrame", "MMM-SystemStats", "MMM-Tools",
                         "MMM-Solar", "mmm-hue-lights", "MMM-NetworkScanner"],

                        ["weather", "clock", "calendar", "newsfeed",
                         "MMM-SystemStats", "MMM-Tools", "MMM-Solar",
                         "mmm-hue-lights", "MMM-NetworkScanner"],

                        ["weather", "clock", "MMM-COVID19-SPARKLINE",
                         "newsfeed", "MMM-DateOnly"],

                        ["weather", "clock", "MMM-GoogleMapsTraffic",
                         "newsfeed", "MMM-DateOnly"],

                        ["weather", "clock", "MMM-CoinMarketCap",
                         "MMM-stocks", "MMM-DateOnly", "newsfeed"],

                        ["weather", "clock", "MMM-RAIN-RADAR",
                         "MMM-DarkSkyForecast", "MMM-DateOnly"],
                    ],
                fixed:
                    ["alert", "updatenotification", "MMM-Remote-Control"],
                rotationTime: 300000, // rotate page every 5 minutes = 5 * 60 * 1000
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
