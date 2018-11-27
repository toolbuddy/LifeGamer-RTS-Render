import index from './index.css'
import WebsocketConnection from './comm/Connection'
import mainMap from './mainMap/container'

import * as Building from './mainMap/building/Building'

// container width auto setting

window.onresize = resize

function resize() {
    document.querySelector('.container').style.width = `${document.querySelector('#mainMap').offsetWidth + document.querySelector('.aside').offsetWidth + 1 }px`
}

resize();

// render part

document.querySelector('section#mainMap').appendChild(mainMap.view)

