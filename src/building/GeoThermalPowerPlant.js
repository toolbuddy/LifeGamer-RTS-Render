import BaseBuilding from './BaseBuilding'

class GeoThermalPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.GeoThermalPowerPlant
        this.objectInit()
    }
}

export default GeoThermalPowerPlant

