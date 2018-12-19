// import * as PIXI from 'pixi.js'
// import miniMap from './miniMap'

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported())
{
  type = "canvas";
}
PIXI.utils.sayHello(type);

var dspCanvas = document.getElementById("miniMapCanvas");
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


var miniMap = new MiniMap(
  dspCanvas.getBoundingClientRect().left,
  dspCanvas.getBoundingClientRect().top,
  dspCanvas.offsetWidth,
  dspCanvas.offsetHeight,
  mapData, totalChunks, playerName,
  32, 24
);
app.stage.addChild(miniMap.drawMiniMap());

var isMouseOver = false;
var isMouseDown = false;
dspCanvas.addEventListener("mouseover", () => { isMouseOver = true; });
dspCanvas.addEventListener("mouseout", () => { isMouseOver = false; });
dspCanvas.addEventListener("mousedown", (event) => {
  if (isMouseOver) { miniMap.mouseDown(event.clientX, event.clientY); }
});
dspCanvas.addEventListener("mouseup", (event) => {
  if (isMouseOver) { miniMap.mouseUp(event.clientX, event.clientY); }
  app.stage.addChild(miniMap.drawMiniMap());
  var ownerName = miniMap.ownerName; // if click will be "NULL"
  var terrainType = miniMap.terrainType; // if click will be "NULL"
  console.log(ownerName + "  " + terrainType);
});


/**
 * if the mapData change
 */
// miniMap.mapDataUpdate(mapData);
// app.stage.addChild(miniMap.drawMiniMap());