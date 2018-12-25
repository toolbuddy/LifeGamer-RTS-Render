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
 * @param {number} mapSize - the number of total chunks
 * @param {number} mapLong - the number of one side chunks 
 */
const dspChunks = 16;
// const dspRngTmp = dspChunks / 2 - 0.5;
const dspColor = [0xC3BBBB, 0x00FF95, 0xDB0A0A];
function chunkColor(playerName, ownerName) {
  if (ownerName == "NONE") { return 0; }
  else if (ownerName == playerName) { return 1; }
  else { return 2; }
}
var canvasWidth = 0;
var canvasHeight = 0;
var chunkWidth = 0;
var chunkHeight = 0;
var player = null;
var mapSize = 0;
var mapLong = 0;
function dspRngCheck(x, y) {
  if ((x >= dspXmin) && (x <= dspXmax) && (y >= dspYmin) && (y <= dspYmax)) { return true; }
  else { return false; }
}
function dspCenSetCheck(val0, dval) {
  var val = val0 - dval;
  if (val < 0) { return val0; }
  else if (val >= mapLong)
  {
    return val0;
  }
  else { return val; }
}

var outputContainerXmax = 0;
var outputContainerXmin = 0;
var outputContainerYmax = 0;
var outputContainerYmin = 0;

function containerXcheck(val) {
  if (val <= outputContainerXmin) { return outputContainerXmin; }
  else if (val >= outputContainerXmax) { return outputContainerXmax; }
  else { return val; }
}

function containerYcheck(val) {
  if (val <= outputContainerYmin) { return outputContainerYmin; }
  else if (val >= outputContainerYmax) { return outputContainerYmax; }
  else { return val; }
}

var correctionX = 0;
var correctionY = 0;



/**
 * The base Class.
 * 
 * @ Class
 */
class MiniMap extends PIXI.Container {

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
  constructor (width, height, mapData, totalChunks, playerName) {

    super();
    canvasWidth = width;
    chunkWidth = canvasWidth / dspChunks;
    canvasHeight = height;
    chunkHeight = canvasHeight / dspChunks;

    this.mapData = mapData;
    mapSize = totalChunks;
    mapLong = Math.sqrt(mapSize);
    player = playerName;

    this.ownerName = "NULL";
    this.terrainType = "NULL";

    // this.outputContainer = new PIXI.Container();
    this.x = 0;
    this.y = 0;
    this.interactive = true;
    outputContainerXmax = this.x;
    outputContainerYmax = this.y;
    outputContainerXmin = outputContainerXmax - canvasWidth;
    outputContainerYmin = outputContainerYmax - canvasHeight;
    let miniMapGraphics = new PIXI.Graphics();
    miniMapGraphics.cacheAsBitmao = true;
    miniMapGraphics.interactive = true;
    for (var i = 0; i < mapSize; ++i)
    {
      miniMapGraphics.beginFill(dspColor[chunkColor(player, this.mapData[i].owner)]);
      miniMapGraphics.drawRect(
        (this.mapData[i].x) * chunkWidth,
        (this.mapData[i].y) * chunkHeight,
        (chunkWidth * 0.9),
        (chunkHeight * 0.9)
      );
    }
    this.addChild(miniMapGraphics);
    this.ismouseDown = false;
    this.isMouseMove = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.dstX = 0;
    this.dstY = 0;
    this
      .on('mouseout', (event) => {
        this.ismouseDown = false;
      })
      .on('mousedown', (event) => {
        this.ismouseDown = true;
        this.isMouseMove = false;
        // this.mouseX = event.data.global.x;
        // this.mouseY = event.data.global.y;
        correctionX = event.data.global.x - this.x;
        correctionY = event.data.global.y - this.y;
      })
      .on('mouseup', (event) => {
        this.ismouseDown = false;

        if (!(this.isMouseMove))
        {
          var tempX = Math.floor((event.data.global.x - this.x) / chunkWidth);
          var tempY = Math.floor((event.data.global.y - this.y) / chunkHeight);
          for (var i = 0; i < mapSize; ++i)
          {
            if ((this.mapData[i].x == tempX) && (this.mapData[i].y == tempY))
            {
              this.ownerName = this.mapData[i].owner;
              this.terrainType = this.mapData[i].terrain;
              console.log("mouseclick");
              console.log("owner: " + this.ownerName);
              console.log("terrainType: " + this.terrainType);
              break;
            }
          }
        }

      })
      .on('mousemove', (event) => {
        if (this.ismouseDown)
        {
          this.isMouseMove = true;
          this.x = containerXcheck(event.data.global.x - correctionX);
          this.y = containerYcheck(event.data.global.y - correctionY);
        }
      });
  }

  /**
   * @function dataUpdate(mapData)
   *    - update the information of map
   * @param {object} mapData 
   */
  mapDataUpdate(mapData) {
    this.mapData = mapData;
  }


  test() {
    console.log(this.outputContainer.x + " " + this.outputContainer.y);
  }
}

export default MiniMap
