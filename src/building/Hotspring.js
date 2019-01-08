import BaseBuilding from './BaseBuilding'

class Hotspring extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.Hotspring
        this.objectInit()
    }
}

export default Hotspring

