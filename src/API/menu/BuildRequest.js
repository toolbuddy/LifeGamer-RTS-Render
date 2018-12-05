import CreateBuildLayer from '../../mainMap/CreateBuildLayer'

async function BuildRequest (conn, MapData, building) {
    let layer = await CreateBuildLayer(conn, MapData, building)
    conn.mainMap.addChild(layer)
}

export default BuildRequest
