import msgType from './msgType'
import playerData from './playerData'

/**
 * The connection function offer websocket connection to backend game engine
 *
 * @class
 */

class conn {
    /**
     * @constructor
     *
     * @param {string} host - server host name
     * @param {number} port - port
     * @param {string} token - gitlab access token for registering
     */
    constructor (host, port, token) {
        this.webUrl = `ws://${host}:${port}`
        this.token = token
        this.connection = null
    }
    /**
     * websocket and playerdata object init
     *
     * @async
     * @function
     *
     */
    async init () {
        this.playerData = new playerData()          // initialize playerdata
        this.connection = await this.connect()      // websocket connect
        this.connection.parent = this               // setting connection parent
        this.connection.onmessage = this.msgHandler // setting onmessage function, msgHandler
        this.register()                             // register
    }
    /**
     * using promise to await websocket creating successful
     *
     * @function
     *
     * @returns {Promise<Object>} a promise contains websocket object
     * @resolve {Object} websocket object
     * @reject {Error} websocket error
     */
    connect () {
        return new Promise((resolve, reject) => {
            var connection = new WebSocket(this.webUrl)
            connection.onopen = function() { resolve(connection) }
            connection.onerror = function(error) {
                console.error('[WebSocket creating error] WebSocket creating failed')
                reject(error)
            }
        })
    }
    /**
     * register, sending token to backend
     *
     * @function
     *
     */
    register () {
        this.connection.send(JSON.stringify({'Token': this.token}))
    }
    /**
     * the function handling websocket message
     *
     * @function
     *
     * @param {Event} e - websocket event
     */
    msgHandler (e) {
        let msg = JSON.parse(e.data)
        switch (msg.Msg_type) {
            case msgType['LogoutRequest']:
                break
            case msgType['HomePointRequest']:
                this.parent.msgSender('HomePointResponse', this.parent.playerData.Username, {'home': {'x': 3, 'y': 3}})
                break
            case msgType['LoginResponse']:
                console.log(`Welcome, ${msg.Username}`)
                this.parent.playerData.setUsername(msg.Username) // setting username in userdata
                break
            case msgType['PlayerDataResponse']:
                this.parent.playerData.updateUserData(msg) // updating userdata
                break
            case msgType['MapDataResponse']:
                break
            default: break
        }
    }
    /**
     * the function handling sending message request
     *
     * @function
     *
     * @param {string} Msg_type - message type
     * @param {string} username - username
     * @param {Object} param - parameter for data
     */
    msgSender (Msg_type, username, param) {
        let data = {
            'Msg_type': msgType[Msg_type],
            'Username': username
        }
        switch (Msg_type) {
            case 'HomePointResponse':
                data['Home'] = { 'X': param.home.x, 'Y': param.home.y }
                this.connection.send(JSON.stringify(data))
                break
            default: break
        }
    }
}

export default conn

