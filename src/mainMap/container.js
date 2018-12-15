import * as PIXI from 'pixi.js'

const wrapper = document.querySelector('section#mainMap')

// canvas origin width, height setting (get 110% width and height)
const width = 1683
const height = 864

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

