import * as PIXI from 'pixi.js'

export default function ContainerInit(mainContainer) {
    return new Promise(resolve => {
        for (let i = 0; i < 4; ++i) {
            var container = new PIXI.Container(), buildings = new PIXI.Container()
                , environments = new PIXI.Container()
            container.addChild(buildings, environments)
            mainContainer.addChild(container)
        }
        resolve()
    })
}
