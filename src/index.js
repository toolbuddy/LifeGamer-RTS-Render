import index from './index.css'
import WebsocketConnection from './comm/Connection'
import MainMap from './mainMap/container'
import MainMapInit from './mainMap/ContainerInit'
import GameData from './GameData'


import * as API from './API'
import * as PIXI from 'pixi.js'

// image import
import cancelIcon from './source/img/buttonIcon/cancel.svg'
import restartIcon from './source/img/buttonIcon/restart.svg'
import repairIcon from './source/img/buttonIcon/repair.svg'
import destructIcon from './source/img/buttonIcon/destruct.svg'
import upgradeIcon from './source/img/buttonIcon/upgrade.svg'

import BitCoinMinerImg from './source/img/building/BitCoinMiner.png'
import FishFarmImg from './source/img/building/FishFarm.png'
import GeoThermalPowerPlantImg from './source/img/building/GeoThermalPowerPlant.png'
import SolarPowerPlantImg from './source/img/building/SolarPowerPlant.png'
import ThermalPowerPlantImg from './source/img/building/ThermalPowerPlant.png'
import WindPowerPlantImg from './source/img/building/WindPowerPlant.png'

import Forest from './source/img/environment/forest.png'
import Grass from './source/img/environment/grass.png'
import Lava from './source/img/environment/lava.png'
import River from './source/img/environment/river.png'
import Desert from './source/img/environment/desert.png'
import Sea from './source/img/environment/sea.png'
import Snow from './source/img/environment/snow.png'
import Volcano from './source/img/environment/volcano.png'
import Void from './source/img/environment/void.png'

// loader setting, make sure all image loaded
var textures = {}
var loader = new PIXI.loaders.Loader()
loader.add('cancelIcon', cancelIcon).add('restartIcon', restartIcon).add('repairIcon', repairIcon)
        .add('destructIcon', destructIcon).add('upgradeIcon', upgradeIcon).add('BitCoinMinerImg', BitCoinMinerImg)
        .add('FishFarmImg', FishFarmImg).add('GeoThermalPowerPlantImg', GeoThermalPowerPlantImg)
        .add('ThermalPowerPlantImg', ThermalPowerPlantImg).add('WindPowerPlantImg', WindPowerPlantImg)
        .add('SolarPowerPlantImg', SolarPowerPlantImg)
        .add('Forest', Forest).add('Grass', Grass).add('Lava', Lava).add('River', River)
        .add('Desert', Desert).add('Sea', Sea).add('Snow', Snow).add('Volcano', Volcano).add('Void', Void)

loader.load((loader, resources) => {
    textures.buttons = {
        cancelIcon: resources.cancelIcon.texture,
        restartIcon: resources.restartIcon.texture,
        destructIcon: resources.destructIcon.texture,
        upgradeIcon: resources.upgradeIcon.texture,
        repairIcon: resources.repairIcon.texture
    }
    textures.buildings = {
        BitCoinMiner: resources.BitCoinMinerImg.texture,
        FishFarm: resources.FishFarmImg.texture,
        GeoThermalPowerPlant: resources.GeoThermalPowerPlantImg.texture,
        ThermalPowerPlant: resources.ThermalPowerPlantImg.texture,
        WindPowerPlant: resources.WindPowerPlantImg.texture,
        SolarPowerPlant: resources.SolarPowerPlantImg.texture
    }
    textures.environment = {
        Forest: resources.Forest.texture,
        Grass: resources.Grass.texture,
        Lava: resources.Lava.texture,
        River: resources.River.texture,
        Desert: resources.Desert.texture,
        Sea: resources.Sea.texture,
        Snow: resources.Snow.texture,
        Volcano: resources.Volcano.texture,
        Void: resources.Void.texture
    }
})

loader.onComplete.add(() => {
    Init(connect, MainMap.container, textures)
})

// render part

document.querySelector('section#mainMap').appendChild(MainMap.view)

// websocket connection
// var connect = new WebsocketConnection('ip', port , 'token')


async function Init(conn, mainMapContainer, textures) {
    window.textures = textures                              // binding textures to window
    window.playerData = new GameData.PlayerData()           // binding PlayerData object to window
    window.mainMap = mainMapContainer                       // binding mainMap PIXI Container to window
    await MainMapInit(mainMapContainer)                     // mainMap container init
    window.mainMap._data = new GameData.MainMapData()       // setting PIXI mainMap object data
    window.conn = conn                                      // binding websocketConnection object to window
    conn.init()
}
