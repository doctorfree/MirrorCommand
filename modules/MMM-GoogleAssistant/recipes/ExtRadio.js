/**  Radio italiane   **/
/** aggiornate al giorno 09/05/20 **/
/**  @di-ma  **/
/** update for GA v3 19/05/21 @bugsounet **/

var recipe = {
  transcriptionHooks: {
    "kisskiss": {
      pattern: "kiss kiss",
      command: "kisskiss"
    },
    "radioparadise": {
      pattern: "radio paradise",
      command: "radioparadise"
    },
    "funradio": {
      pattern: "fun radio",
      command: "funradio"
    },
    "skyrock": {
      pattern: "sky rock",
      command: "skyrock"
    },
  },

  commands: {
    "skyrock": {
      functionExec: {
        exec: () => {
          this.radioCommand({
            img: ['modules/MMM-GoogleAssistant/resources/LogosRadios/Skyrock.png'],
            link: "http://icecast.skyrock.net/s/natio_mp3_128k"
          })
        }
      },
      soundExec: {
        chime: "open"
      }
    },
    "funradio": {
      functionExec: {
        exec: () => {
          this.radioCommand({
            img: ['modules/MMM-GoogleAssistant/resources/LogosRadios/FunRadio.png'],
            link: "http://streaming.radio.funradio.fr:80/fun-1-44-128"
          })
        }
      },
      soundExec: {
        chime: "open"
      }
    },
    "kisskiss": {
      functionExec: {
        exec: () => {
          this.radioCommand({
            img: "http://www.di-ma.info/radio/kisskiss.png",
            link: "http://ice07.fluidstream.net:8080/KissKiss.mp3"
          })
        }
      },
      soundExec: {
        chime: "open"
      }
    },
    "radioparadise": {
      functionExec: {
        exec: () => {
          this.radioCommand({
            img: "https://radioparadise.com/graphics/logo_flat_350x103.png",
            link: "https://stream.radioparadise.com/aac-320"
          })
        }
      },
      soundExec: {
        chime: "open"
      }
    },
  }
}
exports.recipe = recipe
