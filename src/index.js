import index from './index.css'
import WebsocketConnection from './comm/Connection'
import MainMap from './mainMap/container'
import MainMapInit from './mainMap/ContainerInit'
import GameData from './GameData'

import * as API from './API'
import * as PIXI from 'pixi.js'

// image import (using webpack require.context)
function importAll (r, object) {
    r.keys().forEach(key => {
        let name = key.replace(/\.\/|(\w+)\/|\.png|\.jpg|\.jpeg|\.svg/gi, '')
        object[name] = r(key)
    })
}

var images = {}

importAll(require.context('./source/img/mainMap', true, /^\.\/.*(png|jp(e*)g|svg|gif)$/), images)

// loader setting, make sure all image loaded
var textures = {}
var loader = new PIXI.loaders.Loader()
<<<<<<< HEAD
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
=======

var keys = Object.keys(images)
console.log(keys)
for (let key of keys) {
    loader.add(key, images[key])
}

loader.load((loader, resources) => {
    textures.buttons = {
        cancelIcon: resources.Cancel.texture,
        restartIcon: resources.Restart.texture,
        destructIcon: resources.Destruct.texture,
        upgradeIcon: resources.Upgrade.texture,
        repairIcon: resources.Repair.texture
    }
    textures.buildings = {
        BitCoinMiner: resources.BitCoinMiner.texture,
        FishFarm: resources.FishFarm.texture,
        GeoThermalPowerPlant: resources.GeoThermalPowerPlant.texture,
        ThermalPowerPlant: resources.ThermalPowerPlant.texture,
        WindPowerPlant: resources.WindPowerPlant.texture,
        SolarPowerPlant: resources.SolarPowerPlant.texture
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
>>>>>>> master
})

loader.onComplete.add(() => {
<<<<<<< HEAD
  Init(connect, MainMap.container, textures)
=======
    var token = prompt('please input your private token')
    var connect = new WebsocketConnection('ws://localhost:9999', token)
    Init(connect, MainMap.container, textures)
>>>>>>> master
})

// render part

document.querySelector('section#mainMap').appendChild(MainMap.view)

// websocket connection
<<<<<<< HEAD
// var connect = new WebsocketConnection(justlaxative.com, 'port', 'token')
=======
>>>>>>> master


async function Init(conn, mainMapContainer, textures) {
  window.textures = textures                              // binding textures to window
  window.playerData = new GameData.PlayerData()           // binding PlayerData object to window
  window.mainMap = mainMapContainer                       // binding mainMap PIXI Container to window
  await MainMapInit(mainMapContainer)                     // mainMap container init
  window.mainMap._data = new GameData.MainMapData()       // setting PIXI mainMap object data
  window.conn = conn                                      // binding websocketConnection object to window
  conn.init()
}
