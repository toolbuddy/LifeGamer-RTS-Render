import index from './index.css'
import WebsocketConnection from './comm/Connection'
import MainMap from './mainMap/container'
import MainMapInit from './mainMap/ContainerInit'
import GameData from './GameData'
import MiniMap from './miniMap'

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

var keys = Object.keys(images)
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
})

loader.onComplete.add(() => {
    var token = prompt('please input your private token')
    var connect = new WebsocketConnection('wss://pd2a.imslab.org/gamews', token)
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
    window.miniMap = MainMap
    window.miniMap._data = new GameData.MiniMapData()
    window.conn = conn                                      // binding websocketConnection object to window
    conn.init()
}
