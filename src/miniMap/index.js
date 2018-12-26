// import * as PIXI from 'pixi.js'
import MiniMap from './miniMap'
import MapData from './MapData'


let type = "WebGL";
if (!PIXI.utils.isWebGLSupported())
{
  type = "canvas";
}
PIXI.utils.sayHello(type);

var dspCanvas = document.querySelector('#miniMapWrapper > .miniMap > canvas');
// var dspCanvas = document.getElementById("miniMapCanvas");
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


// create miniMap and initialize
var miniMap = new MiniMap(
  dspCanvas.offsetWidth,
  dspCanvas.offsetHeight,
  mapData, totalChunks
);
miniMap.init();
app.stage.addChild(miniMap);

// initialize player name
miniMap.initName(playerName);

// Update the map data
// miniMap.mapDataUpdate(mapData);

// GET the x and y of the clicked chunk
// if the click event haven't happen both would be null
// var clickedX = miniMap.dspX;
// var clickedY = miniMap.dspY;

export default miniMap