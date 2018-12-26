import menu from './style.css'
import * as API from '../API'

import BitCoinMiner from '../source/img/mainMap/building/BitCoinMiner.png'
import FishFarm from '../source/img/mainMap/building/FishFarm.png'
import GeoThermalPowerPlant from '../source/img/mainMap/building/GeoThermalPowerPlant.png'
import SolarPowerPlant from '../source/img/mainMap/building/SolarPowerPlant.png'
import ThermalPowerPlant from '../source/img/mainMap/building/ThermalPowerPlant.png'
import WindPowerPlant from '../source/img/mainMap/building/WindPowerPlant.png'

var img_list = {
    img:[BitCoinMiner, FishFarm, GeoThermalPowerPlant, SolarPowerPlant, ThermalPowerPlant, WindPowerPlant],
    tag:['BitCoinMiner', 'FishFarm', 'GeoThermalPowerPlant', 'SolarPowerPlant', 'ThermalPowerPlant', 'WindPowerPlant']
}


function build_click(){

	var build = document.getElementById('build');
	var selection = document.getElementById('build_items');
	if(build.className.match('active') != 'active'){
		build.className += ' active';
		selection.style.display = 'block';
	}

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
	for(var i =0; i<img_list.img.length; i+=1){
		item = document.createElement('div');
		item.className = 'item';
		var c_div1 = document.createElement('div');
		var c_div2 = document.createElement('div');

		item.appendChild(c_div1);
		item.appendChild(c_div2);
		build_items.appendChild(item);

		var num = String(i);
		while(num.length < 3){
			num = '0'+num;
		}
		c_div1.setAttribute('id', 'img'+num);
		document.getElementById('img'+num).style.backgroundImage = `url(${img_list.img[i]})`;
		c_div1.className = 'img';

		c_div2.setAttribute('id', 'tag'+num);
		document.getElementById('tag'+num).innerHTML = img_list.tag[i];
		c_div2.className = 'tag';

		item.onclick = function() { item_click(this) };
        item._data = img_list.tag[i]
	}
}


load_items(img_list);

document.querySelector('#menu_list > div:first-child').onclick = function(){ build_click() };
document.querySelector('#menu_list > div:nth-child(2)').onclick = function(){ move_click() };
document.querySelector('#menu_list > div:last-child').onclick = function(){ home_click() };
document.querySelector('#exit_btn').onclick = function(){ exit_click() };

