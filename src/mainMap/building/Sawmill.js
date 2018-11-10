import BaseBuilding from './BaseBuilding'

/**
 * Sawmill class, one building of earning money building type
 *
 * @class
 */
class Sawmill extends BaseBuilding {
    /**
     * @constructor
     *
     * @param {Object} chunk - the chunk this build located at, an array contains two value, x(col) and y(row)
     * @param {Object} position - the position this build located at in chunk, an array contains two value, x(col) and y(row)
     * @param {Object} size - the size of the building, an array contains two value, x and y
     * @param {string} imgUrl - the image url
     */
    constructor (chunk, position, size, imgUrl) {
        super(chunk, position)
        this.size = size
        this.imgUrl = imgUrl
        this.levelUpEnable = true
        // object init
        this.objectInit()
    }
}

export default Sawmill

