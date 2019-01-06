import config from '../../config'
import * as PIXI from 'pixi.js'
import EnvType from './EnvType'
import Environment from '../../mainMap/Environment'

const Coast = 64
const Bank = 128

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
                    let terrain = MapData[chunkIndex].Blocks[x][y].Terrain,
                        realTerrain = terrain - ((terrain & Coast) + (terrain & Bank)),
                        isVoid = (EnvType[realTerrain] == null)

                    let texture = (isVoid) ? window.textures.environment[EnvType[0]] : window.textures.environment[EnvType[realTerrain]]
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
        let border = new PIXI.Graphics(),
            chunkSize = Math.min(window.mainMapWidth, window.mainMapHeight) / Math.min(config.chunkCoorX, config.chunkCoorY),
            spaceSize = chunkSize / config.spaceCoor
        // draw pos border
        border.nativeLines = true
        border.lineStyle(1, 0x000000, 0.5)
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
        // draw chunk border
        border.lineStyle(3, 0x000000, 0.7)
        border.nativeLines = false
        // draw horizontal lines
        for (let i = 0; i <= config.chunkCoorY; ++i) {
            border.moveTo(0, chunkSize * i)
            border.lineTo(chunkSize * config.chunkCoorX, chunkSize * i)
        }
        // draw vertical lines
        for (let i = 0; i <= config.chunkCoorX; ++i) {
            border.moveTo(chunkSize * i, 0)
            border.lineTo(chunkSize * i, chunkSize * config.chunkCoorY)
        }
        // set zindex
        border.zIndex = 1

        resolve(border)
    })
}
