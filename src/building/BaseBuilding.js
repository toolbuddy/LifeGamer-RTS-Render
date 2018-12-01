import * as PIXI from 'pixi.js'

/* tooltip style setting */
var tooltipStyle = {
    fill: "white",
    fontFamily: "\"Courier New\", Courier, monospace",
    fontSize: 20,
    align: 'center'
}


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
    async objectInit () {
        this.object = new PIXI.Sprite.fromImage(this.imgUrl)
        this.object.x = ((this.chunkIndex % 2) * 384) + this.info.Pos.X * 24
        this.object.y = ((this.chunkIndex / 2) * 384) + this.info.Pos.Y * 24

        this.object._parent = this
        this.object.interactive = true

        this.tooltip = await this.tooltipCreate()

        // mouse over function setting
        this.object.mouseover = function(mouseData) {
            this._parent.isHover = true
            this.parent.addChild(this._parent.tooltip)
            this._parent.tooltip.x = mouseData.data.global.x + 20
            this._parent.tooltip.y = mouseData.data.global.y - 20
        }

        // mouse move function setting
        this.object.mousemove = function(mouseData) {
            if (this._parent.isHover) {
                this._parent.tooltip.x = mouseData.data.global.x + 20
                this._parent.tooltip.y = mouseData.data.global.y - 20
            }
        }

        // mouse out function setting
        this.object.mouseout = function(mouseData) {
            this._parent.isHover = false
            this.parent.removeChild(this._parent.tooltip)
        }
    }
    /**
     * Mouse hover tooltip object setting
     *
     * @function
     *
     * @returns {Promise<PIXI.Container>} a promise contains tooltip container
     * @resolve {PIXI.Container} tooltip container
     */
    tooltipCreate () {
        return new Promise(async resolve => {
            const textSprite = new PIXI.Text(await this.tooltipTextGen(), tooltipStyle)
            var textBackground = new PIXI.Graphics()
            textBackground.beginFill(0x000000)
            textBackground.drawRoundedRect(0, 0, textSprite.width + 40, textSprite.height + 20, 3)
            textBackground.endFill()

            textSprite.anchor.set(0.5)
            textSprite.x = textBackground.width / 2
            textSprite.y = textBackground.height / 2

            var tooltip = new PIXI.Container()
            tooltip.alpha = 0.7
            tooltip.addChild(textBackground, textSprite)

            resolve(tooltip)
        })
    }
    /**
     * The function generating tooltip message
     *
     * @function
     *
     * @returns {Promise<string>} a promise contains tooltip message
     * @resolve {string} tooltip message
     */
    tooltipTextGen () {
        return new Promise(resolve => {
            let textstring = ''
            textstring += `Name: ${this.info.Name}\n`
            textstring += `Status: ${this.info.Status}\n`
            textstring += `Human: ${this.info.Human}\n`
            textstring += `Money: ${this.info.Money}\n`
            textstring += `Power: ${this.info.Power}\n`
            textstring += `Level: ${this.info.Level}`

            resolve(textstring)
        })
    }
}

export default BaseBuilding

