/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */

var config = {
    address: "0.0.0.0", // Address to listen on, can be:
    port: 8080,

    // The URL path where MagicMirror is hosted. If you are using a Reverse proxy
    // basePath: '/',
    // you must set the sub path here. basePath must end with a /

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
    locale: 'en-US',
    // logLevel: ['INFO', 'LOG', 'WARN', 'ERROR'],
    logLevel: ['DEBUG', 'INFO', 'LOG', 'WARN', 'ERROR'],
    timeFormat: 12,
    units: "imperial",
    useHttps: false, // Support HTTPS or not, default "false" will use HTTP
    httpsPrivateKey: '', // HTTPS private key path, only require when useHttps is true
    httpsCertificate: '', // HTTPS Certificate path, only require when useHttps is true

    modules: [
        {
          module: 'alert'
        },
        {
          module: 'updatenotification',
          position: 'top_bar'
        },
        {
          module: 'clock',
          position: 'top_left',
          classes: 'scene1 scene2',
          customAnimation: true,
          hideOnStart: true
        },
        {
          module: 'weather',
          position: 'top_right',
          classes: 'scene1 scene2',
          hiddenOnStartup: true,
          config: {
            weatherProvider: 'openweathermap',
            type: 'current',
            location: "Santa Cruz,United States",
            locationID: "5393052",
            units: "imperial",
            apiKey: "xx_OpenWeather-App-ID_xxxxxxxxxx"
          }
        },
        {
          module: 'compliments',
          position: 'lower_third',
          classes: 'scene1 scene2 scene3',
          customAnimation: true
        },
        {
          module: 'calendar',
          header: 'US Holidays',
          position: 'top_left',
          classes: 'scene1 scene2',
          customAnimation: false,
          config: {
            calendars: [
              {
                symbol: 'calendar-check',
                url: 'webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics'
              }
            ]
          }
        },
        // My calendars
        // {
        //     module: "calendar",
        //     header: "Calendar Events",
        //     position: "top_left",
        //     config: {
        //         colored: true,
        //         maximumNumberOfDays: 10,
        //         maximumEntries: 20,
        //         showLocation: true,
        //         tableClass: "medium",
        //         timeFormat: "absolute",
        //         nextDaysRelative: true,
        //         displaySymbol: true,
        //         defaultSymbol: "calendar-alt",
        //         calendars: [
        //             {
        //                 symbol: "calendar",
        //                 color: '#73FF33',
        //                 url: "http://localhost:8080/modules/default/calendar/calendars/home.ics"
        //             },
        //             {
        //                 symbol: "calendar",
        //                 color: '#BAA3DC',
        //                 url: "http://localhost:8080/modules/default/calendar/calendars/14D7ECFB-D078-4696-9558-E422AE330A63.ics"
        //             },
        //         ]
        //     }
        // },
        {
          module: 'weather',
          position: 'top_right',
          classes: 'scene1 scene2',
          header: 'Weather Forecast',
          hiddenOnStartup: true,
          config: {
            weatherProvider: 'openweathermap',
            type: 'forecast',
            location: "Santa Cruz,United States",
            locationID: "5393052",
            colored: "true",
            showRainAmount: "true",
            units: "imperial",
            apiKey: "xx_OpenWeather-App-ID_xxxxxxxxxx"
          }
        },
        {
          module: 'newsfeed',
          position: 'top_bar',
          classes: 'scene1 scene2 scene3',
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
          module: 'helloworld',
          classes: 'empty',
          position: 'upper_third',
          hiddenOnStartup: true,
          config: {
            text: '<p class="large">Empty Scene</p>'
          }
        },
        {
          module: 'helloworld',
          classes: 'scene1 scene3',
          position: 'top_left',
          header: 'example module',
          hiddenOnStartup: true,
          config: {
            text: '<img src="https://picsum.photos/300/200?random=1">'
          }
        },
        {
          module: 'helloworld',
          classes: 'scene1 scene3',
          position: 'top_right',
          hiddenOnStartup: true,
          header: 'example module',
          config: {
            text: '<img src="https://picsum.photos/250/500?random=2">'
          }
        },
        {
          module: 'helloworld',
          classes: 'scene1 scene3',
          position: 'bottom_left',
          header: 'example_module',
          hiddenOnStartup: true,
          config: {
            text: '<img src="https://picsum.photos/300/200?random=3">'
          }
        },
        {
          module: 'MMM-Scenes',
          classes: 'scene1 scene2 scene3 empty',
          hiddenOnStartup: true,
          position: 'bottom_right',
          config: {
            duration: 8000,
            scenario: [
              'scene1',
              {
                name: 'empty',
                duration: 5000,
                expelAnimation: 'dismissOut'
              },
              {
                name: 'scene1',
                duration: 5000,
                admitAnimation: 'jelly',
                admitGap: 200,
                expelAnimation: ({ moduleWrapper, duration }) => {
                  return new Promise((resolve, reject) => {
                    moduleWrapper.animate([
                      { transform: 'scale(1,1)', opacity: 1 },
                      { transform: 'scale(10, 10)', opacity: 0 }
                    ], { duration }).onfinish = resolve
                  })
                }
              },
              {
                name: 'scene2',
                duration: 5000,
                expelAnimation: 'pageLeft',
                admitAnimation: 'pageDown'
              },
              {
                name: 'scene3',
                duration: 5000,
                expelAnimation: 'pageRight',
                admitAnimation: [
                  { transform: 'rotate(-360deg) scale(0, 0)', opacity: 0 },
                  { transform: 'rotate(360deg) scale(1, 1)', opacity: 1 }
                ]
              }
            ],
            autoLoop: 'infinity',
            activeIndicators: ['1', '⭐', '3', '😀', "<span style='color:orange; font-size:150%; font-weight:bold'>5</span>"]
            // You may need emoji-able fonts
          }
        }
    ]
}
  
/** ************* DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') { module.exports = config }
