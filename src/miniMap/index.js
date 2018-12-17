import * as PIXI from 'pixi.js'

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
  mapData, totalChunks, playerName);

app.stage.addChild(miniMap.drawMiniMap(24, 32));