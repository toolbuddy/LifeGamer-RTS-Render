import config from '../config'
import Structures from '../API/mainMap/Structure'

import * as PIXI from 'pixi.js'
import * as API from '../API'

export default function CreateBuildLayer (conn, MapData, building) {
    let chunkSize = Math.min(window.mainMapWidth, window.mainMapHeight) / Math.min(config.chunkCoorX, config.chunkCoorY),
        spaceSize = chunkSize / config.spaceCoor

    console.log(chunkSize, spaceSize)
    return new Promise(async resolve => {
        // create layer
        var layer = new PIXI.Container()
        // create background
        var background = await backgroundCreate(window.mainMapWidth, window.mainMapHeight)
        layer.addChild(background)
        // select space create
        layer.selectSpace = await selectSpaceCreate(building, spaceSize)

        let allowPoints = await API.mainMap.CalcAllowBuildPoint(MapData, building)

        // mouse event setting
        layer.interactive = true

        layer.mouseover = function(mouseData) {
            let scale = Math.min(window.mainMapWidth / window.innerWidth, window.mainMapHeight / window.innerHeight)
            let chunkIndex = Math.floor(mouseData.data.global.x / chunkSize) + Math.floor(mouseData.data.global.y / chunkSize) * config.chunkCoorX
            let index = Math.floor(mouseData.data.global.x / spaceSize) % config.spaceCoor + Math.floor(mouseData.data.global.y / spaceSize) % config.spaceCoor * config.spaceCoor
            this.isHover = true
            this.addChild(this.selectSpace)
            this.selectSpace.x = (Math.floor(mouseData.data.global.x / spaceSize) * spaceSize) * scale
            this.selectSpace.y = (Math.floor(mouseData.data.global.y / spaceSize) * spaceSize) * scale
            this.selectSpace.graphicsData[0].fillColor = (allowPoints[chunkIndex][index]) ? 0x00ff00 : 0xff0000
        }

        layer.mousemove = function(mouseData) {
            if(this.isHover) {
                let scale = Math.min(window.mainMapWidth / window.innerWidth, window.mainMapHeight / window.innerHeight)
                let chunkIndex = Math.floor(mouseData.data.global.x / chunkSize) + Math.floor(mouseData.data.global.y / chunkSize) * config.chunkCoorX
                let index = Math.floor(mouseData.data.global.x / spaceSize) % config.spaceCoor + Math.floor(mouseData.data.global.y / spaceSize) % config.spaceCoor * config.spaceCoor
                this.selectSpace.x = (Math.floor(mouseData.data.global.x / spaceSize) * spaceSize) * scale
                this.selectSpace.y = (Math.floor(mouseData.data.global.y / spaceSize) * spaceSize) * scale
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
            API.miniMap.ViewRangeMapdataRequest(conn, MapData[0].Pos)

            // show all other elements
            document.querySelector('#menu').style.display = 'block'
            document.querySelector('#statusBar').style.display = 'block'
            document.querySelector('#miniMap').style.display = 'block'
        })

        layer.zIndex = 99
        layer.alpha = 0.5


        resolve(layer)
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
        var selectSpace = new PIXI.Graphics()
        selectSpace.beginFill(0x00ff00)
        selectSpace.drawRect(0, 0, Structures[building].Size * spaceSize, Structures[building].Size * spaceSize)
        selectSpace.endFill()

        resolve(selectSpace)
    })
}
