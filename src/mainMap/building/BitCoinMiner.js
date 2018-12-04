import BaseBuilding from './BaseBuilding'

class BitCoinMiner extends BaseBuilding {
    constructor (info, chunkIndex, conn, building, buttons) {
        super(info, chunkIndex, conn, building, buttons)
        this.objectInit()
    }
}

export default BitCoinMiner

