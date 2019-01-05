import * as PIXI from 'pixi.js'
import MiniMap from './miniMap'

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported())
{
  type = "canvas";
}
PIXI.utils.sayHello(type);

var dspCanvas = document.querySelector('#miniMapWrapper > .miniMap > canvas');
// var dspCanvas = document.getElementById("miniMapCanvas");

var totalChunks = 2500;

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
// with mapData
// var miniMap = new MiniMap(
//   dspCanvas.offsetWidth,
//   dspCanvas.offsetHeight,
//   totalChunks, mapData
// );

// without mapData
var miniMap = new MiniMap(
  dspCanvas.offsetWidth,
  dspCanvas.offsetHeight,
  totalChunks
);
miniMap.init();
app.stage.addChild(miniMap);

// initialize player name
// miniMap.initName(playerName);

// add background image
// miniMap.addBackGround("./images/miniMapBackGround.jpg");

// Update the map data
// miniMap.mapDataUpdate(mapData);

// set display center
// miniMap.setDspCenter(0, 0);

// add the focusRect
// miniMap.addFocusRect(0, 0);

// GET the x and y of the clicked chunk
// if the click event haven't happen both would be null
// var clickedX = miniMap.dspX;
// var clickedY = miniMap.dspY;

export default miniMap
