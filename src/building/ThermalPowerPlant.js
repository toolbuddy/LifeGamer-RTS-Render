import BaseBuilding from './BaseBuilding'
import imgUrl from './static/ThermalPowerPlant.png'

class ThermalPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.imgUrl = imgUrl
        this.objectInit() // create new object
    }
}

export default ThermalPowerPlant

