// import * as PIXI from 'pixi.js'


/**
 * The miniMap style setting.
 * Will not change in process.
 * 
 * const
 * @param {number} dspChunks
 *    - the miniMap will display "dspChunks * dspChunks" chunks
 * @param {number array} dspColor
 *    - the colors of chunks on miniMap depending on the owner
 *    - [0]: NONE / [1]: Player / [2]: Other Player
 * 
 * @param {number} chunkWidth - the width of chunks on miniMap
 * @param {number} chunkheight - the height of chunks on miniMap
 * 
 * @param {string} player - player name
 * @param {number} dspXcen - the median of dsp chunks X
 * @param {number} dspYcen - the median of dsp chunks Y
 * @param {number} dspXmin - the minimum of dsp chunks X
 * @param {number} dspYmin - the minimum of dsp chunks Y
 * @param {number} dspXmax - the maximum of dsp chunks X
 * @param {number} dspYmax - the maximum of dsp chunks Y
 * @param {number} mapSize - the number of total chunks
 * @param {number} mapLong - the number of one side chunks
 * 
 * @function dspInit(x,y) - init the range of chunks to dsp
 */
const dspChunks = 9;
const dspRngTmp = dspChunks / 2 - 0.5;
const dspColor = [0xC3BBBB, 0x00FF95, 0xDB0A0A];
function chunkColor(playerName, ownerName) {
  if (ownerName == "NONE") { return 0; }
  else if (ownerName == playerName) { return 1; }
  else { return 2; }
}
var chunkWidth = 0;
var chunkHeight = 0;
var player = null;
var dspXcen = 0;
var dspYcen = 0;
var dspXmin = 0;
var dspYmin = 0;
var dspXmax = 0;
var dspYmax = 0;
var mapSize = 0;
var mapLong = 0;
function dspInit(x, y) {
  dspXcen = x;
  dspYcen = y;
  if (dspXcen <= dspRngTmp) { dspXmin = 0; }
  else { dspXmin = dspXcen - dspRngTmp; }
  if (dspYcen <= dspRngTmp) { dspYmin = 0; }
  else { dspYmin = dspYcen - dspRngTmp; }
  if ((dspXcen + dspRngTmp) >= mapLong) { dspXmax = mapLong - 1; }
  else { dspXmax = dspXcen + dspRngTmp; }
  if ((dspYcen + dspRngTmp) >= mapLong) { dspYmax = mapLong - 1; }
  else { dspYmax = dspYcen + dspRngTmp; }
}
function dspRngCheck(x, y) {
  if ((x >= dspXmin) && (x <= dspXmax) && (y >= dspYmin) && (y <= dspYmax)) { return true; }
  else { return false; }
}
function dspCenSetCheck(val0, dval)
{
  var val = val0 - dval;
  if(val<0) { return val0; }
  else if (val>=mapLong) { 
    return val0;
  }
  else{ return val; }
}

var mouseX = 0;
var mouseY = 0;



/**
 * The base Class.
 * 
 * @ Class
 */
class MiniMap {

  /**
   * @param {number} x - the pos of miniMap canvas x
   * @param {number} y - the pos of miniMap canvas y
   * @param {number} width - the width of miniMap canvas width
   * @param {number} height - the height of miniMap canvas height
   * @param {object} mapData 
   *    - the simple data of map
   *    - 1-D array
   *    - an element represent a chunk
   * @param {number} totalChunks 
   * @param {string} player
   * 
   * @param {object} outputContainer
   *    - the pixi container
   *  
   */
  constructor (x, y, width, height, mapData, totalChunks, playerName, initX, initY) {

    this.x = x;
    this.y = y;

    this.width = width;
    chunkWidth = this.width / dspChunks;
    this.height = height;
    chunkHeight = this.height / dspChunks;

    this.mapData = mapData;
    mapSize = totalChunks;
    mapLong = Math.sqrt(mapSize);
    player = playerName;

    this.outputContainer = new PIXI.Container();

    dspInit(initX, initY);
    this.isMouseDown = false;
    this.isMouseOver = false;

    this.ownerName = "NULL";
    this.terrainType = "NULL";

    console.log("********************************");
    console.log("Minimap created.");
    console.log("x: " + this.x);
    console.log("y: " + this.y);
    console.log("width: " + this.width);
    console.log("height: " + this.height);
    console.log("totalChunks: " + totalChunks);
    console.log("player: " + player);
    console.log("********************************");
    console.log("");
  }

  mouseXmove(x0, x1) {
    var tmp0 = Math.floor((x0-this.x)/chunkWidth);
    var tmp1 = Math.floor((x1-this.x)/chunkWidth);
    if (tmp0==tmp1) { return 0; }
    else {
      var tmp = tmp1 - tmp0;
      return tmp;
    }
  }
  mouseYmove(y0, y1) {
    var tmp0 = Math.floor((y0-this.y)/chunkHeight);
    var tmp1 = Math.floor((y1-this.y)/chunkHeight);
    if (tmp0==tmp1) { return 0; }
    else {
      var tmp = tmp1 - tmp0;
      return tmp;
    }
  }

  findChunkData(x, y) {
    var tmpX = dspXmin + Math.floor((x-this.x)/chunkWidth);
    var tmpY = dspYmin + Math.floor((y-this.y)/chunkHeight);
    for (var i=0; i<mapSize; ++i)
    {
      if ((this.mapData[i].x==tmpX) && (this.mapData[i].y==tmpY))
      {
        this.ownerName = this.mapData[i].owner;
        this.terrainType = this.mapData[i].terrain;
        break;
      }
    }
  }

  /**
   * @function drawMiniMap(x,y)
   *    - draw the miniMap centered on the specified point
   */
  drawMiniMap() {
    let miniMapGraphics = new PIXI.Graphics();
    miniMapGraphics.cacheAsBitmao = true;
    for (var i = 0; i < mapSize; ++i)
    {
      if (dspRngCheck(this.mapData[i].x, this.mapData[i].y)) 
      {
        miniMapGraphics.beginFill(dspColor[chunkColor(player, this.mapData[i].owner)]);
        miniMapGraphics.drawRect(
          (this.mapData[i].x - dspXmin) * chunkWidth,
          (this.mapData[i].y - dspYmin) * chunkHeight,
          (chunkWidth *0.9),
          (chunkHeight *0.9)
        );
      }
    }
    this.outputContainer.addChild(miniMapGraphics);
    return this.outputContainer;
  }

  /**
   * @function dataUpdate(mapData)
   *    - update the information of map
   * @param {object} mapData 
   */
  mapDataUpdate(mapData) {
    this.mapData = mapData;
  }

  mouseDown(x, y) {
    mouseX = x;
    mouseY = y;
  }
  mouseUp(x, y) {
    var dx = this.mouseXmove(mouseX, x);
    var dy = this.mouseYmove(mouseY, y);
    if((dx==0) && (dy==0))
    {
      this.findChunkData(mouseX, mouseY);
    }
    else
    {
      this.ownerName = "NULL";
      this.terrainType = "NULL";
      var tmpX = dspCenSetCheck(dspXcen, dx);
      var tmpY = dspCenSetCheck(dspYcen, dy);
      dspInit(tmpX, tmpY);
    }
  }
}