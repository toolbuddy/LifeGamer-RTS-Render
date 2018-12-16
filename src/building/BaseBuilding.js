import config from '../config'
import * as PIXI from 'pixi.js'
import * as API from '../API'

const padding = 10

const buttonWidth = 170, buttonHeight = 40

/* tooltip style setting */
var tooltipStyle = {
    fill: "white",
    fontFamily: "\"Courier New\", Courier, monospace",
    fontSize: 20
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
        let chunkSize = Math.min(window.mainMapWidth, window.mainMapHeight) / Math.min(config.chunkCoorX, config.chunkCoorY),
            spaceSize = chunkSize / config.spaceCoor

        this.object = new PIXI.Sprite(this.buildingTexture)

        this.object.x = ((this.chunkIndex % config.chunkCoorX) * chunkSize) + this.info.Pos.X * spaceSize + (padding / 2)
        this.object.y = (Math.floor(this.chunkIndex / config.chunkCoorX) * chunkSize) + this.info.Pos.Y * spaceSize + (padding / 2)

        // scale
        this.object.scale.x = (this.info.Size.W * spaceSize - padding) / this.object.width
        this.object.scale.y = (this.info.Size.H * spaceSize - padding) / this.object.height

        this.object._parent = this
        this.object.interactive = true

        // setting building zindex
        this.object.zIndex = 10

        this.tooltip = await this.tooltipCreate()

        // setting tooltip zindex
        this.tooltip.zIndex = 99

        this.buttonList = await this.buttonListCreate()
        await this.modifyButtonPosition()

        // setting buttonList zindex
        this.buttonList.zIndex = 99

        // mouse over function setting
        this.object.mouseover = function(mouseData) {
            this._parent.isHover = true
            if (!this._parent.isClicked) {
                let scale = Math.min(window.mainMapWidth / window.innerWidth, window.mainMapHeight / window.innerHeight)
                this.parent.addChild(this._parent.tooltip)
                this._parent.tooltip.x = ((mouseData.data.global.x + this._parent.tooltip.width < window.innerWidth) ? mouseData.data.global.x : mouseData.data.global.x - this._parent.tooltip.width) * scale
                this._parent.tooltip.y = ((mouseData.data.global.y + this._parent.tooltip.height < window.innerHeight) ? mouseData.data.global.y : mouseData.data.global.y - this._parent.tooltip.height) * scale
            }
        }

        // mouse move function setting
        this.object.mousemove = function(mouseData) {
            if (this._parent.isHover && !this._parent.isClicked) {
                let scale = Math.min(window.mainMapWidth / window.innerWidth, window.mainMapHeight / window.innerHeight)
                this._parent.tooltip.x = ((mouseData.data.global.x + this._parent.tooltip.width < window.innerWidth) ? mouseData.data.global.x : mouseData.data.global.x - this._parent.tooltip.width) * scale
                this._parent.tooltip.y = ((mouseData.data.global.y + this._parent.tooltip.height < window.innerHeight) ? mouseData.data.global.y : mouseData.data.global.y - this._parent.tooltip.height) * scale
            }
        }

        // mouse out function setting
        this.object.mouseout = function(mouseData) {
            this._parent.isHover = false
            if (!this._parent.isClicked) {
                this.parent.removeChild(this._parent.tooltip)
            }
        }

        // mouse pointer down function setting
        this.object.on('pointerdown', function(mouseData) {
            this._parent.isClicked = true
            if (this._parent.isHover) {
                this.parent.removeChild(this._parent.tooltip)
            }
            let scale = Math.min(window.mainMapWidth / window.innerWidth, window.mainMapHeight / window.innerHeight)
            this.parent.addChild(this._parent.buttonList)
            this._parent.buttonList.x = ((mouseData.data.global.x + this._parent.buttonList.width < window.innerWidth) ? mouseData.data.global.x : mouseData.data.global.x - this._parent.buttonList.width) * scale
            this._parent.buttonList.y = ((mouseData.data.global.y + this._parent.buttonList.height < window.innerHeight) ? mouseData.data.global.y : mouseData.data.global.y - this._parent.buttonList.height) * scale
        })

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
            textBackground.drawRoundedRect(0, 0, textSprite.width + 45, textSprite.height + 20, 3)
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
            textstring += `Population: ${this.info.Population}\n`
            textstring += `Money: ${this.info.Money}\n`
            textstring += `Power: ${this.info.Power}\n`
            textstring += `Level: ${this.info.Level}`

            resolve(textstring)
        })
    }
    /**
     * The function creating button when building clicked
     *
     * @function
     *
     * @param {string} name - button name
     * @param {PIXI.Texture} icon - the PIXI.Texture contains image
     * @param {function} func - the function when the button clicked will call
     * @returns {Promise<PIXI.Container>} a promise contains button PIXI.Container
     * @resolve {PIXI.Container} button
     */
    buttonCreate (name, icon, func) {
        return new Promise(resolve => {
            // button text
            const buttonText = new PIXI.Text(name, tooltipStyle)

            // button background setting
            var buttonBackground = new PIXI.Graphics()
            buttonBackground.beginFill(0x000000)
            buttonBackground.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 0)
            buttonBackground.endFill()

            // button icon
            var buttonIcon = new PIXI.Sprite(icon)
            buttonIcon.scale.x = ( 18 / icon.width )                    // scale button width  to 18
            buttonIcon.scale.y = ( 18 / icon.height )                   // scale button height to 18
            buttonIcon.anchor.y = 0.5
            buttonIcon.y = buttonBackground.height / 2
            buttonIcon.x = 10

            // button text position setting
            buttonText.anchor.y = 0.5
            buttonText.x = 45
            buttonText.y = buttonBackground.height / 2

            var button = new PIXI.Container()
            button.addChild(buttonBackground, buttonIcon, buttonText)

            button.mouseover = function(mouseData) { button.alpha = 0.7 }
            button.mouseout = function(mouseData) { button.alpha = 1 }

            // setting button click function
            button.interactive = true
            button.buttonMode = true

            button.on('pointerdown', func)

            resolve(button)
        })
    }
    /**
     * The function creating buttonlist
     *
     * @function
     *
     * @returns {Promise<PIXI.Container>} a promise contains the buttonlist contains all buttons
     * @resolve {PIXI.Container} the buttonlist contains all buttons
     */
    buttonListCreate () {
        return new Promise(async resolve => {
            var buttonList = new PIXI.Container()
            var funcButton = null   // funcButton: repair, restart, upgrade, or null
            if (this.info.SStatus === 'Destroyed') {
                funcButton = await this.buttonCreate('Repair', window.textures.buttons.repairIcon, this.repair.bind(null, this))
            } else if (this.info.SStatus === 'Halted') {
                funcButton = await this.buttonCreate('Restart', window.textures.buttons.restartIcon, this.restart.bind(null, this))
            } else if (this.info.SStatus === 'Running' && this.info.Level < this.info.MaxLevel) {
                funcButton = await this.buttonCreate('Upgrade', window.textures.buttons.upgradeIcon, this.upgrade.bind(null, this))
            }
            var destructButton = null
            if (this.info.SStatus !== 'Building') {
                destructButton = await this.buttonCreate('Destruct', window.textures.buttons.destructIcon, this.destruct.bind(null, this))
            }
            var cancelButton = await this.buttonCreate('Cancel', window.textures.buttons.cancelIcon, this.cancel.bind(null, this))

            if (funcButton) buttonList.addChild(funcButton)
            if (destructButton) buttonList.addChild(destructButton)
            buttonList.addChild(cancelButton)

            resolve(buttonList)
        })
    }
    /**
     * The function modify all buttons' position in the buttonlist
     *
     * @function
     */
    modifyButtonPosition () {
        return new Promise(resolve => {
            for (let i = 1; i < this.buttonList.children.length; ++i) {
                this.buttonList.children[i].y += buttonHeight * i
            }
            resolve()
        })
    }
    /**
     * Repair function binding to repair button
     *
     * @function
     *
     * @param {Building} building - the building object
     */
    repair (building) {
        API.mainMap.BuildOperRequest(window.conn, 'Repair', building.info.ID, building.info.Chunk, building.info.Pos)
        building.object.parent.removeChild(building.buttonList)
        building.isClicked = false
    }
    /**
     * Repair function binding to repair button
     *
     * @function
     *
     * @param {Building} building - the building object
     */
    restart (building) {
        API.mainMap.BuildOperRequest(window.conn, 'Restart', building.info.ID, building.info.Chunk, building.info.Pos)
        building.object.parent.removeChild(building.buttonList)
        building.isClicked = false
    }
    /**
     * Upgrade function binding to upgrade button
     *
     * @function
     *
     * @param {Building} building - the building object
     */
    upgrade (building) {
        API.mainMap.BuildOperRequest(window.conn, 'Upgrade', building.info.ID, building.info.Chunk, building.info.Pos)
        building.object.parent.removeChild(building.buttonList)
        building.isClicked = false
    }
    /**
     * Destruct function binding to destruct button
     *
     * @function
     *
     * @param {Building} building - the building object
     */
    destruct (building) {
        API.mainMap.BuildOperRequest(window.conn, 'Destruct', building.info.ID, building.info.Chunk, building.info.Pos)
        building.object.parent.removeChild(building.buttonList)
        building.isClicked = false
    }
    /**
     * Cancel function binding to cancel button
     *
     * @function
     *
     * @param {Building} building - the building object
     */
    cancel (building) {
        building.object.parent.removeChild(building.buttonList)
        building.isClicked = false
    }
}

export default BaseBuilding

