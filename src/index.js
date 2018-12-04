import index from './index.css'
import WebsocketConnection from './comm/Connection'
import MainMap from './mainMap/container'
import MainMapInit from './mainMap/ContainerInit'


import * as API from './API'

// container width auto setting

window.onresize = resize

function resize() {
    document.querySelector('.container').style.width = `${Math.ceil(document.querySelector('#mainMap').offsetWidth + document.querySelector('.aside').offsetWidth) }px`
}

resize();

// render part

document.querySelector('section#mainMap').appendChild(MainMap.view)

