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
            module: "MMM-DateOnly",
            position: "top_bar",
            config: {
                showWeek: false,
                dateFormat: "dddd, LLL",
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
            module: 'MMM-RAIN-RADAR',
            position: 'top_left',
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
            position: "top_right",
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
            module: 'MMM-GoogleMapsTraffic',
            position: 'bottom_center',
            config: {
                key: 'xxxxxx_Your-GoogleMapsTraffic-Key_xxxxxxxxxxx',
                lat: 36.970019,
                lng: -122.042212,
                height: '600px',
                width: '600px',
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
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
