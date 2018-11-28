import BaseBuilding from './BaseBuilding'
import imgUrl from './static/BitCoinMiner.png'

class BitCoinMiner extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.imgUrl = imgUrl
        this.objectInit() // create new object
    }
}

export default BitCoinMiner

