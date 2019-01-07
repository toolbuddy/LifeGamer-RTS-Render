import * as PIXI from 'pixi.js'
import config from '../config'

/**
 * The base class let other class inherit
 *
 * @class
 */
class Environment {
    /**
     * @constructor
     *
     * @param {PIXI.Texture} env - the texture of environment
     * @param {number} chunkIndex - the index of chunk, from 0 to 3
     * @param {number} x - the pos of x
     * @param {number} y - the pos of y
     */
    constructor (env, chunkIndex, x, y) {
        this.env = env
        this.chunkIndex = chunkIndex
        this.x = x
        this.y = y

        this.objectInit()
    }
    /**
     * The function init the env object
     */
    objectInit () {
        let chunkSize = Math.min(window.mainMapWidth, window.mainMapHeight) / Math.min(config.chunkCoorX, config.chunkCoorY),
            spaceSize = chunkSize / config.spaceCoor

        this.object = new PIXI.Sprite(this.env)
        // scale
        this.object.scale.x = spaceSize / this.object.width
        this.object.scale.y = spaceSize / this.object.height

        // set position
        this.object.x = (this.chunkIndex % config.chunkCoorX) * chunkSize + this.x * spaceSize
        this.object.y = Math.floor((this.chunkIndex / config.chunkCoorX)) * chunkSize + this.y * spaceSize

        this.object.alpha = 0.8

        // set zindex
        this.object.zIndex = 0
    }
}

export default Environment

