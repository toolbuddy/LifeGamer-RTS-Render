import * as PIXI from 'pixi.js'

const dspChunks = 9;

class MiniMap {

  constructor (x, y, width, height, mapData, totalChunks) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mapData = mapData;
    this.totalChunks = totalChunks;
    console.log("********************************");
    console.log("**Minimap created.**");
    console.log("x: " + this.x);
    console.log("y: " + this.y);
    console.log("width: " + this.width);
    console.log("height: " + this.height);
    console.log("totalChunks: " + totalChunks);
    console.log("********************************");
    console.log("");
  }

  test() {
    console.log("FUCKYOU");
  }
}