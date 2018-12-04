import Structures from '../API/mainMap/Structure'

import * as PIXI from 'pixi.js'
import * as API from '../API'

const layerSize = 768
const chunkCoor = 2
const spaceCoor = 16
const spaceSize = layerSize / chunkCoor / spaceCoor

var allowPoints = null
var mapData = null

export default function CreateBuildLayer (conn, MapData, building) {
    return new Promise(async resolve => {
        // create layer
        var layer = new PIXI.Container()
        // create background
        var background = await backgroundCreate()
        layer.addChild(background)
        // select space create
        layer.selectSpace = await selectSpaceCreate(building)

        allowPoints = await API.mainMap.CalcAllowBuildPoint(MapData, building)
        mapData = MapData

        // mouse event setting
        layer.interactive = true

        layer.mouseover = function(mouseData) {
            console.log(mouseData.currentTarget)
            let chunkIndex = Math.floor(mouseData.data.global.x / (layerSize / chunkCoor)) + Math.floor(mouseData.data.global.y / (layerSize / chunkCoor)) * chunkCoor
            let index = Math.floor(mouseData.data.global.x / spaceSize) % spaceCoor + Math.floor(mouseData.data.global.y / spaceSize) % spaceCoor * spaceCoor
            this.isHover = true
            this.addChild(this.selectSpace)
            this.selectSpace.x = Math.floor(mouseData.data.global.x / spaceSize) * spaceSize
            this.selectSpace.y = Math.floor(mouseData.data.global.y / spaceSize) * spaceSize
            this.selectSpace.graphicsData[0].fillColor = (allowPoints[chunkIndex][index]) ? 0x00ff00 : 0xff0000
        }

        layer.mousemove = function(mouseData) {
            if(this.isHover) {
                let chunkIndex = Math.floor(mouseData.data.global.x / (layerSize / chunkCoor)) + Math.floor(mouseData.data.global.y / (layerSize / chunkCoor)) * chunkCoor
                let index = Math.floor(mouseData.data.global.x / spaceSize) % spaceCoor + Math.floor(mouseData.data.global.y / spaceSize) % spaceCoor * spaceCoor
                this.selectSpace.x = Math.floor(mouseData.data.global.x / spaceSize) * spaceSize
                this.selectSpace.y = Math.floor(mouseData.data.global.y / spaceSize) * spaceSize
                this.selectSpace.graphicsData[0].fillColor = (allowPoints[chunkIndex][index]) ? 0x00ff00 : 0xff0000
            }
        }

        layer.mouseout = function(mouseData) {
            this.isHover = false
            this.removeChild(this.selectSpace)
        }

        layer.on('pointerdown', function(mouseData) {
            this.isHover = false
            let chunkIndex = Math.floor(mouseData.data.global.x / (layerSize / chunkCoor)) + Math.floor(mouseData.data.global.y / (layerSize / chunkCoor)) * chunkCoor
            let x = Math.floor(mouseData.data.global.x / spaceSize) % spaceCoor
            let y = Math.floor(mouseData.data.global.y / spaceSize) % spaceCoor
            API.mainMap.BuildOperRequest(conn, 'Build', Structures[building].ID, mapData[chunkIndex].Pos, {'X': x, 'Y': y})
            this.parent.removeChild(this)
            API.miniMap.ViewRangeMapdataRequest(conn, {'X': 0, 'Y': 0})
        })

        layer.zIndex = 99
        layer.alpha = 0.5
        resolve(layer)
    })
}

function backgroundCreate() {
    return new Promise(resolve => {
        var bg = new PIXI.Graphics()
        bg.beginFill(0x000000)
        bg.drawRect(0, 0, layerSize, layerSize)
        bg.endFill()

        resolve(bg)
    })
}


function selectSpaceCreate (building) {
    return new Promise(resolve => {
        var selectSpace = new PIXI.Graphics()
        selectSpace.beginFill(0x00ff00)
        selectSpace.drawRect(0, 0, Structures[building].Size * spaceSize, Structures[building].Size * spaceSize)
        selectSpace.endFill()

        resolve(selectSpace)
    })
}
