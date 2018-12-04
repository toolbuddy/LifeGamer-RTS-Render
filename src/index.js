import index from './index.css'
import WebsocketConnection from './comm/Connection'
import MainMap from './mainMap/container'
import MainMapInit from './mainMap/ContainerInit'

import * as API from './API'
import * as PIXI from 'pixi.js'

// image import
import cancelIcon from './mainMap/building/static/buttonIcon/cancel.svg'
import restartIcon from './mainMap/building/static/buttonIcon/restart.svg'
import repairIcon from './mainMap/building/static/buttonIcon/repair.svg'
import destructIcon from './mainMap/building/static/buttonIcon/destruct.svg'
import upgradeIcon from './mainMap/building/static/buttonIcon/upgrade.svg'

import BitCoinMinerImg from './mainMap/building/static/BitCoinMiner.png'
import FishFarmImg from './mainMap/building/static/FishFarm.png'
import GeoThermalPowerPlantImg from './mainMap/building/static/GeoThermalPowerPlant.png'
import SolarPowerPlantImg from './mainMap/building/static/SolarPowerPlant.png'
import ThermalPowerPlantImg from './mainMap/building/static/ThermalPowerPlant.png'
import WindPowerPlantImg from './mainMap/building/static/WindPowerPlant.png'

// loader setting, make sure all image loaded
var sprites = {}
var loader = new PIXI.loaders.Loader()
loader.add('cancelIcon', cancelIcon).add('restartIcon', restartIcon).add('repairIcon', repairIcon)
        .add('destructIcon', destructIcon).add('upgradeIcon', upgradeIcon).add('BitCoinMinerImg', BitCoinMinerImg)
        .add('FishFarmImg', FishFarmImg).add('GeoThermalPowerPlantImg', GeoThermalPowerPlantImg)
        .add('ThermalPowerPlantImg', ThermalPowerPlantImg).add('WindPowerPlantImg', WindPowerPlantImg)
        .add('SolarPowerPlantImg', SolarPowerPlantImg)

loader.load((loader, resources) => {
    sprites.buttons = {
        cancelIcon: new PIXI.Sprite(resources.cancelIcon.texture),
        restartIcon: new PIXI.Sprite(resources.restartIcon.texture),
        destructIcon: new PIXI.Sprite(resources.destructIcon.texture),
        upgradeIcon: new PIXI.Sprite(resources.upgradeIcon.texture),
        repairIcon: new PIXI.Sprite(resources.repairIcon.texture)
    }
    sprites.BitCoinMiner = new PIXI.Sprite(resources.BitCoinMinerImg.texture)
    sprites.FishFarm = new PIXI.Sprite(resources.FishFarmImg.texture)
    sprites.GeoThermalPowerPlant = new PIXI.Sprite(resources.GeoThermalPowerPlantImg.texture)
    sprites.ThermalPowerPlant = new PIXI.Sprite(resources.ThermalPowerPlantImg.texture)
    sprites.WindPowerPlant = new PIXI.Sprite(resources.WindPowerPlantImg.texture)
    sprites.SolarPowerPlant = new PIXI.Sprite(resources.SolarPowerPlantImg.texture)
})

loader.onComplete.add(() => {
    Init(connect, MainMap.container, sprites)
})

// container width auto setting

window.onresize = resize

function resize() {
    document.querySelector('.container').style.width = `${Math.ceil(document.querySelector('#mainMap').offsetWidth + document.querySelector('.aside').offsetWidth) }px`
}

resize();

// render part

document.querySelector('section#mainMap').appendChild(MainMap.view)

// websocket connection
// var connect = new WebsocketConnection('host', 'port', 'token)


async function Init(conn, mainMapContainer, sprites) {
    connect.init()
    await MainMapInit(mainMapContainer)
    conn.setMainMap(mainMapContainer)
    conn.setSprites(sprites)
}

