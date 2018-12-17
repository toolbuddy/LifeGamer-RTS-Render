import BaseBuilding from './BaseBuilding'

class SolarPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.SolarPowerPlant
        this.objectInit()
    }
}

export default SolarPowerPlant

