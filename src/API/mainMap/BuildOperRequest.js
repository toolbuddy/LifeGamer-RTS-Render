/**
 * The function sending building operation request to backend server
 *
 * @function
 *
 * @param {WebsocketConnection} WebsocketConnection - WebsocketConnection Object
 * @param {string} action - operation, including Build, Destruct, Repair, Upgrade
 * @param {number} sID - structure ID, show the type of structure
 * @param {Object} Chunk - Chunk pos, contain X and Y
 * @param {Object} Pos - the position inside the chunk, contain X and Y
 */

export default function BuildOperRequest (WebsocketConnection, action, sID, Chunk, Pos) {
    let structure = {
       'action': action,
        structureID: sID,
        structureChunk: Chunk,
        structurePos: Pos
    }
    WebsocketConnection.msgSender('BuildRequest', window.playerData.Username, structure)
}

