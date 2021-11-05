/**   with-MMM-Scenes                                 **/
/**   Voice commands script to manage MMM-Scenes      **/
/**   Requires MirrorCommandLine:                     **/
/**   https://gitlab.com/doctorfree/MirrorCommandLine **/
/**   @doctorfree                                     **/

var recipe = {
  transcriptionHooks: {
    "SCENES_NEXT": {
      pattern: "next scene",
      command: "SCENES_NEXT"
    },
    "SCENES_PREV": {
      pattern: "previous scene",
      command: "SCENES_PREV"
    },
    "SCENES_ACT_ONE": {
      pattern: "scene one|scene 1",
      command: "SCENES_ACT_ONE"
    },
    "SCENES_ACT_TWO": {
      pattern: "scene two|scene 2",
      command: "SCENES_ACT_TWO"
    },
    "SCENES_ACT_THREE": {
      pattern: "scene three|scene 3",
      command: "SCENES_ACT_THREE"
    },
    "SCENES_ACT_FOUR": {
      pattern: "scene four|scene 4",
      command: "SCENES_ACT_FOUR"
    },
    "SCENES_ACT_FIVE": {
      pattern: "scene five|scene 5",
      command: "SCENES_ACT_FIVE"
    },
    "SCENES_ACT_NAME": {
      pattern: "scene (.*)",
      command: "SCENES_ACT_NAME"
    },
  },

  commands: {
    "SCENES_NEXT": {
      shellExec: {
        exec: "mirror scene next"
      },
      soundExec: {
        chime: "open"
      }
    },
    "SCENES_PREV": {
      shellExec: {
        exec: "mirror scene prev"
      },
      soundExec: {
        chime: "open"
      }
    },
    "SCENES_ACT_ONE": {
      shellExec: {
        exec: "mirror scene 0"
      },
      soundExec: {
        chime: "open"
      }
    },
    "SCENES_ACT_TWO": {
      shellExec: {
        exec: "mirror scene 1"
      },
      soundExec: {
        chime: "open"
      }
    },
    "SCENES_ACT_THREE": {
      shellExec: {
        exec: "mirror scene 2"
      },
      soundExec: {
        chime: "open"
      }
    },
    "SCENES_ACT_FOUR": {
      shellExec: {
        exec: "mirror scene 3"
      },
      soundExec: {
        chime: "open"
      }
    },
    "SCENES_ACT_FIVE": {
      shellExec: {
        exec: "mirror scene 4"
      },
      soundExec: {
        chime: "open"
      }
    },
    "SCENES_ACT_NAME": {
      shellExec: {
        exec: (params) => {
          var sceneName = params[1]
          return "mirror scene " + sceneName
        }
      },
      soundExec: {
        chime: "open"
      }
    },
  }
}

exports.recipe = recipe // Don't remove this line.
