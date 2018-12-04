import MsgType from './MsgType'
import * as API from '../API'
const GameData = require('./GameData')

import UpdateStatus from '../status/status'

var flag = false

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
    constructor (host, port, token, mainMap, miniMap) {
        this.webUrl = `ws://${host}:${port}`
        this.token = token
        this.connection = null
        this.mainMap = null
        this.miniMap = null
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
    setMainMap (MainMap) {
        this.mainMap = MainMap
    }
    setMiniMap (MiniMap) {
        this.miniMap.MiniMap
    }
    setSprites (sprites) {
        this.sprites = sprites
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
                API.HomePointRegister(this.parent, {'X': 1, 'Y': 1})
                break
            case MsgType['LoginResponse']:
                console.log(`Welcome, ${msg.Username}`)
                this.parent.playerData.setUsername(msg.Username)    // setting username in userdata
                break
            case MsgType['PlayerDataResponse']:
                this.parent.playerData.updateUserData(msg) // updating userdata
                API.mainMap.BuildOperRequest(this.parent, 'Build', 10, {'X': 1, 'Y': 1}, {'X': 12, 'Y': 12})
                UpdateStatus(msg.Power, msg.Human, msg.Money)
                if(!flag) {
                    API.miniMap.ViewRangeMapdataRequest(this.parent, {'X': 0, 'Y': 0})
                    flag = true
                }
                // console.log(await API.mainMap.CalcAllowBuildPoint(this.parent.mainMapData.data, 'BitCoinMiner'))
                break
            case MsgType['MapDataResponse']:
                await this.parent.mainMapData.updateData(msg.Chunks)
                await API.mainMap.ChunkEnvUpdate(this.parent.mainMap.children[0], this.parent.mainMapData.data)
                await API.mainMap.ChunkBuildingsUpdate(this.parent.mainMap.children[1], this.parent.mainMapData.data, this.parent, this.parent.sprites)
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

