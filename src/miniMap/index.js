import * as PIXI from 'pixi.js'
import MiniMap from './miniMap'
import MapData from './MapData'


let type = "WebGL";
if (!PIXI.utils.isWebGLSupported())
{
  type = "canvas";
}
PIXI.utils.sayHello(type);

var dspCanvas = document.querySelector('#miniMapWrapper > .miniMap > canvas');
var mapData = MapData;
var totalChunks = 2500;
var playerName = "Andy";

let app = new PIXI.Application({
  width: dspCanvas.offsetWidth,
  height: dspCanvas.offsetHeight,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0xffffff,
  view: dspCanvas,
});
app.renderer.view.style.position = "relative";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

console.log("********************************");
console.log("mapData loaded.");
console.log("totalChunks: " + totalChunks);
console.log("********************************");
console.log("");

// dspCanvas.getBoundingClientRect().left,
// dspCanvas.getBoundingClientRect().top,

var miniMap = new MiniMap(
  dspCanvas.offsetWidth,
  dspCanvas.offsetHeight,
  mapData, totalChunks, playerName
);
app.stage.addChild(miniMap.outputContainer);

export default miniMap



/**
 * if the mapData change
 */
// miniMap.mapDataUpdate(mapData);
// app.stage.addChild(miniMap.drawMiniMap());
