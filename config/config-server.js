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
        "127.0.0.1",
        "10.0.1.44", // Mac Mini
        "10.0.1.51", // Mac Pro
        "10.0.1.85", // Raspberry Pi MagicMirror
        "10.0.1.69", // iPad Air
        "10.0.1.76", // iPhone Max Xs
        "::ffff:127.0.0.1",
        "::1",
    //  "::ffff:10.0.1.0/26",
    //  "::ffff:10.0.1.64/27",
    //  "::ffff:10.0.1.96/30"
    ],

	language: "en",
	timeFormat: 12,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default 
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device
	serverOnly:  true,
	
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
                apiKey: 'xxx_Remote-Control-API-Key_xxxxx'
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
			module: "calendar",
			header: "Calendar Events",
			position: "top_left",
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
//					{
//						symbol: "calendar",
//                        color: '#33FFFA',
//						url: "http://localhost:8080/modules/default/calendar/calendars/W14D7ECFB-D078-4696-9558-E422AE330A63.ics"
//                    }
				]
			}
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
        //  classes: "daytime",
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
     // {
     //     module: 'MMM-CoinMarketCap',
     //     position: 'lower_third', 
     //     header: "Cryptocurrencies",
     //     config: {
     //         currencies: ['bitcoin', 'ethereum', 'litecoin', 'stellar'],
     //         view: 'graphWithChanges',
     //         conversion: 'USD',
     //     }
     // },
     // {
     //     module: "MMM-AVStock",
     //     position: "lower_third", //"bottom_bar" is better for `mode:ticker`
     //     classes: "daytime",
     //     config: {
     //         apiKey : "xx_AVStock-API_x", // https://www.alphavantage.co/
     //         timeFormat: "YYYY-MM-DD HH:mm:ss",
     //         symbols : ["AAPL", "GOOGL", "CGC", "ACB"],
     //         alias: ["Apple", "Google", "Canopy", "Aurora"],
     //         tickerDuration: 60, // Ticker will be cycled once per this second.
     //         chartDays: 90, //For `mode:series`, how much daily data will be taken. (max. 90)
     //         poolInterval : 1000*15, // (Changed in ver 1.1.0) - Only For Premium Account
     //         mode : "series", // "table", "ticker", "series"
     //         decimals: 4,
     //         candleSticks : true, //show candle sticks if mode is Series
     //         coloredCandles : true, //colored bars: red and green for negative and positive candles
     //         premiumAccount: false,
     //     }
     // },
        {
            module: 'MMM-Tools',
            position: 'bottom_center',
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
            module: 'MMM-SystemStats',
			position: "bottom_right",
	        config: {
                updateInterval: 10000, // every 10 seconds
			    align: 'right', // align labels
			    header: 'System Stats', // This is optional
			    units: 'imperial', // default, metric, imperial
			    view: 'textAndIcon',
	        }
        },
//      {
//          module: 'MMM-ip',
//          position: 'bottom_bar',
//          config: {
//              showFamily: 'IPv4',
//              showType:	'both',
//              fontSize:	24,
//              dimmed:	'false',
//          }
//      },
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
		        basicHeader: "true",
	        }
        },
        {
            module: 'MMM-NetworkScanner',
            position: "bottom_left",
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
        {
            module: 'MMM-BackgroundSlideshow',
            position: 'fullscreen_below',
            classes: 'scheduler',
            config: {
                imagePaths: [
                    'modules/MMM-BackgroundSlideshow/exampleImages/',
                    'modules/MMM-BackgroundSlideshow/pics/fractals/',
                ],
                slideshowSpeed: 15000, // 15 seconds
                transitionImages: true,
                randomizeImageOrder: true,
                recursiveSubDirectories: true,
                resizeImages: true,
                maxWidth: 1080,
                maxHeight: 1920,
                transitions: ['opacity', 'slideFromRight', 'slideFromLeft', 'slideFromTopLeft', 'slideFromTopRight', 'slideFromBottomLeft', 'slideFromBottomRight', 'flipX', 'flipY'],
                // DISPLAY THE SLIDE SHOW BETWEEN 6PM and 8PM then again between 10PM and Midnight
                module_schedule: [
                    {from: '0 18 * * *', to:   '0 20 * * *'},
                    {from: '0 22 * * *', to:   '59 23 * * *'}
                ]
            }
        },
        // {
        //     module: 'MMM-TelegramBot',
        //     config: {
        //       telegramAPIKey : 'xxxxxx_Your-Telegram-API-Key_xxxxxxxxxxxxxxxxx',
              // This is NOT the username of bot.
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
