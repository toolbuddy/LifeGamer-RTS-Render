import * as Building from '../../mainMap/building'
import structures from './Structure'

/**
 * The function creating all building objects by given data inside the chunk and return chunk building data list
 *
 * @function
 *
 * @param {PIXI.Container} container - the chunk pixi container
 * @param {Object} MapData - the map data getting from backend server
 * @param {WebsocketConnection} conn - the websocket connection
 * @returns {Promise<Object>} a promise contains chunk building list
 * @resolve {Object} chunk building list
 */
export default function ChunkBuildingsUpdate(container, MapData, conn, sprites) {
    return new Promise(async resolve => {
        await ClearContainer(container)                                     // clear all objects inside container
        let chunkBuildings = await ListInit(MapData, conn, sprites)         // create chunk building data list
        await ObjectInit(container, chunkBuildings)                         // insert object into container
        container.zIndex = 10                                               // setting buildings layer zindex
        resolve(chunkBuildings)
    })
}

/**
 * Creating the chunk building data list
 *
 * @function
 *
 * @param {Object} MapData - the map data getting from backend server
 * @param {WebsocketConnection} conn - the websocket connection
 * @returns {Promise<Object>} a promise contains chunk building data list
 * @resolve {Object} chunk building data list
 */

function ListInit(MapData, conn, sprites) {
    var chunkBuildings = []
    for (let i = 0; i < MapData.length; ++i) chunkBuildings.push({ 'buildings': [] })
    return new Promise(resolve => {
        for (let i = 0; i < MapData.length; ++i) {
            for (let building of MapData[i].Structures) {
                switch (building.ID) {
                    case structures['ThermalPowerPlant'].ID:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.ThermalPowerPlant(building, i, conn, sprites.ThermalPowerPlant, sprites.buttons)
                        break
                    case structures['WaterPowerPlant'].ID:
                        break
                    case structures['WindPowerPlant'].ID:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.WindPowerPlant(building, i, conn, sprites.WindPowerPlant, sprites.buttons)
                        break
                    case structures['TidalPowerPlant'].ID:
                        break
                    case structures['SolarPowerPlant'].ID:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.SolarPowerPlant(building, i, conn, sprites.SolarPowerPlant, sprites.buttons)
                        break
                    case structures['GeoThermalPowerPlant'].ID:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.GeoThermalPowerPlant(building, i, conn, sprites.GeoThermalPowerPlant, sprites.buttons)
                        break
                    case structures['BitCoinMiner'].ID:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.BitCoinMiner(building, i, conn, sprites.BitCoinMiner, sprites.buttons)
                        break
                    case structures['Sawmill'].ID:
                        break
                    case structures['FishFarm'].ID:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.FishFarm(building, i, conn, sprites.FishFarm, sprites.buttons)
                        break
                    case structures['ICFab'].ID:
                        break
                    case structures['Pasture'].ID:
                        break
                    case structures['Hotspring'].ID:
                        break
                    case structures['SmallMilitaryCamp'].ID:
                        break
                    case structures['MediumMilitaryCamp'].ID:
                        break
                    case structures['LargeMilitaryCamp'].ID:
                        break
                    case structures['Observatory'].ID:
                        break
                    }
            }
        }
        resolve(chunkBuildings)
    })
}

/**
 * The function clear all objects inside container
 *
 * @function
 *
 * @param {PIXI.Container} container - the pixi container
 */
function ClearContainer(container) {
    return new Promise(resolve => {
        for (var i = container.children.length - 1; i >= 0; i--) { container.removeChild(container.children[i]) }
        resolve()
    })
}


/**
 * Insert all pixi sprite object into pixi container
 *
 * @function
 *
 * @param {PIXI.Container} container - the chunk pixi container
 * @param {Object} chunkBuildings - chunk building data list
 */

function ObjectInit(container, chunkBuildings) {
    return new Promise(resolve => {
        for (let i = 0; i < chunkBuildings.length; ++i) {
            for (let building of chunkBuildings[i].buildings) {
                container.addChild(chunkBuildings[i][building].object)
            }
        }
        resolve()
    })
}
