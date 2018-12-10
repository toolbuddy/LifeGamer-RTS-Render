import BaseBuilding from './BaseBuilding'

class BitCoinMiner extends BaseBuilding {
    constructor (info, chunkIndex) {
        super(info, chunkIndex)
        this.buildingTexture = window.textures.buildings.BitCoinMiner
        this.objectInit()
    }
}

export default BitCoinMiner

