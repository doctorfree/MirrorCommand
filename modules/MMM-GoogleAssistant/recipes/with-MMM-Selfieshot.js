/**  MMM-Selfieshot commands addon  **/
/**  modify pattern to your language  **/
/**  @bugsounet  **/

var recipe = {
  transcriptionHooks: {
    "SELFIE_SHOOT": {
      pattern: "selfie",
      command: "SELFIE_SHOOT"
    },
    "SELFIE_EMPTY_STORE": {
      pattern: "empty store",
      command: "SELFIE_EMPTY_STORE"
    },
    "SELFIE_LAST": {
      pattern: "show last",
      command: "SELFIE_LAST"
    },
  },

  commands: {
    "SELFIE_SHOOT": {
      notificationExec: {
        notification: "SELFIE_SHOOT",
        payload: (params) => {
          return {
            shootCountdown: 5,
            displayResult: true,
            playShutter: true,
            displayCountdown: true,
          }
        }
      },
    },
    "SELFIE_EMPTY_STORE": {
      notificationExec: {
        notification: "SELFIE_EMPTY_STORE",
        payload: (params) => {
          return {
            shootCountdown: 5,
            displayResult: true,
            playShutter: true,
            displayCountdown: true,
          }
        }
      },
      soundExec: {
        chime: "open"
      }
    },
    "SELFIE_LAST": {
      notificationExec: {
        notification: "SELFIE_LAST",
        payload: (params) => {
          return {
            shootCountdown: 5,
            displayResult: true,
            playShutter: true,
            displayCountdown: true,
          }
        }
      },
      soundExec: {
        chime: "open"
      }
    },
  },
}
exports.recipe = recipe
