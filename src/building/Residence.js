import BaseBuilding from './BaseBuilding'

class Residence extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.Residence
        this.objectInit()
    }
}

export default Residence

