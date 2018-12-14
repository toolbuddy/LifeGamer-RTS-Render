import * as PIXI from 'pixi.js'
import EnvType from './EnvType'

const layerSize = 950
const chunkCoor = 2
const spaceCoor = 16
const spaceSize = layerSize / chunkCoor / spaceCoor

const textStyle = {
    fill: "white",
    fontFamily: "cwTeXYen, sans-serif, \"Courier New\"",
    fontSize: 20
}

/**
 * The function update chunkInfo container data and setting keydown, keyup event
 *
 * @function
 *
 * @param {PIXI.Container} container - the parent container of this object
 * @param {Object} MapData - the mapdata getting from server
 */
export default function ChunkInfoUpdate(container, MapData) {
    return new Promise(async resolve => {
        let chunkInfo = new PIXI.Container()
        let chunkInfoBackground = new PIXI.Graphics()

        chunkInfoBackground.beginFill(0x000000)
        chunkInfoBackground.drawRect(0, 0, layerSize, layerSize)

        chunkInfo.addChild(chunkInfoBackground)
        for (let chunkIndex = 0; chunkIndex < MapData.length; ++chunkIndex) {
            chunkInfo.addChild(await InfoUpdate(MapData[chunkIndex], chunkIndex))
        }

        chunkInfo.interactive = true        // avoid the mouseevent under this layer
        chunkInfo.alpha = 0.7

        container.chunkInfo = chunkInfo
        // add event listener, keydown
        window.addEventListener('keydown', function(event) {
            const key = event.keyCode
            if (key == 81) {
                container.QPress = true
                container.addChild(container.chunkInfo)
            }
        })
        // add event listener, keyup
        window.addEventListener('keyup', function(event) {
            const key = event.keyCode
            if (key == 81 && container.QPress) {
                container.QPress = false
                container.removeChild(container.chunkInfo)
            }
        })


        resolve()
    })
}

/**
 * The function setting info text and position
 *
 * @function
 *
 * @param {Object} ChunkData - part of mapdata
 * @param {number} chunkIndex - the index of chunk, from 0 to 3
 * @returns {Promise<PIXI.Text>} a promise contains PIXI.Text object
 * @resolve {PIXI.Text} the chunk info
 */
function InfoUpdate(ChunkData, chunkIndex) {
    return new Promise(async resolve => {
        let info = new PIXI.Text(await TextGen(ChunkData), textStyle)

        info.anchor.set(0.5)

        info.x = (chunkIndex % chunkCoor) * (layerSize / chunkCoor) + (layerSize / chunkCoor / 2)
        info.y = Math.floor(chunkIndex / chunkCoor) * (layerSize / chunkCoor) + (layerSize / chunkCoor / 2)

        resolve(info)
    })
}

/**
 * The function generate chunk text info
 *
 * @function
 *
 * @param {Object} chunkData - part of mapdata
 * @returns {Promise<string>} a promise contains chunkinfo string
 * @resolve {string} chunkinfo string
 */
function TextGen(chunkData) {
    return new Promise(async resolve => {
        let textString = ''
        textString += `Chunk Pos: (${chunkData.Pos.X}, ${chunkData.Pos.Y})\n`
        textString += `Owner: ${chunkData.Owner !== '' ? chunkData.Owner : 'None'}\n`
        textString += `Environment: \n${await EnvCalculate(chunkData)}\n`
        textString += `Population: ${window.playerData.Username === chunkData.Owner ? chunkData.Human : '???'}`
        resolve(textString)
    })
}

/**
 * The function calculate the percentage of environment
 *
 * @param {Object} chunkData - part of mapdata
 * @returns {Promise<string>} a promise contains string about environment percentage info
 * @resolve {string} environment percentage info
 */
function EnvCalculate(chunkData) {
    return new Promise(resolve => {
        let num = chunkData.Blocks.length * chunkData.Blocks[0].length, percent = {}
        for (let x = 0; x < chunkData.Blocks.length; ++x) {
            for (let y = 0; y < chunkData.Blocks[x].length; ++y) {
                if(percent[EnvType[chunkData.Blocks[x][y].Terrain]]) percent[EnvType[chunkData.Blocks[x][y].Terrain]]++
                else percent[EnvType[chunkData.Blocks[x][y].Terrain]] = 1
            }
        }
        let keys = Object.keys(percent), EnvPercent = ''
        for (let i = 0; i < keys.length; ++i) {
            if (i) EnvPercent += '\n'
            EnvPercent += `\t\t${keys[i]}: ${percent[keys[i]] /= (num/100)}%`
        }
        resolve(EnvPercent)
    })
}
