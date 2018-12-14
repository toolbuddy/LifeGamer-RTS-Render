import * as PIXI from 'pixi.js'
import EnvType from './EnvType'
import Environment from '../../mainMap/Environment'

const layerSize = 950
const chunkCoor = 2
const spaceCoor = 16
const spaceSize = layerSize / chunkCoor / spaceCoor

/**
 * The function creating all env objects by given data inside the chunk
 *
 * @function
 *
 * @param {PIXI.Container} container - the env pixi container
 * @param {Object} MapData - the map data getting from backend
 */

export default function ChunkEnvUpdate(container, MapData) {
    return new Promise(async resolve => {
        await ClearContainer(container)
        let environment = await ListInit(MapData)
        await ObjectInit(container, environment)
        resolve()
    })
}

/**
 * The function clear all objects inside container
 *
 * @function
 *
 * @param {PIXI.Container} container - the pixi container
 */
function ClearContainer(container) {
    return new Promise(resolve => {
        for (var i = container.children.length - 1; i >= 0; i--) {
            container.removeChild(container.children[i])
        }
        resolve()
    })
}

/**
 * The function creating environment list
 *
 * @function
 *
 * @param {Object} MapData - map data, getting from backend
 * @returns {Promise<Object>} a promise contains environment list
 * @resolve {Object} environment list
 */
function ListInit(MapData) {
    var chunkEnv = []
    return new Promise(resolve => {
        for (let chunkIndex = 0; chunkIndex < MapData.length; ++chunkIndex) {
            for (let x = 0; x < 16; ++x) {
                for (let y = 0; y < 16; ++y) {
                    let texture = window.textures.environment[EnvType[MapData[chunkIndex].Blocks[x][y].Terrain]]
                    chunkEnv.push(new Environment(texture, chunkIndex, x, y))
                }
            }
        }
        resolve(chunkEnv)
    })
}

/**
 * Insert all pixi sprite object into pixi container
 *
 * @async
 * @function
 *
 * @param {PIXI.Container} container - the env pixi container
 * @param {Object} environmentList - env list, 1-d array
 */
function ObjectInit(container, environmentList) {
    return new Promise(async resolve => {
        for (let env of environmentList) {
            container.addChild(env.object)
        }
        let border = await BorderCreate()
        container.addChild(border)
        resolve()
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
function BorderCreate() {
    return new Promise(resolve => {
        let border = new PIXI.Graphics()
        // draw pos border
        border.nativeLines = true
        border.lineStyle(1, 0x000000, 0.5)
        for (let i = 0; i < spaceCoor * chunkCoor; ++i) {
            border.moveTo(0, spaceSize * i)
            border.lineTo(layerSize, spaceSize * i)
            border.moveTo(spaceSize * i, 0)
            border.lineTo(spaceSize * i, layerSize)
        }

        // draw chunk border
        border.lineStyle(3, 0x000000, 0.7)
        border.nativeLines = false
        border.moveTo(0, 0)
        border.lineTo(layerSize, 0)
        border.lineTo(layerSize, layerSize)
        border.lineTo(0, layerSize)
        border.lineTo(0, 0)

        border.moveTo((layerSize / chunkCoor), 0)
        border.lineTo((layerSize / chunkCoor), layerSize)
        border.moveTo(0, (layerSize / chunkCoor))
        border.lineTo(layerSize, (layerSize / chunkCoor))

        // set zindex
        border.zIndex = 1

        resolve(border)
    })
}
