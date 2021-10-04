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
        "10.0.1.67", // Raspberry Pi MagicMirror
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
            module: "MMM-COVID19",
            header: "Coronavirus Daily Update",
            position: "top_bar",
            config: {
              updateInterval: 300000,
              worldStats: true,
              delta: true,
              lastUpdateInfo: true,
              showExtraInfo: true,
              countries: [ "Mexico", "USA" ],
              highlightCountry: "USA",
              headerRowClass: "small",
              rapidapiKey : "xxxxx_Rapid-API-Key_xxxxxxxxx"
            }
        },
        // {
        //     module: "MMM-COVID-19",
        //     header: "Coronavirus Daily Update",
        //     position: "top_bar",
        //     config: {
        //       debug:false,
//            scanInterval: 1000 * 60 * 60 * 3,
        //       scanInterval: 1000 * 60 * 60 * 12,
        //       rotateInterval: 1000 * 5, // 0 means no rotate
//            pinned: ["Mainland China", null],
//            pinned: ["Others", "Diamond Princess cruise ship"],
//            pinned: ["US", "Santa Clara, CA"],
        //       pinned: ["World", "US Total", "California, US", "Italy", "Iran", "China Total", "Korea, South", "Canada Total", "Mexico"],
        //       myPosition: {
        //           latitude: 36.970019,
        //           longitude: -122.042212,
        //           metric: "mile"
        //       },
        //       reportTimeFormat: "YYYY.MM.DD hh a",
        //       drawGraph: true,
        //       logTerritory: false
        //     }
        // },
        {
            module: "newsfeed",
            position: "bottom_bar",
            config: {
                feeds: [
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
            module: 'MMM-iFrame',
            position: 'fullscreen_below',
            config: {
                url: [
                      "https://ncov2019.live/map",
                      "https://healthweather.us/",
                      "https://ncov2019.live/tweets",
                      "https://windy.app/coronavirus_map",
                     ],
                updateInterval: 3 * 60 * 1000,  // rotate URLs every 3 minutes
                width: "1080", // width of iframe
                height: "1920", // height of iframe
                frameWidth: "1080"
            }
        },
        {
            module: 'MMM-pages',
            config: {
                modules:
                    [["MMM-COVID19"], ["newsfeed"], [ "MMM-iFrame"]],
                fixed:
                    ["alert", "updatenotification", "MMM-Remote-Control"],
                rotationTime: 900000, // rotate page every 15 minutes = 15 * 60 * 1000
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
