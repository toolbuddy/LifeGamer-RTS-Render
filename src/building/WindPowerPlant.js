import BaseBuilding from './BaseBuilding'

class WindPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.WindPowerPlant
        this.objectInit()
    }
}

export default WindPowerPlant

