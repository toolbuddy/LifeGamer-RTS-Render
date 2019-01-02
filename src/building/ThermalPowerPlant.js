import BaseBuilding from './BaseBuilding'

class ThermalPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.ThermalPowerPlant
        this.objectInit()
    }
}

export default ThermalPowerPlant

