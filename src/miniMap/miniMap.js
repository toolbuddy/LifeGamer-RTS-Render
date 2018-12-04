// Canvas setting
let type = "WebGL"
if (!PIXI.utils.isWebGLSupported())
{
  type = "canvas";
}
PIXI.utils.sayHello(type);
let Application = PIXI.Application,
  loader = PIXI.loader,
  Graphics = PIXI.Graphics,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  TextureCache = PIXI.utils.TextureCache,
  Rectangle = PIXI.Rectangle,
  renderer = requestAnimationFrame,
  stage = PIXI.stage;
let app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0xffffff,
  view: document.getElementById('miniMap'),
});
app.renderer.view.style.position = "relative";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(640, 640);

// mouseX and mouseY
var mouseX;
var mouseY;
document.body.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  document.getElementById("dsp_1").innerHTML = "mouseX: " + mouseX + " mouseY: " + mouseY;
});
// the parameters to decide dsp range of miniMap
var dspXcen = 0;
var dspYcen = 0;
var mapSize = 2500;
var mapLong = Math.sqrt(mapSize);
var dspLongX = 9; // dsp long on x must be odd number
var dspLongY = 9; // dsp long on y must be odd number
var dspXmin = 0; // minimum dsp on x
var dspXmax = 0; // maximum dsp on x
var dspYmin = 0; // minimum dsp on y
var dspYmax = 0; // maximum dsp on y
function dspCen(x, y) {
  dspXcen = x;
  dspYcen = y;
  document.getElementById("dsp_4_0").innerHTML = "dspXcen: " + dspXcen;
  document.getElementById("dsp_4_1").innerHTML = "dspYcen: " + dspYcen;
}
function dspCanRng(x, y) {
  dspLongX = x;
  dspLongY = y;
}
function dspCanSetting() {
  if ((dspXcen <= (dspLongX / 2 - 0.5))) { dspXmin = 0; }
  else { dspXmin = dspXcen - (dspLongX / 2 - 0.5); }
  if ((dspYcen <= (dspLongY / 2 - 0.5))) { dspYmin = 0; }
  else { dspYmin = dspYcen - (dspLongY / 2 - 0.5); }
  if ((dspXcen + (dspLongX / 2 - 0.5)) >= mapLong) { dspXmax = mapLong - 1; }
  else { dspXmax = dspXcen + (dspLongX / 2 - 0.5); }
  if ((dspYcen + (dspLongY / 2 - 0.5)) >= mapLong) { dspYmax = mapLong - 1; }
  else { dspYmax = dspYcen + (dspLongY / 2 - 0.5); }
}

// color setting
var terrainColor = [0x00FF00, 0x0000FF, 0xFFFF00, 0x00FF00, 0x0000FF, 0xFFFF00];
var ownerColor = [0xC3BBBB, 0x00FF95, 0xDB0A0A, 0x5CADFF];
function ownerNumber(str) {
  if (str == "NONE") { return 0; }
  else if (str == "Andy") { return 1; }
  else if (str == "Betty" || str == "Candy") { return 2; }
  else { return 2; }
}
var clubSize = 64;
function drawMiniMap() {
  let miniMapTmp = new Graphics();
  $.getJSON("./mapData.json", (json) => {
    var data = json;
    miniMapTmp.cacheAsBitmao = true;
    for (var i = 0; i < mapSize; ++i)
    {
      if ((data[i].x >= dspXmin) && (data[i].x <= dspXmax))
      {
        if ((data[i].y >= dspYmin) && (data[i].y <= dspYmax))
        {
          //miniMapTmp.lineStyle(4, ownerColor[ownerNumber(data[i].owner)], 1, 0);
          miniMapTmp.beginFill(ownerColor[ownerNumber(data[i].owner)]);
          miniMapTmp.drawRect((clubSize / 2) + (data[i].x - dspXmin) * clubSize, (clubSize / 2) + (data[i].y - dspYmin) * clubSize, (clubSize - 4), (clubSize - 4));
          miniMapTmp.endFill();
        }
      }
    }

  });
  app.stage.addChild(miniMapTmp);
}

/* main function start*/

// first load
dspCen(32, 24);
dspCanSetting();
drawMiniMap();

console.log("mapSize: " + mapSize);
console.log("mapLong: " + mapLong);
console.log("dspLongX: " + dspLongX);
console.log("dspLongY: " + dspLongY);



// get the html canvas and its center
var dspCan = document.getElementById("miniMap");
var dspCanXcen = dspCan.getBoundingClientRect().left + dspCan.offsetWidth / 2;
var dspCanYcen = dspCan.getBoundingClientRect().top + dspCan.offsetHeight / 2;
console.log("dspCanXcen: " + dspCanXcen);
console.log("dspCanYcen: " + dspCanYcen);
var dspTimer;

function coutClub(dst) {
  if (Math.abs(dst) <= 0.5) { return 0; }
  else
  {
    var tmp = Math.floor(Math.abs(dst) / clubSize + 0.5);
    if (dst > 0) { return tmp; }
    else { return (-1) * tmp; }
  }
}

dspCan.addEventListener("mouseover", () => {
  document.getElementById("test").style.backgroundColor = "#FF0000";
  dspTimer = setInterval(miniMapUpdate, 350);
  function miniMapUpdate() {
    var dstX = mouseX - dspCanXcen;
    var dstY = mouseY - dspCanYcen;
    document.getElementById("dsp_2").innerHTML = "dstX: " + dstX + " dstY: " + dstY;
    var focusX = dspXcen + coutClub(dstX);
    var focusY = dspYcen + coutClub(dstY);
    document.getElementById("dsp_3").innerHTML = "focusX: " + focusX + " focusY: " + focusY;
    if (Math.abs(dstX) > Math.abs(dstY))
    {
      if (Math.abs(dstX) > 160)
      {
        if (dstX > 0)
        {
          if (dspXcen < ((mapLong - 1) - (dspLongX / 2 - 0.5)))
          {
            dspCen(dspXcen + 1, dspYcen);
            dspCanSetting();
            drawMiniMap();
          }
        }
        else
        {
          if (dspXcen > (dspLongX / 2 - 0.5))
          {
            dspCen(dspXcen - 1, dspYcen);
            dspCanSetting();
            drawMiniMap();
          }
        }
      }
    }
    else if (Math.abs(dstX) < Math.abs(dstY))
    {
      if (Math.abs(dstY) > 160)
      {
        if (dstY < 0)
        {
          if (dspYcen > (dspLongY / 2 - 0.5))
          {
            dspCen(dspXcen, dspYcen - 1);
            dspCanSetting();
            drawMiniMap();
          }
        }
        else
        {
          if (dspYcen < ((mapLong - 1) - (dspLongY / 2 - 0.5)))
          {
            dspCen(dspXcen, dspYcen + 1);
            dspCanSetting();
            drawMiniMap();
          }
        }
      }
    }
    else
    {
      dspCanSetting();
      drawMiniMap();
    }
  }
})
dspCan.addEventListener("mouseout", () => {
  document.getElementById("test").style.backgroundColor = "#00FF00";
  clearInterval(dspTimer);
  document.getElementById("dsp_2").innerHTML = "dstX: dstY:";
  document.getElementById("dsp_3").innerHTML = "focusX: focusY:";
})