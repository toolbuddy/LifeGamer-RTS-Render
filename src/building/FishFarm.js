import BaseBuilding from './BaseBuilding'

class FishFarm extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.FishFarm
        this.objectInit()
    }
}

export default FishFarm

