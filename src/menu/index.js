import menu from './style.css'
import * as API from '../API'

import BitCoinMiner from '../source/img/mainMap/building/BitCoinMiner.png'
import FishFarm from '../source/img/mainMap/building/FishFarm.png'
import GeoThermalPowerPlant from '../source/img/mainMap/building/GeoThermalPowerPlant.png'
import SolarPowerPlant from '../source/img/mainMap/building/SolarPowerPlant.png'
import ThermalPowerPlant from '../source/img/mainMap/building/ThermalPowerPlant.png'
import WindPowerPlant from '../source/img/mainMap/building/WindPowerPlant.png'


var img_list = {
    cat0:{
        img:[BitCoinMiner, FishFarm, BitCoinMiner, FishFarm, BitCoinMiner, FishFarm, BitCoinMiner, FishFarm],
        tag:['BitCoinMiner', 'FishFarm', 'BitCoinMiner', 'FishFarm', 'BitCoinMiner', 'FishFarm', 'BitCoinMiner', 'FishFarm']
    },
    cat1:{
        img:[GeoThermalPowerPlant, SolarPowerPlant],
        tag:['GeoThermalPowerPlant', 'SolarPowerPlant']
    },
    cat2:{
        img:[ThermalPowerPlant, WindPowerPlant],
        tag:['ThermalPowerPlant', 'WindPowerPlant']
    }
}


function build_click(){

	var build = document.getElementById('build');
	var selection = document.getElementById('build_items');
	if(build.className.match('active') != 'active'){
		build.className += ' active';
		selection.style.display = 'block';
	}
}

function _init_elements(){
    var cls_list = document.getElementsByClassName('class_list');
    var cls_btn = document.getElementsByClassName('classes');
    for(var i = 0; i < cls_list.length; i += 1){
        cls_list[i].style.visibility = 'hidden';
        cls_list[i].style.zIndex = '1';

        cls_btn[i].style.border = 'none';
    }
}

function class_click(cls){
    var id = cls.getAttribute('id')
    var element = document.getElementById(`${id}_element`);

    _init_elements();
    element.style.zIndex = '2';
    element.style.visibility = 'visible';

    cls.style.border = '2px solid yellow';
}

function exit_click(){

	var build = document.getElementById('build');
	var selection = document.getElementById('build_items');
	if(build.className.match('active') == 'active') {
		selection.style.display = 'none';
		build.className = build.className.replace('active', '');
	}

}

function item_click(item){
	exit_click();
    API.menu.BuildRequest(window.conn, window.mainMap._data.data, item._data)

    document.querySelector('#miniMap').style.display = 'none'
    document.querySelector('#menu').style.display = 'none'
    document.querySelector('#statusBar').style.display = 'none'
}


function move_click(){
    console.log('move');
}
function home_click(){
    API.miniMap.ViewRangeMapdataRequest(window.conn, window.playerData.Home)
}

function load_items(img_list){

	var item;
	var build_items = document.getElementById('items');

    var idx = 0;
    for(var cls in img_list){


        //objects part
        var element = document.createElement('div');
        build_items.appendChild(element);
        element.className = 'class_list';
        element.setAttribute('id', `${cls}_element`);

        for(var i = 0; i < img_list[cls].img.length; i+= 1){

            item = document.createElement('div');
            item.className = 'item';
            var c_div1 = document.createElement('div');
            var c_div2 = document.createElement('div');

            item.appendChild(c_div1);
            item.appendChild(c_div2);
            element.appendChild(item);

            var num = String(idx);
            while(num.length < 3){
                num = '0'+num;
            }

            c_div1.setAttribute('id', 'img'+num);
            document.getElementById('img'+num).style.backgroundImage = `url(${img_list[cls].img[i]})`;
            c_div1.className = 'img';

            c_div2.setAttribute('id', 'tag'+num);
            document.getElementById('tag'+num).innerHTML = img_list[cls].tag[i];
            c_div2.className = 'tag';

            item.onclick = function() { item_click(this) };
            item._data = img_list[cls].tag[i];

            idx += 1;
        }

        //class name part
        var class_btn = document.createElement('div');
        class_btn.className = 'classes btn';
        class_btn.setAttribute('id', `${cls}`);
        document.getElementById('items_list').appendChild(class_btn);
        class_btn.onclick = function(){ class_click(this); }

        var s = document.createElement('span');
        class_btn.appendChild(s.appendChild(document.createTextNode(`${cls}`)));

    }

    class_click(document.getElementsByClassName('classes')[0]);
}


load_items(img_list);

document.querySelector('#menu_list > div:first-child').onclick = function(){ build_click() };
document.querySelector('#menu_list > div:nth-child(2)').onclick = function(){ move_click() };
document.querySelector('#menu_list > div:last-child').onclick = function(){ home_click() };
document.querySelector('#exit_btn').onclick = function(){ exit_click() };

