//class BigMap
function BigMap(width, height) {
  let chunkNum = 3;
  let spaceNum = 16;
  //let sprite = loadSprite("img/cat.png");
  let map = new PIXI.Container();
  let trunkArr = [];
  let texture = PIXI.loader.resources["img/cat.png"].texture;
  //inner class Trunk
  function Trunk() {
    let spaceArr = [];
    let trunk = new PIXI.Container();
    for(let i = 0; i < Math.pow(spaceNum, 2); i++) {
      spaceArr[i] = new PIXI.Container();
      let sprite = new PIXI.Sprite(texture);
      spaceArr[i].addChild(sprite);
      sprite.width = width / spaceNum / chunkNum;
      sprite.height = height / spaceNum / chunkNum;
      trunk.addChild(spaceArr[i]);
      spaceArr[i].position.set(
        (i % spaceNum) * width / spaceNum / chunkNum,
        Math.floor(i / spaceNum) * height / spaceNum / chunkNum
      );
    }
    //method
    this.addToParent = function(container) {
      container.addChild(trunk);
    }
    this.setPosition = function(x, y) {
      trunk.position.set(x, y);
    }
  }
  for(let i = 0; i < Math.pow(chunkNum, 2); i++) {
    trunkArr[i] = new Trunk();
    trunkArr[i].addToParent(map);
    trunkArr[i].setPosition(
      (i % chunkNum) * width / chunkNum,
      Math.floor(i / chunkNum) * height / chunkNum
    );
  }
  //method
  this.addToParent = function(container) {
    container.addChild(map);
  }
}

let app = new PIXI.Application({width: 900, height: 900});
document.body.appendChild(app.view);
PIXI.loader.add("img/cat.png").load(setup);
function setup() {
  let bigMap = new BigMap(900, 900);
  bigMap.addToParent(app.stage);
}
