/**
 * The function sending msg to backend asking for registering a home space
 *
 * @function
 *
 * @param {Object} conn - Connection Object
 * @param {Object} pos - the position wonna register, contains x and y
 */
export default function HomePointRegister (conn, pos) {
    conn.msgSender('HomePointResponse', conn.playerData.UserName, {'home': {'x': pos.x, 'y': pos.y}})
}

