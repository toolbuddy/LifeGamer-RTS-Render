import BaseBuilding from './BaseBuilding'
import imgUrl from './static/WindPowerPlant.png'

class WindPowerPlant extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.imgUrl = imgUrl
        this.objectInit() // create new object
    }
}

export default WindPowerPlant

