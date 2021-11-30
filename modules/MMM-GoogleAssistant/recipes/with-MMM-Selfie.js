/**  MMM-Selfieshot commands addon  **/
/**  modify pattern to your language  **/
/**  @bugsounet  **/

var recipe = {
  transcriptionHooks: {
    "SELFIE": {
      pattern: "selfie",
      command: "SELFIE"
    },
    "SHOW_CAMERA": {
      pattern: "show camera",
      command: "SHOW_CAMERA"
    },
    "HIDE_CAMERA": {
      pattern: "hide camera",
      command: "HIDE_CAMERA"
    }
  },

  commands: {
    "SELFIE": {
      notificationExec: {
        notification: "SELFIE"
      },
      soundExec: {
        chime: "open"
      }
    },
    "SHOW_CAMERA": {
      notificationExec: {
        notification: "SHOW_CAMERA"
      },
      soundExec: {
        chime: "open"
      }
    },
    "HIDE_CAMERA": {
      notificationExec: {
        notification: "HIDE_CAMERA"
      },
      soundExec: {
        chime: "open"
      }
    }
  }
}
exports.recipe = recipe
