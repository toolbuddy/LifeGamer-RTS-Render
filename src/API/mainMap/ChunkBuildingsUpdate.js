import * as Building from '../../building'
import structures from './Structure'

/**
 * The function creating all building objects by given data inside the chunk and return chunk building data list
 *
 * @function
 *
 * @param {PIXI.Container} container - the chunk pixi container
 * @param {Object} MapData - the map data getting from backend server
 * @returns {Promise<Object>} a promise contains chunk building list
 * @resolve {Object} chunk building list
 */
export default function ChunkBuildingsUpdate(container, MapData) {
    return new Promise(async resolve => {
        await ClearContainer(container)                                     // clear all objects inside container
        let chunkBuildings = await ListInit(MapData)                        // create chunk building data list
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

function ListInit(MapData, sprites) {
    var Buildings = []
    return new Promise(resolve => {
        for (let chunkIndex = 0; chunkIndex < MapData.length; ++chunkIndex) {
            let chunk = []
            for (let building of MapData[chunkIndex].Structures) {
                switch (building.ID) {
                    case structures['ThermalPowerPlant'].ID:
                        chunk.push(new Building.ThermalPowerPlant(building, chunkIndex))
                        break
                    case structures['WaterPowerPlant'].ID:
                        break
                    case structures['WindPowerPlant'].ID:
                        chunk.push(new Building.WindPowerPlant(building, chunkIndex))
                        break
                    case structures['TidalPowerPlant'].ID:
                        break
                    case structures['SolarPowerPlant'].ID:
                        chunk.push(new Building.SolarPowerPlant(building, chunkIndex))
                        break
                    case structures['GeoThermalPowerPlant'].ID:
                        chunk.push(new Building.GeoThermalPowerPlant(building, chunkIndex))
                        break
                    case structures['BitCoinMiner'].ID:
                        chunk.push(new Building.BitCoinMiner(building, chunkIndex))
                        break
                    case structures['Sawmill'].ID:
                        chunk.push(new Building.Sawmill(building, chunkIndex))
                        break
                    case structures['FishFarm'].ID:
                        chunk.push(new Building.FishFarm(building, chunkIndex))
                        break
                    case structures['ICFab'].ID:
                        chunk.push(new Building.ICFab(building, chunkIndex))
                        break
                    case structures['Pasture'].ID:
                        chunk.push(new Building.Pasture(building, chunkIndex))
                        break
                    case structures['Hotspring'].ID:
                        chunk.push(new Building.Hotspring(building, chunkIndex))
                        break
                    case structures['Residence'].ID:
                        chunk.push(new Building.Residence(building, chunkIndex))
                        break
                    case structures['LargeResidence'].ID:
                        chunk.push(new Building.Residence(building, chunkIndex))
                        break
                    case structures['MilitaryCamp'].ID:
                        chunk.push(new Building.MilitaryCamp(building, chunkIndex))
                        break
                    case structures['LargeMilitaryCamp'].ID:
                        chunk.push(new Building.MilitaryCamp(building, chunkIndex))
                        break
                    case structures['Observatory'].ID:
                        break
                }
            }
            Buildings.push(chunk)
        }
        resolve(Buildings)
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
 * @param {Object} Buildings - chunk building data list
 */

function ObjectInit(container, Buildings) {
    return new Promise(resolve => {
        for (let chunkIndex = 0; chunkIndex < Buildings.length; ++chunkIndex) {
            for (let building of Buildings[chunkIndex]) {
                container.addChild(building.object)
            }
        }
        resolve()
    })
}
