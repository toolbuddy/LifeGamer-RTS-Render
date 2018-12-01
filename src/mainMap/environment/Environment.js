import EnvColor from './EnvColor'

var spaceSize = 24

/**
 * The base class let other class inherit
 *
 * @class
 */
class Environment {
    /**
     * @constructor
     *
     * @param {string} env - environment type
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
        // draw rectangle and border
        this.object = new PIXI.Graphics()
        this.object.beginFill(EnvColor[this.env])
        this.object.drawRect(0, 0, spaceSize, spaceSize)
        this.object.endFill()


        // set position
        this.object.x = (this.chunkIndex%2) * 384 + this.x * spaceSize
        this.object.y = Math.floor((this.chunkIndex/2)) * 384 + this.y * spaceSize
    }
}

export default Environment

