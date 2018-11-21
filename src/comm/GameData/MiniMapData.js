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
        this.data = []
    }
    updateData (MapData) {
        this.data = MapData
    }
    getData () {
        return this.data
    }
}

export default MiniMapData

