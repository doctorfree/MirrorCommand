/**   Mirror Command                                  **/
/**   Voice commands script                           **/
/**   set pattern in your language                    **/
/**   Requires MirrorCommand:                     **/
/**   https://gitlab.com/doctorfree/MirrorCommand **/
/**   @doctorfree                                     **/

var recipe = {
  transcriptionHooks: {
    "MIRROR_RESTART": {
      pattern: "mirror restart",
      command: "MIRROR_RESTART"
    },
    "MIRROR_ROTATE_INVERTED": {
      pattern: "mirror rotate inverted",
      command: "MIRROR_ROTATE_INVERTED"
    },
    "MIRROR_ROTATE_NORMAL": {
      pattern: "mirror rotate normal",
      command: "MIRROR_ROTATE_NORMAL"
    },
    "MIRROR_ROTATE_RIGHT": {
      pattern: "mirror rotate right",
      command: "MIRROR_ROTATE_RIGHT"
    },
    "MIRROR_ROTATE_LEFT": {
      pattern: "mirror rotate left",
      command: "MIRROR_ROTATE_LEFT"
    },
    "MIRROR_SCREEN_OFF": {
      pattern: "mirror screen off",
      command: "MIRROR_SCREEN_OFF"
    },
    "MIRROR_SCREEN_ON": {
      pattern: "mirror screen on",
      command: "MIRROR_SCREEN_ON"
    },
    "MIRROR_SCREEN_ONE": {
      pattern: "screen one|screen 1|mirror screen one|mirror screen 1",
      command: "MIRROR_SCREEN_ONE"
    },
    "MIRROR_SCREEN_TWO": {
      pattern: "screen two|screen 2|mirror screen two|mirror screen 2",
      command: "MIRROR_SCREEN_TWO"
    },
    "MIRROR_SCREEN_SWITCH": {
      pattern: "screen switch|switch screens|mirror screen switch|switch screen",
      command: "MIRROR_SCREEN_SWITCH"
    },
    "MIRROR_STOP": {
      pattern: "mirror stop",
      command: "MIRROR_STOP"
    },
    "MIRROR_SOUND_OFF": {
      pattern: "mirror sound off",
      command: "MIRROR_MUTE"
    },
    "MIRROR_MUTE": {
      pattern: "mirror mute",
      command: "MIRROR_MUTE"
    },
    "MIRROR_SOUND_ON": {
      pattern: "mirror sound on",
      command: "MIRROR_UNMUTE"
    },
    "MIRROR_UNMUTE": {
      pattern: "mirror unmute",
      command: "MIRROR_UNMUTE"
    },
    "MIRROR_ALL": {
      pattern: "mirror all",
      command: "MIRROR_ALL"
    },
    "MIRROR_ART": {
      pattern: "mirror art",
      command: "MIRROR_ART"
    },
    "MIRROR_CAL": {
      pattern: "mirror cal",
      command: "MIRROR_CAL"
    },
    "MIRROR_CANDY": {
      pattern: "mirror candy",
      command: "MIRROR_CANDY"
    },
    "MIRROR_CRYPTO": {
      pattern: "mirror crypto",
      command: "MIRROR_CRYPTO"
    },
    "MIRROR_DEFAULT": {
      pattern: "mirror default",
      command: "MIRROR_DEFAULT"
    },
    "MIRROR_FACE": {
      pattern: "mirror face",
      command: "MIRROR_FACE"
    },
    "MIRROR_FRACTALS": {
      pattern: "mirror fractals",
      command: "MIRROR_FRACTALS"
    },
    "MIRROR_GIF": {
      pattern: "mirror gif",
      command: "MIRROR_GIF"
    },
    "MIRROR_IFRAME": {
      pattern: "mirror frame",
      command: "MIRROR_IFRAME"
    },
    "MIRROR_NATURE": {
      pattern: "mirror nature",
      command: "MIRROR_NATURE"
    },
    "MIRROR_NETWORK": {
      pattern: "mirror network",
      command: "MIRROR_NETWORK"
    },
    "MIRROR_NEWS": {
      pattern: "mirror news",
      command: "MIRROR_NEWS"
    },
    "MIRROR_NORMAL": {
      pattern: "mirror normal",
      command: "MIRROR_NORMAL"
    },
    "MIRROR_OWLS": {
      pattern: "mirror owls",
      command: "MIRROR_OWLS"
    },
    "MIRROR_PORTAL": {
      pattern: "mirror portal",
      command: "MIRROR_PORTAL"
    },
    "MIRROR_RADAR": {
      pattern: "mirror radar",
      command: "MIRROR_RADAR"
    },
    "MIRROR_ROON": {
      pattern: "mirror rune",
      command: "MIRROR_ROON"
    },
    "MIRROR_SCENES": {
      pattern: "mirror scenes",
      command: "MIRROR_SCENES"
    },
    "MIRROR_SCNEWS": {
      pattern: "mirror santa cruz",
      command: "MIRROR_SCNEWS"
    },
    "MIRROR_SCOREBOARD": {
      pattern: "mirror scores",
      command: "MIRROR_SCOREBOARD"
    },
    "MIRROR_SMOKE": {
      pattern: "mirror smoke",
      command: "MIRROR_SMOKE"
    },
    "MIRROR_SNOWCRASH": {
      pattern: "mirror snow crash",
      command: "MIRROR_SNOWCRASH"
    },
    "MIRROR_STOCKS": {
      pattern: "mirror stocks",
      command: "MIRROR_STOCKS"
    },
    "MIRROR_TANTRA": {
      pattern: "mirror tantra",
      command: "MIRROR_TANTRA"
    },
    "MIRROR_TRAFFIC": {
      pattern: "mirror traffic",
      command: "MIRROR_TRAFFIC"
    },
    "MIRROR_VOICE": {
      pattern: "mirror voice",
      command: "MIRROR_VOICE"
    },
    "MIRROR_WATERFALLS": {
      pattern: "mirror waterfalls",
      command: "MIRROR_WATERFALLS"
    },
    "MIRROR_WEATHER": {
      pattern: "mirror weather",
      command: "MIRROR_WEATHER"
    },
    "MIRROR_YOUTUBE": {
      pattern: "mirror youtube",
      command: "MIRROR_YOUTUBE"
    },
  },

  commands: {
    "MIRROR_RESTART": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror restart"
      }
    },
    "MIRROR_ROTATE_INVERTED": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror rotate inverted"
      }
    },
    "MIRROR_ROTATE_NORMAL": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror rotate normal"
      }
    },
    "MIRROR_ROTATE_RIGHT": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror rotate right"
      }
    },
    "MIRROR_ROTATE_LEFT": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror rotate left"
      }
    },
    "MIRROR_SCREEN_OFF": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror screen off"
      }
    },
    "MIRROR_SCREEN_ON": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror screen on"
      }
    },
    "MIRROR_SCREEN_ONE": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror screen 1"
      }
    },
    "MIRROR_SCREEN_TWO": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror screen 2"
      }
    },
    "MIRROR_SCREEN_SWITCH": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror screen switch"
      }
    },
    "MIRROR_STOP": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror stop"
      }
    },
    "MIRROR_MUTE": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror mute"
      }
    },
    "MIRROR_UNMUTE": {
      soundExec: {
        chime: "close",
      },
      shellExec: {
        exec: "mirror unmute"
      }
    },
    "MIRROR_ALL": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror all"
      }
    },
    "MIRROR_ART": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror art"
      }
    },
    "MIRROR_CAL": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror calendar"
      }
    },
    "MIRROR_CANDY": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror candy"
      }
    },
    "MIRROR_CRYPTO": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror crypto"
      }
    },
    "MIRROR_DEFAULT": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror default"
      }
    },
    "MIRROR_FACE": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror face"
      }
    },
    "MIRROR_FRACTALS": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror fractals"
      }
    },
    "MIRROR_GIF": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror gif"
      }
    },
    "MIRROR_IFRAME": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror iframe"
      }
    },
    "MIRROR_NATURE": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror nature"
      }
    },
    "MIRROR_NETWORK": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror network"
      }
    },
    "MIRROR_NEWS": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror news"
      }
    },
    "MIRROR_NORMAL": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror normal"
      }
    },
    "MIRROR_OWLS": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror owls"
      }
    },
    "MIRROR_PORTAL": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror portal"
      }
    },
    "MIRROR_RADAR": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror radar"
      }
    },
    "MIRROR_ROON": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror roon"
      }
    },
    "MIRROR_SCENES": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror scenes"
      }
    },
    "MIRROR_SCNEWS": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror scnews"
      }
    },
    "MIRROR_SCOREBOARD": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror scoreboard"
      }
    },
    "MIRROR_SMOKE": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror smoke"
      }
    },
    "MIRROR_SNOWCRASH": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror snowcrash"
      }
    },
    "MIRROR_STOCKS": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror stocks"
      }
    },
    "MIRROR_TANTRA": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror tantra"
      }
    },
    "MIRROR_TRAFFIC": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror traffic"
      }
    },
    "MIRROR_VOICE": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror voice"
      }
    },
    "MIRROR_WATERFALLS": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror waterfalls"
      }
    },
    "MIRROR_WEATHER": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror weather"
      }
    },
    "MIRROR_YOUTUBE": {
      soundExec: {
        chime: "open",
      },
      shellExec: {
        exec: "mirror YouTube"
      }
    },
  }
}

exports.recipe = recipe // Don't remove this line.
