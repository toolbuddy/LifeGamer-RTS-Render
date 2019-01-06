// import * as PIXI from 'pixi.js'

/**
 * This part is basis display setting.
 *
 * @param {number (const)} dspChunks
 *  - miniMap will display dspChunks * dspChunks chunks
 * @param {number (const)} chunkRadius
 *  - radius of the chunks' corners
 * @param {number (1-D array)} dspColor
 *  - the colors of chunks
 *  - hexadecimal color code
 *  - [0] for no owner
 *  - [1] for player self
 *  - [2] for other players
 * @function chunkColor(playerName,ownerName)
 *  - both arguments are string type
 *  - according the owner of chunk to return corresponding color code
 *  - will use is class MiniMap.drawMiniMap()
 * @param {number (var)} canvasWidth
 *  - the width of the canvas which miniMap will display
 * @param {number (var)} canvasHeight
 *  - the height of the canvas which miniMap will display
 * @param {number (var)} chunkWidth
 *  - the width of the chunks
 * @param {number (var)} chunkHeight
 *  - the height of the chunks
 * @param {number (var)} mapSize
 *  - the number of tottal chunks of whole map
 *  - must be complete square number
 * @param {number (var)} mapLong
 *  - mapSize == mapLong * mapLong
 */
const dspChunks = 9;
const chunkRadius = 5;
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
var mapSize = 0;
var mapLong = 0;
var halfMapLong = 0;

/**
 * This part is setting of miniMap mask move.
 *
 * @param {number (var)} outputContainerXmax
 *  - the maximum of x of miniMap
 *  - would equal to 0
 * @param {number (var)} outputContainerXmin
 *  - the minimum of x of miniMap
 *  - would less than 0
 * @param {number (var)} outputContainerYmax
 *  - the maximum of y of miniMap
 *  - would equal to 0
 * @param {number (var)} outputContainerYmin
 *  - the minimum of y of miniMap
 *  - would less than 0
 *
 * @function containerXcheck(val)
 *  - to make sure the value of x of miniMap is legal
 * @function containerYcheck(val)
 *  - to make sure the value of y of miniMap is legal
 *
 * @param {number (var)} correctionX
 *  - for correction of change ther value of x of miniMap
 * @param {number (var)} correctionY
 *  - for correction of change ther value of y of miniMap
 */
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
 * This part is setting of focusRect.
 * The focusRect will enclose those chunks mainMap are displaying.
 * The focusRect is based on the upper left corner chunk.
 *
 * @param {number (var)} mainMapDspX
 * @param {number (var)} mainMapDspY
 *  - the mainMap will display mainMapDspX * mainMapDspY chunks
 *
 * @param {number (const)} focusRectLineWidth
 *  - the lineWidth of focusRect
 *
 * @function focusXcheck(val)
 *  - to make sure the x of the upper left corner chunk is legal
 * @function focusYcheck(val)
 *  - to make sure the y of the upper left corner chunk is legal
 */
var mainMapDspX = 4;
var mainMapDspY = 2;
const focusRectLineWidth = 4;
function focusXcheck(val) {
  var temp = mapLong - mainMapDspX;
  if (val >= temp) { return temp; }
  else { return val; }
}
function focusYcheck(val) {
  var temp = mapLong - mainMapDspY;
  if (val >= temp) { return temp; }
  else { return val; }
}

/**
 * The main part.
 * The class called MiniMap.
 *
 * @class
 */
class MiniMap extends PIXI.Container {

