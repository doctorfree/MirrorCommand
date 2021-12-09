/**   Roon Command                                  **/
/**   Voice commands script                           **/
/**   set pattern in your language                    **/
/**   Requires RoonCommandLine:                     **/
/**   https://gitlab.com/doctorfree/RoonCommandLine **/
/**   @doctorfree                                     **/

var recipe = {
  transcriptionHooks: {
    "ROON_ALBUM": {
      pattern: "play default album",
      command: "ROON_ALBUM"
    },
    "ROON_ARTIST": {
      pattern: "play default artist",
      command: "ROON_ARTIST"
    },
    "ROON_GENRE": {
      pattern: "play default genre",
      command: "ROON_GENRE"
    },
    "ROON_PLAYLIST": {
      pattern: "play default playlist",
      command: "ROON_PLAYLIST"
    },
    "ROON_TAG": {
      pattern: "play default tag",
      command: "ROON_TAG"
    },
    "ROON_RADIO": {
      pattern: "play default radio",
      command: "ROON_RADIO"
    },
    "ROON_STOP": {
      pattern: "music stop",
      command: "ROON_STOP"
    },
    "ROON_SOUND_OFF": {
      pattern: "music off",
      command: "ROON_MUTE"
    },
    "ROON_MUTE": {
      pattern: "music mute",
      command: "ROON_MUTE"
    },
    "ROON_SOUND_ON": {
      pattern: "music on",
      command: "ROON_UNMUTE"
    },
    "ROON_UNMUTE": {
      pattern: "music unmute",
      command: "ROON_UNMUTE"
    },
    "ALBUM_NAME": {
      pattern: "play album (.*)",
      command: "ALBUM_NAME"
    },
    "ARTIST_NAME": {
      pattern: "play artist (.*)",
      command: "ARTIST_NAME"
    },
  },

  commands: {
    "ROON_ALBUM": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "roon -A default"
      }
    },
    "ROON_ARTIST": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "roon -a default"
      }
    },
    "ROON_GENRE": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "roon -g default"
      }
    },
    "ROON_PLAYLIST": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "roon -p default"
      }
    },
    "ROON_TAG": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "roon -t default"
      }
    },
    "ROON_RADIO": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "roon -r default"
      }
    },
    "ROON_STOP": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "roon -c stop"
      }
    },
    "ROON_MUTE": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "roon -c mute"
      }
    },
    "ROON_UNMUTE": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "roon -c unmute"
      }
    },
    "ALBUM_NAME": {
      shellExec: {
        exec: (params) => {
          var albumName = params[1]
          return "roon -A \"" + albumName + "\""
        }
      },
      soundExec: {
        chime: "open"
      }
    },
    "ARTIST_NAME": {
      shellExec: {
        exec: (params) => {
          var artistName = params[1]
          return "roon -a \"" + artistName + "\""
        }
      },
      soundExec: {
        chime: "open"
      }
    },
  }
}

exports.recipe = recipe // Don't remove this line.
