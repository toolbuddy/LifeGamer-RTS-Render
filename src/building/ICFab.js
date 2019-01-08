import BaseBuilding from './BaseBuilding'

class ICFab extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.ICFab
        this.objectInit()
    }
}

export default ICFab

