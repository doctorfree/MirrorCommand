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
            module: 'MMM-MacAddressScan',
            position: "bottom_center",
            header: "",
            config: {
                showLastSeen: false,
                showLastSeenWhenOffline: true,
                sort: false,
                colored: true,
                showDeviceColumns: false,
                coloredState: true,
                showIP: true,
                showUnknown: true,
                showOffline: true,
                keepAlive: 900,
                updateInterval: 60,
                // residents: ["iPhone 12 Mini"],
                // occupiedCMD: {
                //     notification: 'REMOTE_ACTION',
                //     payload: {
                //         action: 'MONITORON'
                //     }
                // },
                // vacantCMD  : {
                //     notification: 'REMOTE_ACTION',
                //     payload: {
                //         action: 'MONITOROFF'
                //     }
                // },
                devices: [
                    { macAddress: "e8:9f:80:14:95:fe",
                      name: "Belkin International Inc.  10.0.1.1",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "00:17:88:49:1a:cd",
                      name: "Philips Lighting BV 10.0.1.20",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "00:1d:c0:62:42:67",
                      name: "Enphase Energy 10.0.1.24",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "d4:90:9c:da:31:9e",
                      name: "Apple, Inc.  10.0.1.31",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "3c:6a:9d:12:84:49",
                      name: "Dexatek Technology LTD.  10.0.1.12",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "00:3e:e1:c8:14:5b",
                      name: "Apple, Inc.  10.0.1.57",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "00:04:20:f4:ea:9c",
                      name: "Slim Devices, Inc.  10.0.1.79",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "1c:69:7a:65:19:9e",
                      name: "EliteGroup Computer Systems Co., LTD 10.0.1.81",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "58:d3:49:0f:02:23",
                      name: "Apple, Inc.  10.0.1.46",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "40:6c:8f:11:6a:79",
                      name: "Apple, Inc.  10.0.1.74",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "48:e1:e9:37:f0:1b",
                      name: "Chengdu Meross Technology Co., Ltd.  10.0.1.83",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "48:e1:e9:39:19:94",
                      name: "Chengdu Meross Technology Co., Ltd.  10.0.1.54",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "98:10:e8:f1:77:6d",
                      name: "Apple, Inc.  10.0.1.88",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "c4:41:1e:f2:2e:cc",
                      name: "Belkin International Inc.  10.0.1.89",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "c8:69:cd:84:ec:47",
                      name: "Apple, Inc.  10.0.1.103",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "58:d3:49:2a:9f:f7",
                      name: "Apple, Inc.  10.0.1.131",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "48:e1:e9:29:51:ad",
                      name: "Chengdu Meross Technology Co., Ltd.  10.0.1.128",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "00:11:d9:60:8b:53",
                      name: "TiVo 10.0.1.176",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "00:11:d9:60:8b:54",
                      name: "TiVo 10.0.1.177",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "00:1d:ba:c3:c7:17",
                      name: "Sony Corporation 10.0.1.193",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "34:12:98:03:b1:21",
                      name: "Apple, Inc.  10.0.1.212",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "3c:6a:9d:12:7d:7a",
                      name: "Dexatek Technology LTD.  10.0.1.243",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "c4:41:1e:f2:14:f5",
                      name: "Belkin International Inc.  10.0.1.246",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "74:1b:b2:da:2e:d9",
                      name: "Apple, Inc.  10.0.1.51",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "44:d8:84:6b:5f:b2",
                      name: "Apple, Inc.  10.0.1.82",
                      icon: "question",
                      color: "#FFFFFF"},
                    { macAddress: "dc:a6:32:75:32:ef",
                      name: "Raspberry Pi Trading Ltd 10.0.1.94",
                      icon: "question",
                      color: "#FFFFFF"},
                ],
            },
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
