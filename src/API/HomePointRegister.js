/**
 * The function sending msg to backend asking for registering a home space
 *
 * @function
 *
 * @param {WebsocketConnection} WebsocketConnection - WebsocketConnection Object
 * @param {Object} pos - the position wonna register, contains X and Y
 */
export default function HomePointRegister (WebsocketConnection, pos) {
    WebsocketConnection.msgSender('HomePointResponse', window.playerData.UserName, { home: { 'X': pos.X, 'Y': pos.Y } })
}

