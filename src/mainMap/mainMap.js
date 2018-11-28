var t;

const chunkNum = 2;
const spaceNum = 16;
const size = 900;
class Space {
  constructor(row, col) {
    this.isOccupied = false;
    this.row = row;
    this.col = col;
    this.position = new PIXI.Point(col * size / chunkNum / spaceNum, row * size / chunkNum / spaceNum);
    //this.touch = touch;
  }
}
class Trunk {
  constructor(index, container) {
    this.index = index;
    this.container = container;
    let x = (index % chunkNum) * size / chunkNum;
    let y = Math.floor(index / chunkNum) * size / chunkNum;
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
function showTouchLayer(trunkArr) {
  let touchLayer = new Array();
  for(let i = 0; i < trunkArr.length; i++) {
    for(let j = 0; j < trunkArr[i].spaceArr.length; j++) {
      for(let k = 0; k < trunkArr[i].spaceArr[j].length; k++) {
        let touch = new PIXI.Graphics();
        touch.tag = 1;
        let spaceSize = size / chunkNum / spaceNum;
        trunkArr[i].container.addChild(touch);
        touchLayer.push(touch);
        touch.beginFill(0xFFFFFF);
        touch.lineStyle(1, 0x000000);
        touch.drawRect(0, 0, spaceSize, spaceSize);
        touch.endFill();
        touch.interactive = true;
        touch.hitArea = new PIXI.Circle(0, 0, spaceSize, spaceSize);
        touch.position = trunkArr[i].spaceArr[j][k].position.clone();
        this.alpha = 1;
        touch.mouseover = function(mouseData) {
          this.alpha = 0.5;
        }
        touch.mouseout = function(mouseData) {
          this.alpha = 1;
        }
      }
    }
  }
  return touchLayer;
}
function hideTouchLayer(touchLayer) {
  for(let i = 0; i < touchLayer.length; i++) {
    touchLayer[i].parent.removeChild(touchLayer[i]);
    touchLayer[i].destroy({children:true, texture:true, baseTexture:true});
  }
}
const app = new PIXI.Application({width: size, height: size});
document.body.appendChild(app.view);
PIXI.loader.add("img/cat.png").load(setup);
function setup() {
  let map = new PIXI.Container();
  let texture = PIXI.loader.resources["img/cat.png"].texture;
  let trunkArr = new Array(Math.pow(chunkNum, 2));
  for(let i = 0; i < Math.pow(chunkNum, 2); i++) {
    let container = new PIXI.Container();
    app.stage.addChild(container);
    trunkArr[i] = new Trunk(i, container);

  }
  document.onkeydown = function(event) {
    var keycode = event.which || event.keyCode;
    if(keycode == 65){
      t = showTouchLayer(trunkArr);
      //alert("A");
    }
    if(keycode == 83){
      //alert("S");
      hideTouchLayer(t);
    }
  }
  //showTouchLayer(trunkArr);

}
