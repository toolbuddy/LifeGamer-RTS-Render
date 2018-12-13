// import MiniMap from './MiniMap'

var dspCanvas = document.getElementById("miniMapCanvas");
var mapData = MapData;
var totalChunks = 2500;

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
  mapData, totalChunks);
miniMap.test();