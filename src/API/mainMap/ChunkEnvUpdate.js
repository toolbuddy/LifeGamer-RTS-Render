import * as PIXI from 'pixi.js'
import EnvType from './EnvType'
import Environment from '../../mainMap/environment/Environment'

/**
 * The function creating all env objects by given data inside the chunk
 *
 * @function
 *
 * @param {PIXI.Container} container - the env pixi container
 * @param {number} chunkIndex - the index of chunk, from 0 to 3
 * @param {Object} env - the env data, its inside the chunk
 */

export default function ChunkEnvUpdate(container, chunkIndex, env) {
    return new Promise(async resolve => {
        await ClearContainer(container)
        let environment = await ListInit(chunkIndex, env)
        await ObjectInit(chunkIndex, container, environment)
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
        for (var i = container.children.length - i; i >= 0; i--) {
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
 * @param {number} chunkIndex - the index of chunk, from 0 to 3
 * @param {Object} env - env type, 2-d 16*16 array
 * @returns {Promise<Object>} a promise contains environment list
 * @resolve {Object} environment list
 */
function ListInit(chunkIndex, env) {
    var chunkEnv = []
    return new Promise(resolve => {
        for (let i = 0; i < 16; ++i) {
            for (let j = 0; j < 16; ++j) {
                chunkEnv.push(new Environment(EnvType[env[i][j].Terrain], chunkIndex, i, j))
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
 * @param {number} chunkIndex - the index of chunk, from 0 to 3
 * @param {PIXI.Container} container - the env pixi container
 * @param {Object} environmentList - env list, 1-d array
 */
function ObjectInit(chunkIndex, container, environmentList) {
    return new Promise(async resolve => {
        for (let env of environmentList) {
            container.addChild(env.object)
        }
        let border = await BorderCreate(chunkIndex)
        container.addChild(border)
        resolve()
    })
}

/**
 * The function creating stage border
 *
 * @function
 *
 * @param {number} chunkIndex - the index of chunk, from 0 to 3
 * @returns {Promise<PIXI.Graphics>} a promise contains border PIXI.Graphics object
 * @resolve {PIXI.Graphics} border PIXI.Graphics object
 */
function BorderCreate(chunkIndex) {
    return new Promise(resolve => {
        let border = new PIXI.Graphics()
        // draw pos border
        border.nativeLines = true
        border.lineStyle(1, 0x000000, 0.1)
        for (let i = 1; i < 16; ++i) {
            border.moveTo(0, 24 * i)
            border.lineTo(384, 24 * i)
        }

        for (let i = 1; i < 16; ++i) {
            border.moveTo(24 * i, 0)
            border.lineTo(24 * i, 384)
        }

        // draw chunk border
        border.lineStyle(1, 0x000000, 0.7)
        border.nativeLines = false
        border.moveTo(0, 0)
        border.lineTo(384, 0)
        border.lineTo(384, 384)
        border.lineTo(0, 384)
        border.lineTo(0, 0)

        // position setting
        border.x = (chunkIndex % 2) * 384
        border.y = Math.floor(chunkIndex / 2) * 384
        resolve(border)
    })
}
