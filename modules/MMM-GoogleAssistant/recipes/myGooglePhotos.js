/**  Google Photos API command for GoogleAssistant v3  **/
/**  modify pattern to your language if needed  **/
/**  @bugsounet  **/
/**  @doctorfree **/

var recipe = {
  transcriptionHooks: {
    "GP_SHOW": {
      pattern: "photo album",
      command: "GP_SHOW"
    },
    "GP_SHOW_ALBUM": {
      pattern: "show album (.*)",
      command: "GP_SHOW_ALBUM"
    }
  },

  commands: {
    "GP_SHOW": {
      functionExec: {
        exec: () => {
          this.showGooglePhotos()
        }
      },
      soundExec: {
        chime: "open"
      }
    },
    "GP_SHOW_ALBUM": {
      functionExec: {
        exec: (params) => {
          var albumName = params[1]
          return this.showGooglePhotos(albumName)
        }
      },
      soundExec: {
        chime: "open"
      }
    }
  }
}
exports.recipe = recipe
