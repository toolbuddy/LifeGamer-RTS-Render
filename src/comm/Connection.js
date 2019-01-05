import MsgType from './MsgType'
import * as API from '../API'
import UpdateStatus from '../status/status'
import CreateBuildLayer from '../mainMap/CreateBuildLayer'

import { writeMsg } from '../room/chatRoom'

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
     * @param {string} token - gitlab access token for registering
     */
    constructor (host, token) {
        this.webUrl = host
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
        this.connection.send(JSON.stringify({'Token': this.token, 'Token_type': 'access_token'}))
        // this.connection.send(JSON.stringify({'Token': this.token, 'Token_type': 'private_token'}))
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
        switch (msg.Msg_type) {
            case MsgType['LogoutRequest']:
                break
            // first play, ask for selecting one chunk to become home point
            case MsgType['HomePointRequest']:
                var X = Math.floor(Math.random() * 50 - 26),
                    Y = Math.floor(Math.random() * 50 - 26)
                API.HomePointRegister(this.parent, {'X': X, 'Y': Y})
                break
            case MsgType['LoginResponse']:
                console.log(`Welcome, ${msg.Username}`)
                window.playerData.setUsername(msg.Username)    // setting username in userdata
                break
            case MsgType['PlayerDataResponse']:
                window.playerData.updateUserData(msg) // updating userdata
                if (!flag) {
                    flag = true
                    API.miniMap.ViewRangeMapdataRequest(this.parent, window.playerData.getHomePoint())
                }
                let userData = window.playerData.getUserStatusData()
                UpdateStatus(userData)
                break
            case MsgType['MapDataResponse']:
                await window.mainMap._data.updateData(msg.Chunks)
                await API.mainMap.ChunkEnvUpdate(window.mainMap.children[0], window.mainMap._data.data)
                await API.mainMap.ChunkBuildingsUpdate(window.mainMap.children[1], window.mainMap._data.data)
                await API.mainMap.ChunkInfoUpdate(window.mainMap.children[1], window.mainMap._data.data)
                break
            case MsgType['MinimapDataResponse']:
                await window.miniMap._data.updateData(msg)
                break
            case MsgType['Message']:
                writeMsg({
                    'name': msg.Username,
                    'message': msg.message,
                    'type': msg.Username === 'Server' ? 'Server' : 'Player'
                })
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
                data['Pos'] = param.home
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
            case 'Message':
                data['message'] = param.message
                this.connection.send(JSON.stringify(data))
                break
            default: break
        }
    }
}

export default WebsocketConnection

