import BaseBuilding from './BaseBuilding'
import imgUrl from './static/SolarPowerPlant.png'

class SolarPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.imgUrl = imgUrl
        this.objectInit() // create new object
    }
}

export default SolarPowerPlant

