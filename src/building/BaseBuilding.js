import * as PIXI from 'pixi.js'

/**
 * The base class let other class inherit
 *
 * @class
 */
class BaseBuilding {
    /**
     * @constructor
     *
     * @param {Object} info - The structure data
     * @param {number} chunkIndex - which chunk the structure belongs to
     */
    constructor (info, chunkIndex) {
        this.info = info
        this.chunkIndex = chunkIndex
    }
    /**
     * Init the object as PIXI.Sprite object
     *
     * @function
     */
    objectInit () {
        this.object = new PIXI.Sprite.fromImage(this.imgUrl)
        this.object.x = ((this.chunkIndex % 2) * 384) + this.info.Pos.X * 24
        this.object.y = ((this.chunkIndex / 2) * 384) + this.info.Pos.Y * 24
    }
}

export default BaseBuilding

