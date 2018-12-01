const app = new PIXI.Application({width: 900, height: 900});
document.body.appendChild(app.view);
PIXI.loader.add("img/cat.png").load(setup);
function setup() {
  let map = new PIXI.Container();
  buildingSizeX = 3;
  buildingSizeY = 2;
  let c;
  document.onkeydown = function(event) {
    var keycode = event.which || event.keyCode;
    if(keycode == 65){
      c = createTouchLayer(700, 500, buildingSizeX, buildingSizeY);
      app.stage.addChild(c);
    }
    if(keycode == 83){
      app.stage.removeChild(c);
    }
  }
}
