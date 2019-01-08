import index from './index.css'
import WebsocketConnection from './comm/Connection'
import MainMap from './mainMap/container'
import MainMapInit from './mainMap/ContainerInit'
import GameData from './GameData'
import MiniMap from './miniMap'

import * as API from './API'
import * as PIXI from 'pixi.js'

import miniMapBackground from './source/img/map.png'

const room = document.querySelector('section#room')
const statusBar = document.querySelector('section#statusBar')
const miniMap = document.querySelector('section#miniMapWrapper')
const menu = document.querySelector('section#menu')

// function that reading cookie, getting user access token
function getCookie (name) {
    function escape (s) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1') }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'))
    return match ? match[1] : null
}


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
loader.add('miniMapBackground', miniMapBackground)

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
        SolarPowerPlant: resources.SolarPowerPlant.texture,
        Sawmill: resources.Sawmill.texture,
        Pasture: resources.Pasture.texture,
        MilitaryCamp: resources.MilitaryCamp.texture,
        Residence: resources.Residence.texture,
        Hotspring: resources.Hotspring.texture,
        ICFab: resources.ICFab.texture
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
    textures.miniMapBackground = resources.miniMapBackground.texture
})

loader.onComplete.add(() => {
    var token = getCookie('token')
    // var token = prompt('please input your private token')
    if (token && token !== '') {
        var connect = new WebsocketConnection('wss://pd2a.imslab.org/gamews', token)
        Init(connect, MainMap.container, textures)
    } else {
        window.location.href = 'https://pd2a.imslab.org/game/login'
    }
})

// render part

document.querySelector('section#mainMap').appendChild(MainMap.view)

function elementsToggle() {
    if (room.style.display === '' || room.style.display === 'block') {
        room.style.display = 'none'
        statusBar.style.display = 'none'
        miniMap.style.display = 'none'
        menu.style.display = 'none'
    } else {
        room.style.display = 'block'
        statusBar.style.display = 'block'
        miniMap.style.display = 'block'
        menu.style.display = 'block'
    }
}



async function Init(conn, mainMapContainer, textures) {
    window.textures = textures                              // binding textures to window
    window.playerData = new GameData.PlayerData()           // binding PlayerData object to window
    window.mainMap = mainMapContainer                       // binding mainMap PIXI Container to window
    await MainMapInit(mainMapContainer)                     // mainMap container init
    window.mainMap._data = new GameData.MainMapData()       // setting PIXI mainMap object data
    window.miniMap = MiniMap
    window.miniMap._data = new GameData.MiniMapData()
    window.conn = conn                                      // binding websocketConnection object to window
    window.elementsToggle = elementsToggle
    conn.init()
}
