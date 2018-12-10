import * as PIXI from 'pixi.js'
import EnvType from './EnvType'
import Environment from '../../mainMap/environment/Environment'

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
        for (let n = 0; n < MapData.length; ++n) {
            for (let i = 0; i < 16; ++i) {
                for (let j = 0; j < 16; ++j) {
                    chunkEnv.push(new Environment(EnvType[MapData[n].Blocks[i][j].Terrain], n, i, j))
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
        border.lineStyle(1, 0x000000, 0.1)
        for (let i = 0; i < 32; ++i) {
            border.moveTo(0, 24 * i)
            border.lineTo(768, 24 * i)
            border.moveTo(24 * i, 0)
            border.lineTo(24 * i, 768)
        }

        // draw chunk border
        border.lineStyle(1, 0x000000, 0.7)
        border.nativeLines = false
        border.moveTo(0, 0)
        border.lineTo(768, 0)
        border.lineTo(768, 768)
        border.lineTo(0, 768)
        border.lineTo(0, 0)

        border.moveTo(384, 0)
        border.lineTo(384, 768)
        border.moveTo(0, 384)
        border.lineTo(768, 384)

        // set zindex
        border.zIndex = 1

        resolve(border)
    })
}
