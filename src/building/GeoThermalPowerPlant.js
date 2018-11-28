import BaseBuilding from './BaseBuilding'
import imgUrl from './static/GeoThermalPowerPlant.png'

class GeoThermalPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.imgUrl = imgUrl
        this.objectInit() // create new object
    }
}

export default GeoThermalPowerPlant

