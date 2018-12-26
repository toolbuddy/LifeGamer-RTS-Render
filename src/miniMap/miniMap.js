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
  constructor (width, height, mapData, totalChunks) {

    super();

    /**
     * This part just assignment the params of basis setting.
     */
    canvasWidth = width;
    chunkWidth = canvasWidth / dspChunks;
    canvasHeight = height;
    chunkHeight = canvasHeight / dspChunks;
    this.mapData = mapData;
    mapSize = totalChunks;
    mapLong = Math.sqrt(mapSize);
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
  drawMiniMap(focusX, focusY) {
    this.removeChildren();
    if (arguments.length == 0)
    {
      let miniMapGraphics = new PIXI.Graphics();
      miniMapGraphics.interactive = true;
      for (var i = 0; i < mapSize; ++i)
      {
        miniMapGraphics.beginFill(dspColor[chunkColor(this.player, this.mapData[i].owner)]);
        miniMapGraphics.drawRoundedRect(
          (this.mapData[i].x) * chunkWidth,
          (this.mapData[i].y) * chunkHeight,
          (chunkWidth * 0.9),
          (chunkHeight * 0.9),
          chunkRadius
        );
      }
      miniMapGraphics.endFill();
      this.addChild(miniMapGraphics);
    }
    else if ((arguments.length == 2) && (typeof focusX == "number") && (typeof focusY == "number"))
    {
      let miniMapGraphics = new PIXI.Graphics();
      miniMapGraphics.interactive = true;
      for (var i = 0; i < mapSize; ++i)
      {
        miniMapGraphics.beginFill(dspColor[chunkColor(this.player, this.mapData[i].owner)]);
        miniMapGraphics.drawRoundedRect(
          (this.mapData[i].x) * chunkWidth,
          (this.mapData[i].y) * chunkHeight,
          (chunkWidth * 0.9),
          (chunkHeight * 0.9),
          chunkRadius
        );
      }
      miniMapGraphics.endFill();
      let focusRect = new PIXI.Graphics();
      focusRect.interactive = true;
      focusRect.lineStyle(focusRectLineWidth, 0x0000FF, 1, 1);
      focusRect.beginFill(0x0000FF, 0);
      focusRect.drawRoundedRect(chunkWidth * focusX, chunkHeight * focusY, chunkWidth * mainMapDspX, chunkHeight * mainMapDspY, chunkRadius);
      focusRect.endFill();
      this.addChild(miniMapGraphics);
      this.addChild(focusRect);
    }
    else
    {
      let miniMapGraphics = new PIXI.Graphics();
      miniMapGraphics.interactive = true;
      for (var i = 0; i < mapSize; ++i)
      {
        miniMapGraphics.beginFill(dspColor[chunkColor(this.player, this.mapData[i].owner)]);
        miniMapGraphics.drawRoundedRect(
          (this.mapData[i].x) * chunkWidth,
          (this.mapData[i].y) * chunkHeight,
          (chunkWidth * 0.9),
          (chunkHeight * 0.9),
          chunkRadius
        );
      }
      miniMapGraphics.endFill();
      this.addChild(miniMapGraphics);
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
   *  - to add focusRect on miniMap
   *
   * @param {number} x
   * @param {number} y
   */
  addFocusRect(x, y) {
    var focusX = focusXcheck(x);
    var focusY = focusYcheck(y);
    this.drawMiniMap(focusX, focusY);
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
          this.dspX = Math.floor((event.data.global.x - this.x) / chunkWidth);
          this.dspY = Math.floor((event.data.global.y - this.y) / chunkHeight);
          this.addFocusRect(this.dspX, this.dspY);
          console.log(this.dspX + " " + this.dspY);
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

export default MiniMap
