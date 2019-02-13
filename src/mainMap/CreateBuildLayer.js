import config from '../config'
import Structures from '../API/mainMap/Structure'

import * as PIXI from 'pixi.js'
import * as API from '../API'

export default function CreateBuildLayer (conn, MapData, building) {
    let chunkSize = Math.max(window.innerWidth / config.chunkCoorX, window.innerHeight / config.chunkCoorY),
        spaceSize = chunkSize / config.spaceCoor

    return new Promise(async resolve => {
        // create layer
        var layer = new PIXI.Container()
        // create background
        var background = await backgroundCreate(window.mainMapWidth, window.mainMapHeight)
        layer.addChild(background)
        // create border
        var border = await borderCreate()
        layer.addChild(border)
        // select space create
        layer.selectSpace = await selectSpaceCreate(building, spaceSize)

        let allowPoints = await API.mainMap.CalcAllowBuildPoint(window.playerData.Username, MapData, building)

        // mouse event setting
        layer.interactive = true

        layer.mouseover = function(mouseData) {
            let scale = Math.min(window.mainMapWidth / window.innerWidth, window.mainMapHeight / window.innerHeight)
            let chunkIndex = Math.floor(mouseData.data.global.x / chunkSize) + Math.floor(mouseData.data.global.y / chunkSize) * config.chunkCoorX
            let index = Math.floor(mouseData.data.global.x / spaceSize) % config.spaceCoor + Math.floor(mouseData.data.global.y / spaceSize) % config.spaceCoor * config.spaceCoor,
                x = Math.floor(mouseData.data.global.x / spaceSize),
                y = Math.floor(mouseData.data.global.y / spaceSize)
            this.isHover = true
            this.addChild(this.selectSpace)
            this.selectSpace.x = x * (spaceSize * scale)
            this.selectSpace.y = y * (spaceSize * scale)
            this.selectSpace.graphicsData[0].fillColor = (allowPoints[chunkIndex][index]) ? 0x00ff00 : 0xff0000
        }

        layer.mousemove = function(mouseData) {
            if(this.isHover) {
                let scale = Math.min(window.mainMapWidth / window.innerWidth, window.mainMapHeight / window.innerHeight)
                let chunkIndex = Math.floor(mouseData.data.global.x / chunkSize) + Math.floor(mouseData.data.global.y / chunkSize) * config.chunkCoorX
                let index = Math.floor(mouseData.data.global.x / spaceSize) % config.spaceCoor + Math.floor(mouseData.data.global.y / spaceSize) % config.spaceCoor * config.spaceCoor,
                    x = Math.floor(mouseData.data.global.x / spaceSize),
                    y = Math.floor(mouseData.data.global.y / spaceSize)

                this.selectSpace.x = x * (spaceSize * scale)
                this.selectSpace.y = y * (spaceSize * scale)
                this.selectSpace.graphicsData[0].fillColor = (allowPoints[chunkIndex][index]) ? 0x00ff00 : 0xff0000
            }
        }

        layer.mouseout = function(mouseData) {
            this.isHover = false
            this.removeChild(this.selectSpace)
        }

        layer.on('pointerdown', function(mouseData) {
            this.isHover = false
            let chunkIndex = Math.floor(mouseData.data.global.x / chunkSize) + Math.floor(mouseData.data.global.y / chunkSize) * config.chunkCoorX
            let x = Math.floor(mouseData.data.global.x / spaceSize) % config.spaceCoor
            let y = Math.floor(mouseData.data.global.y / spaceSize) % config.spaceCoor
            API.mainMap.BuildOperRequest(conn, 'Build', Structures[building].ID, MapData[chunkIndex].Pos, {'X': x, 'Y': y})
            this.parent.removeChild(this)

            window.elementsToggle()
        })

        layer.zIndex = 99
        layer.alpha = 0.5


        resolve(layer)
    })
}

/**
 * The function creating stage border
 *
 * @function
 *
 * @returns {Promise<PIXI.Graphics>} a promise contains border PIXI.Graphics object
 * @resolve {PIXI.Graphics} border PIXI.Graphics object
 */
function borderCreate() {
    return new Promise(resolve => {
        let border = new PIXI.Graphics(),
            chunkSize = Math.min(window.mainMapWidth, window.mainMapHeight) / Math.min(config.chunkCoorX, config.chunkCoorY),
            spaceSize = chunkSize / config.spaceCoor

        // draw pos border
        border.nativeLines = true
        border.lineStyle(1, 0x000000, 0.3)
        // draw horizontal lines
        for (let i = 0; i < config.spaceCoor * config.chunkCoorY; ++i) {
            border.moveTo(0, spaceSize * i)
            border.lineTo(chunkSize * config.chunkCoorX, spaceSize * i)
        }
        // draw vertical lines
        for (let i = 0; i < config.spaceCoor * config.chunkCoorX; ++i) {
            border.moveTo(spaceSize * i, 0)
            border.lineTo(spaceSize * i, chunkSize * config.chunkCoorY)
        }

        border.lineStyle(3, 0x000000, 0.5)
        border.nativeLines = false
        for (let i = 0; i <= config.chunkCoorY; ++i) {
            border.moveTo(0, chunkSize * i)
            border.lineTo(chunkSize * config.chunkCoorX, chunkSize * i)
        }

        for (let i = 0; i <= config.chunkCoorX; ++i) {
            border.moveTo(chunkSize * i, 0)
            border.lineTo(chunkSize * i, chunkSize * config.chunkCoorY)
        }

        resolve(border)
    })
}



function backgroundCreate(width, height) {
    return new Promise(resolve => {
        var bg = new PIXI.Graphics()
        bg.beginFill(0x000000)
        bg.drawRect(0, 0, width, height)
        bg.endFill()

        resolve(bg)
    })
}


function selectSpaceCreate (building, spaceSize) {
    return new Promise(resolve => {
        let scale = Math.min(window.mainMapWidth / window.innerWidth, window.mainMapHeight / window.innerHeight)

        var selectSpace = new PIXI.Graphics()
        selectSpace.beginFill(0x00ff00)
        selectSpace.drawRect(0, 0, Structures[building].Size * spaceSize * scale, Structures[building].Size * spaceSize * scale)
        selectSpace.endFill()

        resolve(selectSpace)
    })
}
