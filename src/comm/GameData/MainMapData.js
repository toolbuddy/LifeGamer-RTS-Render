/**
 * MainMapData: using for saving mapdata getting from backend server
 *
 * @class
 */
class MainMapData {
    /**
     * @constructor
     */
    constructor () {
        this.data = []
    }
    /**
     * updating mapdata and sorting them according to their chunk position
     *
     * @param {Object} MapData - mapdata of the game, using for rendering on mainMap
     */
    updateData (MapData) {
        return new Promise(resolve => {
            this.data = MapData.sort((a, b) => {
                return a.Pos.Y - b.Pos.Y || a.Pos.X - b.Pos.X
            })
            resolve()
        })
    }
    /**
     * getting mapdata
     *
     * @function
     *
     * @returns {Object} MapData - mapdata of the game
     */
    getData () {
        return this.data
    }
}

export default MainMapData

