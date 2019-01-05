import BaseBuilding from './BaseBuilding'

class MilitaryCamp extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.MilitaryCamp
        this.objectInit()
    }
}

export default MilitaryCamp

