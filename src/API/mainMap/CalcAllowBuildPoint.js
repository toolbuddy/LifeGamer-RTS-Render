import structures from './Structure'

/**
 * Calculate the point the param building can build
 *
 * @function
 *
 * @param {Object} MapData - mainMap data getting from backend, 4-elements array type
 * @param {string} building - building name
 * @returns {Promise<Object>} a promise contains 4-elements array contains chunk allow points
 * @resolve {Object} 4-elements array contains allow points
 */
export default function CalcAllowBuildPoint(MapData, building) {
    var AllowPoint = []
    return new Promise(resolve => {
        for (let chunk of MapData) {
            // Init chunk allow point with terrain allowed
            var ChunkAllowPoint = []
            for (let y = 0; y <= 16 - structures[building].Size; ++y) {
                for (let x = 0; x <= 16 - structures[building].Size; ++x) {
                    // check terrain
                    let TerrainAllow = true
                    for (let n = 0; n < structures[building].Size * structures[building].Size; ++n) {
                        // if cur env not exists in allow terrain, means it cannot build, otherwise, continue
                        if (structures[building].Terrain.indexOf(chunk.Blocks[Math.floor(y/4)][x%4].Terrain) === -1) {
                            TerrainAllow = false
                            break
                        }
                    }
                    if (TerrainAllow) ChunkAllowPoint.push(`${x},${y}`)
                }
            }
            // Remove the point that building already existed
            for (let ExistBuilding of chunk.Structures) {
                for (let y = ExistBuilding.Pos.Y - structures[building].Size + 1; y <= ExistBuilding.Pos.Y; ++y) {
                    for (let x = ExistBuilding.Pos.X - structures[building].Size + 1; x <= ExistBuilding.Pos.X; ++x) {
                        var index = ChunkAllowPoint.indexOf(`${x},${y}`)
                        if (index !== -1) ChunkAllowPoint.splice(index, 1)
                    }
                }
            }
            AllowPoint.push(ChunkAllowPoint)
        }
        resolve(AllowPoint)
    })
}
