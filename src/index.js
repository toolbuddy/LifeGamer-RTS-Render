import index from './index.css'
const dat = require('dat.gui')

var FizzyText = function() {
    this.message = 'dat.gui';
    this.speed = 0.8;
    // Define render logic ...
};

window.onload = function() {
    var text = new FizzyText();
    var gui = new dat.GUI();
    gui.add(text, 'message');
    gui.add(text, 'speed', -5, 5);
};
