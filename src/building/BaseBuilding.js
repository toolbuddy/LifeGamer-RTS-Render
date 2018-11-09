import * as PIXI from 'pixi.js'

/**
 * The base class let other class inherit
 *
 * @class
 */
class BaseBuilding {
    /**
     * @constructor
     */
    constructor (chunk, position, imgUrl = null) {
        this.chunk = chunk
        this.imgUrl = imgUrl
        this.position = position
        this.level = 1
        this.levelUpEnable = false
    }
    /**
     * Init the object as PIXI.Sprite object
     *
     * @function
     */
    objectInit () {
        this.object = PIXI.Sprite.fromImage(this.imgUrl)
        this.object.x = this.position[0]
        this.object.y = this.position[1]
    }
}

module.exports = { BaseBuilding }

