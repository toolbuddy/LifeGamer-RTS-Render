import BaseBuilding from './BaseBuilding'

class GeoThermalPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex, conn) {
        super(info, chunkIndex, conn, building, buttons)
        this.objectInit() // create new object
    }
}

export default GeoThermalPowerPlant

