import * as Building from '../../mainMap/building'
import BuildingType from './BuildingType'

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
export default function ChunkBuildingsUpdate(container, MapData, conn) {
    return new Promise(async resolve => {
        await ClearContainer(container)                                     // clear all objects inside container
        let chunkBuildings = await ListInit(MapData, conn)                  // create chunk building data list
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

function ListInit(MapData, conn) {
    var chunkBuildings = []
    for (let i = 0; i < MapData.length; ++i) chunkBuildings.push({ 'buildings': [] })
    return new Promise(resolve => {
        for (let i = 0; i < MapData.length; ++i) {
            for (let building of MapData[i].Structures) {
                switch (building.ID) {
                    case BuildingType['ThermalPowerPlant']:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.ThermalPowerPlant(building, i, conn)
                        break
                    case BuildingType['WaterPowerPlant']:
                        break
                    case BuildingType['WindPowerPlant']:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.WindPowerPlant(building, i, conn)
                        break
                    case BuildingType['TidalPowerPlant']:
                        break
                    case BuildingType['SolarPowerPlant']:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.SolarPowerPlant(building, i, conn)
                        break
                    case BuildingType['GeoThermalPowerPlant']:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.GeoThermalPowerPlant(building, i, conn)
                        break
                    case BuildingType['BitCoinMiner']:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.BitCoinMiner(building, i, conn)
                        break
                    case BuildingType['Sawmill']:
                        break
                    case BuildingType['FishFarm']:
                        chunkBuildings[i].buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                        chunkBuildings[i][`(${building.Pos.X},${building.Pos.Y})`] = new Building.FishFarm(building, i, conn)
                        break
                    case BuildingType['ICFab']:
                        break
                    case BuildingType['Pasture']:
                        break
                    case BuildingType['Hotspring']:
                        break
                    case BuildingType['SmallMilitaryCamp']:
                        break
                    case BuildingType['MediumMilitaryCamp']:
                        break
                    case BuildingType['LargeMilitaryCamp']:
                        break
                    case BuildingType['Observatory']:
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
