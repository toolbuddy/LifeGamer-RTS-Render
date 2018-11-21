import MsgType from './MsgType'
import * as API from '../API'
const GameData = require('./GameData')

/**
 * The connection function offer websocket connection to backend game engine
 *
 * @class
 */

class WebsocketConnection {
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
        this.playerData = new GameData.PlayerData()             // initialize playerdata
        this.mainMapData = new GameData.MainMapData()           // initialize mapdata
        this.miniMapData = new GameData.MiniMapData()           // initialize minimapdata
        this.connection = await this.connect()                  // websocket connect
        this.connection.parent = this                           // setting connection parent
        this.connection.onmessage = this.msgHandler             // setting onmessage function, msgHandler
        this.register()                                         // register
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
     * @async
     * @function
     *
     * @param {Event} e - websocket event
     */
    async msgHandler (e) {
        let msg = JSON.parse(e.data)
        console.log(msg)
        switch (msg.Msg_type) {
            case MsgType['LogoutRequest']:
                break
            // first play, ask for selecting one chunk to become home point
            case MsgType['HomePointRequest']:
                API.HomePointRegister(this.parent, {'X': 3, 'Y': 3})
                break
            case MsgType['LoginResponse']:
                console.log(`Welcome, ${msg.Username}`)
                this.parent.playerData.setUsername(msg.Username) // setting username in userdata
                break
            case MsgType['PlayerDataResponse']:
                this.parent.playerData.updateUserData(msg) // updating userdata
                // API.mainMap.BuildOperRequest(this.parent, 'Upgrade', 5, {'X': 3, 'Y': 3}, {'X': 5, 'Y': 5})
                // API.miniMap.ViewRangeMapdataRequest(this.parent, {'X': 3, 'Y': 4})
                break
            case MsgType['MapDataResponse']:
                this.parent.mainMapData.updateData(msg.Chunks)
                break
            case MsgType['MinimapDataResponse']:
                await this.parent.miniMapData.updateData(msg)
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
        // comm payload
        let data = {
            'Msg_type': MsgType[Msg_type],
            'Username': username
        }
        switch (Msg_type) {
            case 'HomePointResponse': // send home point response to backend server, home.x, home.y needed
                data['Home'] = param.home
                this.connection.send(JSON.stringify(data))
                break
            case 'MapDataRequest':
                data['ChunkPos'] = param.ChunkPos
                this.connection.send(JSON.stringify(data))
                break
            case 'BuildRequest':
                data['Action'] = param.action // action contains Build, Upgrade, Destruct, and Repair
                data['Structure'] = {
                    ID: param.structureID,
                    Chunk: param.structureChunk,
                    Pos: param.structurePos
                }
                this.connection.send(JSON.stringify(data))
                break
            default: break
        }
    }
}

export default WebsocketConnection

