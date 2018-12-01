import BaseBuilding from './BaseBuilding'
import imgUrl from './static/ThermalPowerPlant.png'

class ThermalPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex, conn) {
        super(info, chunkIndex, conn)
        this.imgUrl = imgUrl
        this.objectInit() // create new object
    }
}

export default ThermalPowerPlant

