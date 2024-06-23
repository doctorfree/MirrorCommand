        {
            module: 'MMM-TelegramCommands',
        },
        {
            module: 'MMM-TelegramBot',
            config: {
              allowedUser : ['Your-Telegram-Username'],
              adminChatId : 0000000000,
              useWelcomeMessage: false,
              verbose: false,
              favourites: [
                  "/hideip",
                  "/showip",
                  "/hideOffline",
                  "/showOffline",
                  "/myReboot",
                  "/myShutdown"
              ],
              screenshotScript: "scrot",
              detailOption: {},
            },
        },
