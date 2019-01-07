import * as PIXI from 'pixi.js'
import MiniMap from '../miniMap/miniMap'

var totalChunks = 2500;
var moveCanvas = document.querySelector('#left > canvas'),
    moveCanvasApp = new PIXI.Application({
        width: 300,
        height: 300,
        antialias: true,
        transparent: false,
        resolution: 1,
        backgroundColor: 0xffffff,
        view: moveCanvas
    })

moveCanvasApp.render.autoResize = true

function createCanvas() {
    if (!window.moveMiniMap) {
        window.moveMiniMap = new MiniMap(
            300,
            300,
            totalChunks
        )

        window.moveMiniMap.init()
        window.moveMiniMap.mode = 'populationMove'
        moveCanvasApp.stage.addChild(window.moveMiniMap)

        window.moveMiniMap.mapDataUpdate(window.miniMap._data.data)
        window.moveMiniMap.addBackGround(window.textures.miniMapBackground)
        window.moveMiniMap.initName(window.playerData.Username)
    }
    // init
    window.moveMiniMap.moveType = null
    window.moveMiniMap.moveFrom = null
    window.moveMiniMap.moveTo = null

    window.moveMiniMap.removeChild(window.moveMiniMap.focusMoveRectFrom)
    window.moveMiniMap.removeChild(window.moveMiniMap.focusMoveRectTo)

    window.moveMiniMap.setDspCenter(window.playerData.data.Home.X, window.playerData.data.Home.Y)
}

export default createCanvas
