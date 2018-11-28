/**
 * The function return 9-elements array contains map chunk data request
 *
 * @function
 *
 * @param {Object} viewPoint - contains X and Y
 * @returns {Promise<Object>} a promise contains 9-elements array
 * @resolve {Object} a 9-elements array
 */

function calculateViewRange (ViewPoint) {
    return new Promise((resolve, reject) => {
        let viewRange = []
        for (let i = 0; i < 9; i++) {
            viewRange.push({ 'X': ViewPoint.X + (i%3 - 1), 'Y': ViewPoint.Y + Math.floor((i/3) - 1) })
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
    WebsocketConnection.msgSender('MapDataRequest', WebsocketConnection.playerData.Username, { ChunkPos: viewRange })
}

