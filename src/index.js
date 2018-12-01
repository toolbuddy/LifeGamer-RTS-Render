import index from './index.css'
import WebsocketConnection from './comm/Connection'
import MainMap from './mainMap/container'

import * as API from './API'
//import * as Building from './mainMap/building'

// container width auto setting

window.onresize = resize

function resize() {
    document.querySelector('.container').style.width = `${document.querySelector('#mainMap').offsetWidth + document.querySelector('.aside').offsetWidth + 1 }px`
}

resize();

// render part

document.querySelector('section#mainMap').appendChild(MainMap.view)


