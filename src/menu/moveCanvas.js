import * as PIXI from 'pixi.js'
import MiniMap from '../miniMap/miniMap'

var totalChunks = 2500,
    moveMiniMap = null
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
    console.log(moveMiniMap)
    if (!moveMiniMap) {
        moveMiniMap = new MiniMap(
            300,
            300,
            totalChunks
        )

        moveMiniMap.init()
        moveMiniMap.mode = 'populationMove'
        moveCanvasApp.stage.addChild(moveMiniMap)

        moveMiniMap.mapDataUpdate(window.miniMap._data.data)
        moveMiniMap.initName(window.playerData.Username)
    }
    moveMiniMap.setDspCenter(window.playerData.data.Home.X, window.playerData.data.Home.Y)
}

export default createCanvas
