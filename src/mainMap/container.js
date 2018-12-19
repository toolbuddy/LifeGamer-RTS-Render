import * as PIXI from 'pixi.js'
import config from '../config'

const wrapper = document.querySelector('section#mainMap')

// canvas origin width, height setting
const height = window.innerHeight,
      width = height * (config.chunkCoorX / config.chunkCoorY)


// setting default width and height
window.mainMapWidth = width
window.mainMapHeight = height

// variable setting
var app = null
var mainContainer = null

// resize handler setting
const resizeHandler = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight)
    mainContainer.scale.set(window.innerHeight / height)
}

// set canvas as auto resize render
app = new PIXI.Application(width, height, {
    backgroundColor: 0xffffff,
    autoResize: true,
    resolution: devicePixelRatio
})

mainContainer = new PIXI.Container()

app.stage.addChild(mainContainer)
app.container = mainContainer

// add event listener to resize renderer
window.addEventListener('resize', resizeHandler, false)
resizeHandler()

export default app

