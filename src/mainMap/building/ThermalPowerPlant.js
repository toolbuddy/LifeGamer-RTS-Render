import BaseBuilding from './BaseBuilding'

class ThermalPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex, conn, building, buttons) {
        super(info, chunkIndex, conn, building, buttons)
        this.objectInit() // create new object
    }
}

export default ThermalPowerPlant

