const chunkCoorX = 4
const chunkCoorY = 2

/**
 * The function return (chunkCoor*chunkCoorY)-elements array contains map chunk data request
 *
 * @function
 *
 * @param {Object} viewPoint - contains X and Y, remember to give the top-left corner point
 * @returns {Promise<Object>} a promise contains 4-elements array
 * @resolve {Object} a 4-elements array
 */

function calculateViewRange (ViewPoint) {
    return new Promise((resolve, reject) => {
        let viewRange = []
        for (let i = 0; i < chunkCoorX * chunkCoorY; i++) {
            viewRange.push({ 'X': ViewPoint.X + (i % chunkCoorX), 'Y': ViewPoint.Y + Math.floor((i / chunkCoorX)) })
        }
        resolve(viewRange)
    })
}


/**
 * The function sending mapdata request to server
 *
 * @async
 * @function
 *
 * @param {WebsocketConnection} WebsocketConnection - WebsocketConnection object
 * @param {Object} ViewPoint - contains X and Y
 */
export default async function ViewRangeMapdataRequest (WebsocketConnection, ViewPoint) {
    let viewRange = await calculateViewRange(ViewPoint)
    WebsocketConnection.msgSender('MapDataRequest', window.playerData.Username, { ChunkPos: viewRange })
}

