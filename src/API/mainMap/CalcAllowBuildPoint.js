import structures from './Structure'
import config from '../../config'

const Coast = 64,
      Bank = 128,
      spaceNum = config.spaceCoor * config.spaceCoor

/**
 * Calculate the point the param building can build
 *
 * @function
 *
 * @param {string} userName - the user who wonna build
 * @param {Object} MapData - mainMap data getting from backend, 4*2-elements array type
 * @param {string} building - building name
 * @returns {Promise<Object>} a promise contains 4-elements array contains chunk allow points
 * @resolve {Object} array contains 8*spaceNum elements from left-top to right-down, 0 means cannot, 1 means allow
 */
export default function CalcAllowBuildPoint(userName, MapData, building) {
    var AllowPoint = []
    return new Promise(resolve => {
        for (let chunk of MapData) {
            var ChunkAllowPoint = new Array(spaceNum).fill(0)
            // check own this chunk or not
            if (userName === chunk.Owner) {
                for (let y = 0; y <= config.spaceCoor - structures[building].Size; ++y) {
                    for (let x = 0; x <= config.spaceCoor - structures[building].Size; ++x) {
                        // check terrain
                        let TerrainAllow = true
                        for (let n = 0; n < structures[building].Size * structures[building].Size; ++n) {
                            let blockY = Math.floor(y / config.chunkCoorX),
                                blockX = x % config.chunkCoorX
                            // if cur env not exists in allow terrain, means it cannot build, otherwise, continue
                            let terrain = chunk.Blocks[blockY][blockX].Terrain - ((chunk.Blocks[blockY][blockX].Terrain & Coast) + (chunk.Blocks[blockY][blockX].Terrain & Bank))
                            if (structures[building].Terrain.indexOf(terrain) === -1) {
                                // check coast and bank env type
                                let AllowCoast = structures[building].Terrain.indexOf(Coast) === -1,
                                    AllowBank = structures[building].Terrain.indexOf(Bank) === -1
                                if (!(chunk.Blocks[blockY][blockX].Terrain & Coast == Coast && AllowCoast)) {   // check coast
                                    if (!(chunk.Blocks[blockY][blockX].Terrain & Bank == Bank && AllowBank)) {  // check bank
                                        TerrainAllow = false
                                        break
                                    }
                                }
                            }
                        }
                        if (TerrainAllow) ChunkAllowPoint[y*config.spaceCoor+x] = 1
                    }
                }
                // Remove the point that building already existed
                for (let ExistBuilding of chunk.Structures) {
                    for (let y = ExistBuilding.Pos.Y - structures[building].Size + 1; y <= ExistBuilding.Pos.Y + structures[building].Size - 1; ++y) {
                        for (let x = ExistBuilding.Pos.X - structures[building].Size + 1; x <= ExistBuilding.Pos.X + structures[building].Size - 1; ++x) {
                            ChunkAllowPoint[y*config.spaceCoor+x] = 0
                        }
                    }
                }
            }
            AllowPoint.push(ChunkAllowPoint)
        }
        resolve(AllowPoint)
    })
}
