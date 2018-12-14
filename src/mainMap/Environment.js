const layerSize = 950
const chunkCoor = 2
const spaceCoor = 16
const spaceSize = layerSize / chunkCoor / spaceCoor

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
        this.object = new PIXI.Sprite(this.env)
        // scale
        this.object.scale.x = spaceSize / this.object.width
        this.object.scale.y = spaceSize / this.object.height

        // set position
        this.object.x = (this.chunkIndex % chunkCoor) * (layerSize / chunkCoor) + this.x * spaceSize
        this.object.y = Math.floor((this.chunkIndex / chunkCoor)) * (layerSize / chunkCoor) + this.y * spaceSize

        this.object.alpha = 0.8

        // set zindex
        this.object.zIndex = 0
    }
}

export default Environment

