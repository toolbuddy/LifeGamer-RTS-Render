import * as Building from '../../mainMap/building'
import BuildingType from './BuildingType'

/**
 * The function creating all building objects by given data inside the chunk and return chunk building data list
 *
 * @function
 *
 * @param {PIXI.Container} container - the chunk pixi container
 * @param {number} chunkIndex - the index of chunk, from 0 to 3
 * @param {Object} chunkData - the chunk map data getting from backend server
 * @param {WebsocketConnection} conn - the websocket connection
 * @returns {Promise<Object>} a promise contains chunk building list
 * @resolve {Object} chunk building list
 */
export default function ChunkBuildingsUpdate(container, chunkIndex, chunkData, conn) {
    return new Promise(async resolve => {
        await ClearContainer(container)                                     // clear all objects inside container
        let chunkBuildings = await ListInit(chunkIndex, chunkData, conn)    // create chunk building data list
        await ObjectInit(container, chunkBuildings)                         // insert object into container
        resolve(chunkBuildings)
    })
}

/**
 * Creating the chunk building data list
 *
 * @function
 *
 * @param {number} chunkIndex - the index of chunk, from 0 to 3
 * @param {Object} chunkData - the chunk map data getting from backend server
 * @param {WebsocketConnection} conn - the websocket connection
 * @returns {Promise<Object>} a promise contains chunk building data list
 * @resolve {Object} chunk building data list
 */

function ListInit(chunkIndex, chunkData, conn) {
    var chunkBuildings = {'buildings': []}
    return new Promise(resolve => {
        for (let building of chunkData) {
            switch (building.ID) {
                case BuildingType['ThermalPowerPlant']:
                    chunkBuildings.buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                    chunkBuildings[`(${building.Pos.X},${building.Pos.Y})`] = new Building.ThermalPowerPlant(building, chunkIndex, conn)
                    break
                case BuildingType['WaterPowerPlant']:
                    break
                case BuildingType['WindPowerPlant']:
                    chunkBuildings.buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                    chunkBuildings[`(${building.Pos.X},${building.Pos.Y})`] = new Building.WindPowerPlant(building, chunkIndex, conn)
                    break
                case BuildingType['TidalPowerPlant']:
                    break
                case BuildingType['SolarPowerPlant']:
                    chunkBuildings.buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                    chunkBuildings[`(${building.Pos.X},${building.Pos.Y})`] = new Building.SolarPowerPlant(building, chunkIndex, conn)
                    break
                case BuildingType['GeoThermalPowerPlant']:
                    chunkBuildings.buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                    chunkBuildings[`(${building.Pos.X},${building.Pos.Y})`] = new Building.GeoThermalPowerPlant(building, chunkIndex, conn)
                    break
                case BuildingType['BitCoinMiner']:
                    chunkBuildings.buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                    chunkBuildings[`(${building.Pos.X},${building.Pos.Y})`] = new Building.BitCoinMiner(building, chunkIndex, conn)
                    break
                case BuildingType['Sawmill']:
                    break
                case BuildingType['FishFarm']:
                    chunkBuildings.buildings.push(`(${building.Pos.X},${building.Pos.Y})`)
                    chunkBuildings[`(${building.Pos.X},${building.Pos.Y})`] = new Building.FishFarm(building, chunkIndex, conn)
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
        for (let building of chunkBuildings.buildings) {
            container.addChild(chunkBuildings[building].object)
        }
        resolve()
    })
}
