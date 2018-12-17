import * as PIXI from 'pixi.js'

export default function ContainerInit(mainContainer) {
    return new Promise(resolve => {
        var buildings = new PIXI.Container(), environments = new PIXI.Container()
        mainContainer.addChild(buildings, environments)
        resolve()
    })
}