  /**
   * @constructor
   *
   * @param {number} width
   *  - the width of the canvas which miniMap will display
   * @param {number} height
   *  - the height of the canvas which miniMap will display
   *
   * @param {object} mapData
   *  - the data of every chunks of whole map
   *  - each chunk will have x, y, terrain, owner
   *
   * @param {number} totalChunks
   *  - the number of total chunks in whole map
   */
  constructor (width, height, totalChunks, mapData) {

    super();

    /**
     * This part just assignment the params of basis setting.
     */
    canvasWidth = width;
    chunkWidth = canvasWidth / dspChunks;
    canvasHeight = height;
    chunkHeight = canvasHeight / dspChunks;
    console.log(arguments.length);
    if (arguments.length == 4) { this.mapData = mapData; }
    else { this.mapData = null; }
    mapSize = totalChunks;
    mapLong = Math.sqrt(mapSize);
    halfMapLong = mapLong / 2;

    this.x = 0;
    this.y = 0;
    this.interactive = true;
    outputContainerXmax = this.x;
    outputContainerYmax = this.y;
    outputContainerXmin = outputContainerXmax - (chunkWidth * mapLong) + canvasWidth;
    outputContainerYmin = outputContainerYmax - (chunkHeight * mapLong) + canvasHeight;

    /**
     * @param {string} player
     *  - the player's name
     *
     * @param {number} dspX
     *  - the x of the clicked chunk
     * @param {number} dspY
     *  - the y of the clicked chunk
     * ****************************************************************
     * IF NEED THE VALUE OF X AND Y OF THE CLICKED CHUNK,
     * JUST CALL miniMap.dspX AND miniMap.dspY
     * ****************************************************************
     */
    this.player = null;
    this.dspX = null;
    this.dspY = null;


    this.ismouseDown = false;
    this.isMouseMove = false;

    /**
     * These are object for miniMap render.
     */
    this.focusRect = new PIXI.Graphics();
    this.miniMapGraphics = new PIXI.Graphics();
    this.miniMapBackground = new PIXI.Sprite();

    this.mode = "miniMap";
  }

  /**
   * @function
   *  - to draw the miniMap
   *
   * @param {*} focusX
   *  - the x of the upper left corner chunk of focusRect
   *  - if and only if focusX and focusY are both number and defined
   *  - the miniMap will draw focusRect
   * @param {*} focusY
   *  - the y of the upper left corner chunk of focusRect
   *  - if and only if focusX and focusY are both number and defined
   *  - the miniMap will draw focusRect
   */
  drawMiniMap() {
    if (this.mapData == null)
    {
      this.removeChildren();
      this.miniMapGraphics = new PIXI.Graphics();
      this.miniMapGraphics.interactive = true;
      this.miniMapGraphics.beginFill(0x666666, 0.7);
      this.miniMapGraphics.drawRect(this.x, this.y, mapLong * chunkWidth, mapLong * chunkHeight);
      this.addChild(this.miniMapGraphics);
    }
    else
    {
      this.removeChildren();
      // this.removeChild(this.miniMapGraphics);
      this.miniMapGraphics = new PIXI.Graphics();
      this.miniMapGraphics.interactive = true;
      for (var i = 0; i < mapSize; ++i)
      {
        this.miniMapGraphics.beginFill(dspColor[chunkColor(this.player, this.mapData[i].owner)], 0.7);
        this.miniMapGraphics.drawRect(
          (this.mapData[i].x + mapLong / 2) * chunkWidth,
          (this.mapData[i].y + mapLong / 2) * chunkHeight,
          (chunkWidth * 0.9),
          (chunkHeight * 0.9)
        );
      }
      this.miniMapGraphics.endFill();
      this.addChild(this.miniMapBackground);
      this.addChild(this.miniMapGraphics);
      this.addChild(this.focusRect);
    }
  }

  /**
   * @function
   *  - to initialize the player name
   *
   * @param {string} playerName
   */
  initName(playerName) {
    this.player = playerName;
    this.drawMiniMap();
  }


  /**
   * @function
   *  - to add background image
   *
   * @param {string} img
   *  - the URL of background image
   */
  addBackGround(img) {
    this.miniMapBackground = new PIXI.Sprite.fromImage(img);
    this.addChild(this.miniMapBackground);
    this.drawMiniMap();
  }

