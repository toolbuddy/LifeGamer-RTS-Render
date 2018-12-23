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
  constructor (width, height, mapData, totalChunks, playerName) {


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

    this.outputContainer = new PIXI.Container();
    this.outputContainer.x = 0;
    this.outputContainer.y = 0;
    this.outputContainer.interactive = true;
    outputContainerXmax = this.outputContainer.x;
    outputContainerYmax = this.outputContainer.y;
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
    this.outputContainer.addChild(miniMapGraphics);
    this.isMouseOver = false;
    this.ismouseDown = false;
    this.isMouseMove = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.dstX = 0;
    this.dstY = 0;
    this.outputContainer
      .on('mouseover', (event) => {
        this.isMouseOver = true;
      })
      .on('mouseout', (event) => {
        this.isMouseOver = false;
        this.ismouseDown = false;
      })
      .on('mousedown', (event) => {
        this.ismouseDown = true;
        this.isMouseMove = false;
        this.mouseX = event.data.global.x;
        this.mouseY = event.data.global.y;
        this.containerX = this.outputContainer.x;
        this.containerY = this.outputContainer.y;
      })
      .on('mouseup', (event) => {
        this.ismouseDown = false;
        if (this.isMouseOver)
        {
          if (!(this.isMouseMove))
          {
            var tempX = Math.floor((event.data.global.x - this.outputContainer.x) / chunkWidth);
            var tempY = Math.floor((event.data.global.y - this.outputContainer.y) / chunkHeight);
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
        }
      })
      .on('mousemove', (event) => {
        if (this.ismouseDown)
        {
          this.isMouseMove = true;
          var tempX = this.containerX + (event.data.global.x - this.mouseX);
          var tempY = this.containerY + (event.data.global.y - this.mouseY);
          if (tempX <= outputContainerXmin) { tempX = outputContainerXmin; }
          else if (tempX >= outputContainerXmax) { tempX = outputContainerXmax; }
          if (tempY <= outputContainerYmin) { tempY = outputContainerYmin; }
          else if (tempY >= outputContainerYmax) { tempY = outputContainerYmax; }
          this.outputContainer.x = tempX;
          this.outputContainer.y = tempY;

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
