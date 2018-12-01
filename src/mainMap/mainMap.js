
//const size = 900;
//const totalSpacesNum = 16 * 2;

function createTouchLayer(width, height, buildingSizeX, buildingSizeY) {
  const chunkNum = 1;
  const spaceNum = 32;
  class Space {
    constructor(row, col) {
      this.isOccupied = false;
      this.row = row;
      this.col = col;
      this.position = new PIXI.Point(col * width / chunkNum / spaceNum, row * height / chunkNum / spaceNum);
      //this.touch = touch;
    }
  }
  class Chunk {
    constructor(index, container) {
      this.index = index;
      this.container = container;
      let x = (index % chunkNum) * width / chunkNum;
      let y = Math.floor(index / chunkNum) * height / chunkNum;
      container.position.set(x, y);
      this.spaceArr = new Array(spaceNum);
      for(let i = 0; i < spaceNum; i++) {
        this.spaceArr[i] = new Array(spaceNum);
        for(let j = 0; j < spaceNum; j++) {
          this.spaceArr[i][j] = new Space(i, j);
        }
      }
    }
  }
  let container;
  let chunkArr = new Array(Math.pow(chunkNum, 2));
  for(let i = 0; i < Math.pow(chunkNum, 2); i++) {
    container = new PIXI.Container();
    chunkArr[i] = new Chunk(i, container);
  }
  let touchLayer = new Array(chunkNum * chunkNum);
  for(let i = 0; i < chunkArr.length; i++) {
    touchLayer[i] = new Array(spaceNum);
    for(let j = 0; j < chunkArr[i].spaceArr.length; j++) {
      touchLayer[i][j] = new Array(spaceNum);
      for(let k = 0; k < chunkArr[i].spaceArr[j].length; k++) {
        let touch = new PIXI.Graphics();
        touchLayer[i][j][k] = touch;
        touch.tag = 1;
        let spaceSizeX = width / chunkNum / spaceNum;
        let spaceSizeY = height / chunkNum / spaceNum;
        chunkArr[i].container.addChild(touch);
        //touchLayer.push(touch);
        touch.beginFill(0xFFFFFF);
        touch.alpha = 0.5;
        touch.lineStyle(1, 0x000000);
        touch.drawRect(0, 0, spaceSizeX, spaceSizeY);
        touch.endFill();
        touch.interactive = true;
        touch.hitArea = new PIXI.Rectangle(0, 0, spaceSizeX, spaceSizeY);
        touch.position = chunkArr[i].spaceArr[j][k].position.clone();

        let count = 0;
        touch.mouseover = function(mouseData) {
          count++;
          for(let m = 0; m < spaceNum; m++) {
            for(let n = 0; n < spaceNum; n++) {
              if(m >= j && m < j + buildingSizeY && n >= k && n < k + buildingSizeX) {
                touchLayer[i][m][n].alpha = 0.2;
              }
              else {
                touchLayer[i][m][n].alpha = 0.5;
              }
            }
          }
        }
        /*
        touch.mouseout = function(mouseData) {
          count--;
          if(count == 0) {
            for(let m = 0; m < spaceNum; m++) {
              for(let n = 0; n < spaceNum; n++) {
                touchLayer[i][m][n].alpha = 1;
              }
            }
          }
        }
        */
      }
    }
  }
  /*
  container.reset = function() {
  }
  container.show = function(parent) {
    this.reset();
    parent.addChild(this);
  }
  container.hide = function() {
    this.parent.removeChild(this);
  }
  */
  return container;
}
/*
function hideTouchLayer(touchLayer) {
  for(let i = 0; i < touchLayer.length; i++) {
    for(let j = 0; j < touchLayer[i].length; j++) {
      for(let k = 0; k < touchLayer[i][j].length; k++) {
        touchLayer[i][j][k].parent.removeChild(touchLayer[i][j][k]);
        touchLayer[i][j][k].destroy({children:true, texture:true, baseTexture:true});
      }
    }
  }
}
*/
const app = new PIXI.Application({width: 900, height: 900});
document.body.appendChild(app.view);
PIXI.loader.add("img/cat.png").load(setup);
function setup() {
  let map = new PIXI.Container();
  //let texture = PIXI.loader.resources["img/cat.png"].texture;
  buildingSizeX = 3;
  buildingSizeY = 2;
  let c;
  document.onkeydown = function(event) {
    var keycode = event.which || event.keyCode;
    if(keycode == 65){
      //c.show(app.stage);
      c = createTouchLayer(700, 500, buildingSizeX, buildingSizeY);
      app.stage.addChild(c);
      //alert("A");
    }
    if(keycode == 83){
      //c.hide();
      app.stage.removeChild(c);
      //alert("S");
      //hideTouchLayer(t);
    }
  }
  //showTouchLayer(trunkArr);

}
