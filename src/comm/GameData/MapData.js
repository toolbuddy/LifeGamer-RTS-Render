/**
 * MapData: using for saving mapdata getting from backend server
 *
 * @class
 */
class MapData {
    /**
     * @constructor
     */
    constructor () {
        this.mapData = []
    }
    /**
     * updating mapdata and sorting them according to their chunk position
     * mapData is a 9-elements array contains 9 chunks' data
     *
     * @param {Object} MapData - mapdata of the game, using for rendering on mainMap
     */
    updateMapData (MapData) {
        this.mapData = MapData.sort((a, b) => {
            return a.Chunk.Pos.Y - b.Chunk.Pos.Y || a.Chunk.Pos.X - b.Chunk.Pos.X
        })
    }
    /**
     * getting mapdata
     *
     * @function
     *
     * @returns {Object} MapData - mapdata of the game
     */
    getMapData () {
        return this.mapData
    }
}

export default MapData

