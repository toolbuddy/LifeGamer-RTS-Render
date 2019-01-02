import BaseBuilding from './BaseBuilding'

class Pasture extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.Pasture
        this.objectInit()
    }
}

export default Pasture

