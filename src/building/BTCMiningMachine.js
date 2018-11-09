import { BaseBuilding } from './BaseBuilding'

/**
 * BTC mining machine class, one building of earning money building type
 *
 * @class
 */
class BTCMiningMachine extends BaseBuilding {
    /**
     * @constructor
     *
     * @param {Object} chunk - the chunk this build located at, an array contains two value, x(col) and y(row)
     * @param {Object} position - the position this build located at in chunk, an array contains two value, x(col) and y(row)
     * @param {string} imgUrl - the image url
     */
    constructor (chunk, position, imgUrl) {
        super(chunk, position)
            this.imgUrl = imgUrl
            this.levelUpEnable = true
            // object init
            this.objectInit()
    }
}

module.exports = { BTCMiningMachine }

