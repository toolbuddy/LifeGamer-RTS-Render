import * as PIXI from 'pixi.js'

// setting wrapper
const wrapper = document.querySelector('section#mainMap')

// canvas origin width, height setting
const width = 950
const height = 950

// variable setting
var app = null
var mainContainer = null

// resize handler setting
const resizeHandler = () => {
    const scaleFactor = Math.min(wrapper.offsetWidth / width, wrapper.offsetHeight / height)
    const newWidth = Math.ceil(width * scaleFactor)
    const newHeight = Math.ceil(height * scaleFactor)

    app.renderer.resize(newWidth, newHeight)
    mainContainer.scale.set(scaleFactor)
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

