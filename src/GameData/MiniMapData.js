/**
 * MiniMapData: using for saving minimap data getting from backend server
 *
 * @class
 */
class MiniMapData {
    /**
     * @constructor
     */
    constructor () {
        this.size = 0
        this.data = null
    }
    /**
     * the function updating data when getting data from backend server
     *
     * @async
     * @function
     *
     * @param {Object} Mapdata - the data getting from backend, contain size(number), Owner(2-d array), Terrain(2-d array)
     */
    async updateData (MapData) {
        this.size = MapData.Size.W
        this.data = await this.modifyData(MapData.Owner, MapData.Terrain)
    }
    /**
     * the function modify data getting from backend
     *
     * @param {Object} Owner
     * @param {Object} Terrain
     * @returns {Promise<Object>} a promise contains mapdata has been modified
     * @resolve {Object} mapdata that has been modified
     */
    modifyData (Owner, Terrain) {
        let map = []
        return new Promise((resolve, reject) => {
            for (let x = 0; x < Owner.length; x++) {
                for (let y = 0; y < Owner[x].length; y++) {
                    map.push({
                        'x': x - Math.ceil(this.size / 2),
                        'y': y - Math.ceil(this.size / 2),
                        'owner': Owner[x][y],
                        'terrain': (Terrain) ? Terrain[x][y] : null
                    })
                }
            }
            resolve(map)
        })
    }
    /**
     * the function getting data
     *
     * @returns {Object} data - the data contains size and mapdata
     */
    getData () {
        return {
            size: this.size,
            data: this.data
        }
    }
}

export default MiniMapData

