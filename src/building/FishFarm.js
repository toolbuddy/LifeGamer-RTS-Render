import BaseBuilding from './BaseBuilding'
import imgUrl from './static/FishFarm.png'

class FishFarm extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.imgUrl = imgUrl
        this.objectInit() // create new object
    }
}

export default FishFarm

