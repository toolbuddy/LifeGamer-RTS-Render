import BaseBuilding from './BaseBuilding'

class Sawmill extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.Sawmill
        this.objectInit()
    }
}

export default Sawmill