  /**
   * @function
   *  - to add focusRect on miniMap
   *
   * @param {number} x
   * @param {number} y
   */
  addFocusRect(x, y) {
    var tempX = focusXcheck(x + mapLong / 2);
    var tempY = focusYcheck(y + mapLong / 2);
    this.removeChild(this.focusRect);
    this.focusRect = new PIXI.Graphics();
    this.focusRect.interactive = true;
    this.focusRect.lineStyle(focusRectLineWidth, 0x0000FF, 0.6, 0.5);
    this.focusRect.beginFill(0x0000FF, 0);
    this.focusRect.drawRect(chunkWidth * tempX, chunkHeight * tempY, chunkWidth * mainMapDspX, chunkHeight * mainMapDspY);
    this.focusRect.endFill();
    this.addChild(this.focusRect);
  }

  addMoveRect(x, y) {
    var tempX = x + mapLong / 2;
    var tempY = y + mapLong / 2;
    this.removeChild(this.focusRect);
    this.focusRect = new PIXI.Graphics();
    this.focusRect.interactive = true;
    this.focusRect.lineStyle(focusRectLineWidth, 0x0000FF, 0.6, 0.5);
    this.focusRect.beginFill(0x0000FF, 0);
    this.focusRect.drawRect(chunkWidth * tempX, chunkHeight * tempY, chunkWidth, chunkHeight);
    this.focusRect.endFill();
    this.addChild(this.focusRect);
  }

  getChunkInfo(x, y) {
    for (var i = 0; i < mapSize; ++i)
    {
      if (this.mapData[i].x == x && this.mapData[i].y == y)
      {
        if (this.mode == "homeSelect")
        {
          return {
            "x": this.mapData[i].x,
            "y": this.mapData[i].y,
            "terrain": this.mapData[i].terrain,
            "owner": this.mapData[i].owner
          };
        }
        else if (this.mode == "populationMove")
        {
          return {
            "x": this.mapData[i].x,
            "y": this.mapData[i].y
          };
        }
      }
    }
  }

  /**
   * @function
   *  - to set display center
   *
   * @param {*} x
   * @param {*} y
   */
  setDspCenter(x, y) {
    console.log("x: " + x + " y: " + y);
    this.addFocusRect(x, y);
    var tempX = x + mapLong / 2 - Math.floor(dspChunks / 2);
    var tempY = y + mapLong / 2 - Math.floor(dspChunks / 2);
    if (tempX < 0) { tempX = 0; }
    else if (tempX > 41) { tempX = 41; }
    if (tempY < 0) { tempY = 0; }
    else if (tempY > 41) { tempY = 41; }
    console.log("tempX: " + tempX + " tempY: " + tempY);
    this.x = -(tempX * chunkWidth);
    this.y = -(tempY * chunkHeight);
    console.log("this.x: " + this.x + " this.y: " + this.y);
  }

  /**
   * @function
   *  - to initialize the miniMap
   *  - MUST CALL AFTER CREATE MINIMAP
   */
  init() {
    this.drawMiniMap();
    this
      .on('mouseout', (event) => {
        this.ismouseDown = false;
      })
      .on('mousedown', (event) => {
        this.ismouseDown = true;
        this.isMouseMove = false;
        correctionX = event.data.global.x - this.x;
        correctionY = event.data.global.y - this.y;
      })
      .on('mouseup', (event) => {
        this.ismouseDown = false;

        if (this.isMouseMove)
        {
          this.dspX = null;
          this.dspY = null;
          console.log(this.dspX + " " + this.dspY);
        }
        else
        {
          this.dspX = Math.floor((event.data.global.x - this.x) / chunkWidth) - mapLong / 2;
          this.dspY = Math.floor((event.data.global.y - this.y) / chunkHeight) - mapLong / 2;
          console.log(this.dspX + " " + this.dspY);
          if (this.mode == "miniMap")
          {
            this.addFocusRect(this.dspX, this.dspY);
          }
          else if (this.mode == "homeSelect")
          {
            this.addMoveRect(this.dspX, this.dspY);
            this.getChunkInfo(this.dspX, this.dspY);
          }
          else if (this.mode == "populationMove")
          {
            this.addMoveRect(this.dspX, this.dspY);
            this.getChunkInfo(this.dspX, this.dspY);
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
   * @function
   *  - to update map data
   *
   * @param {object} mapData
   */
  mapDataUpdate(mapData) {
    this.mapData = mapData;
    this.drawMiniMap();
  }
}

// export default MiniMap