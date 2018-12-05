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
var textures = {}
var loader = new PIXI.loaders.Loader()
loader.add('cancelIcon', cancelIcon).add('restartIcon', restartIcon).add('repairIcon', repairIcon)
        .add('destructIcon', destructIcon).add('upgradeIcon', upgradeIcon).add('BitCoinMinerImg', BitCoinMinerImg)
        .add('FishFarmImg', FishFarmImg).add('GeoThermalPowerPlantImg', GeoThermalPowerPlantImg)
        .add('ThermalPowerPlantImg', ThermalPowerPlantImg).add('WindPowerPlantImg', WindPowerPlantImg)
        .add('SolarPowerPlantImg', SolarPowerPlantImg)

loader.load((loader, resources) => {
    textures.buttons = {
        cancelIcon: resources.cancelIcon.texture,
        restartIcon: resources.restartIcon.texture,
        destructIcon: resources.destructIcon.texture,
        upgradeIcon: resources.upgradeIcon.texture,
        repairIcon: resources.repairIcon.texture
    }
    textures.BitCoinMiner = resources.BitCoinMinerImg.texture
    textures.FishFarm = resources.FishFarmImg.texture
    textures.GeoThermalPowerPlant = resources.GeoThermalPowerPlantImg.texture
    textures.ThermalPowerPlant = resources.ThermalPowerPlantImg.texture
    textures.WindPowerPlant = resources.WindPowerPlantImg.texture
    textures.SolarPowerPlant = resources.SolarPowerPlantImg.texture
})

loader.onComplete.add(() => {
    Init(connect, MainMap.container, textures)
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
// var connect = new WebsocketConnection('host', 'port', 'token')


async function Init(conn, mainMapContainer, textures) {
    conn.init()
    await MainMapInit(mainMapContainer)
    conn.setMainMap(mainMapContainer)
    conn.setTextures(textures)
    window.conn = conn                      // binding websocketConnection object to window
}
