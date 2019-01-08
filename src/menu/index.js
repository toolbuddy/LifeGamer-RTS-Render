import './style.css'
import './move_block.css'

import * as API from '../API'
import moveCanvasCreate from './moveCanvas'

import BitCoinMiner from '../source/img/mainMap/building/BitCoinMiner.png'
import FishFarm from '../source/img/mainMap/building/FishFarm.png'
import GeoThermalPowerPlant from '../source/img/mainMap/building/GeoThermalPowerPlant.png'
import SolarPowerPlant from '../source/img/mainMap/building/SolarPowerPlant.png'
import ThermalPowerPlant from '../source/img/mainMap/building/ThermalPowerPlant.png'
import WindPowerPlant from '../source/img/mainMap/building/WindPowerPlant.png'
import Pasture from '../source/img/mainMap/building/Pasture.png'
import Sawmill from '../source/img/mainMap/building/Sawmill.png'
import MilitaryCamp from '../source/img/mainMap/building/MilitaryCamp.png'
import Residence from '../source/img/mainMap/building/Residence.png'
import Hotspring from '../source/img/mainMap/building/Hotspring.png'
import ICFab from '../source/img/mainMap/building/ICFab.png'

var img_list = {
    Energy:{
        img:[ThermalPowerPlant, GeoThermalPowerPlant, WindPowerPlant, SolarPowerPlant],
        tag:['ThermalPowerPlant', 'GeoThermalPowerPlant', 'WindPowerPlant', 'SolarPowerPlant'],
        description:[
            'Cost: 10000\nPower: 1000\nPopulation: -10\nMoney: -1500\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10',
            'Cost: 20000\nPower: 500\nPopulation: -1\nMoney: -300\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10',
            'Cost: 15000\nPower: 250\nPopulation: -1\nMoney: -300\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10',
            'Cost: 20000\nPower: 500\nPopulation: -1\nMoney: -200\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10'
        ]
    },
    Money:{
        img:[BitCoinMiner, FishFarm, Pasture, Sawmill, Hotspring, ICFab],
        tag:['BitCoinMiner', 'FishFarm', 'Pasture', 'Sawmill', 'Hotspring', 'ICFab'],
        description:[
            'Cost: 5000\nPower: -2000\nPopulation: -1\nMoney: 5000\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10',
            'Cost: 12000\nPower: -200\nPopulation: -5\nMoney: 2000\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10',
            'Cost: 8000\nPower: -100\nPopulation: -30\nMoney: 2000\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10',
            'Cost: 8000\nPower: -500\nPopulation: -10\nMoney: 2000\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10',
            'Cost: 0\nPower: 0\nPopulation: -2\nMoney: 1000\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10',
            'Cost: 60000\nPower: -2500\nPopulation: -20\nMoney: 7000\nPopulationCap: 0\nSize: 4\nMaxLevel: 5\nBuildTime: 10'
        ]
    },
    Population:{
        img:[MilitaryCamp, MilitaryCamp, Residence, Residence],
        tag:['MilitaryCamp', 'LargeMilitaryCamp', 'Residence', 'LargeResidence'],
        description:[
            'Cost: 25000\nPower: -400\nPopulation: 2\nMoney: 0\nPopulationCap: 0\nSize: 4\nMaxLevel: 1\nBuildTime: 10',
            'Cost: 60000\nPower: -500\nPopulation: 4\nMoney: 0\nPopulationCap: 0\nSize: 8\nMaxLevel: 1\nBuildTime: 10',
            'Cost: 10000\nPower: -200\nPopulation: 0\nMoney: 0\nPopulationCap: 10\nSize: 4\nMaxLevel: 1\nBuildTime: 10',
            'Cost: 10000\nPower: -200\nPopulation: 0\nMoney: 0\nPopulationCap: 5\nSize: 8\nMaxLevel: 5\nBuildTime: 10'
        ]
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

function _init_clsPage(){
    var cls_list = document.getElementsByClassName('class_list');
    var cls_btn = document.getElementsByClassName('classes');
    for(var i = 0; i < cls_list.length; i += 1){
        cls_list[i].style.visibility = 'hidden';
        cls_list[i].style.zIndex = '1';

        cls_btn[i].style.opacity = 0.7;
    }
}

function class_click(cls){
    var id = cls.getAttribute('id')
    var cls_page = document.getElementById(`${id}_clsPage`);

    _init_clsPage();
    cls_page.style.zIndex = '2';
    cls_page.style.visibility = 'visible';

    cls.style.opacity = 1;
}

function building_block_exit(){

	var build = document.getElementById('build');
	var selection = document.getElementById('build_items');
	if(build.className.match('active') == 'active') {
		selection.style.display = 'none';
		build.className = build.className.replace('active', '');
	}
}

function move_window_exit(){
    document.getElementById('move_block').style.display = 'none';
}

function item_click(item){
	building_block_exit();
    API.menu.BuildRequest(window.conn, window.mainMap._data.data, item._data)
    window.elementsToggle()
}


function move_click(){
    total = 0;
    count_list = [0,0,0,0]
    moveCanvasCreate()
    document.querySelector('#total_number > span').innerHTML = total;
    document.querySelectorAll('.bar > .number > span:nth-child(2)').forEach(item => { item.innerHTML = 0; })
    document.getElementById('move_block').style.display = 'block';
}

function home_click(){
    API.miniMap.ViewRangeMapdataRequest(window.conn, window.playerData.data.Home)
    window.miniMap.setDspCenter(window.playerData.data.Home.X, window.playerData.data.Home.Y)
    window.miniMap.addFocusRect(window.playerData.data.Home.X, window.playerData.data.Home.Y)
}

function move_submit(){
    window.conn.msgSender('OccupyRequest', window.playerData.Username, {
        'From': window.moveMiniMap.moveFrom,
        'To': window.moveMiniMap.moveTo,
        'Amount': total
    })
    console.log(total);
}

function load_items(img_list){

	var item;
	var build_items = document.getElementById('items');

    var idx = 0;
    for(var cls in img_list){

        //objects part
        var cls_page = document.createElement('div');
        build_items.appendChild(cls_page);
        cls_page.className = 'class_list';
        cls_page.setAttribute('id', `${cls}_clsPage`);
        for(var i = 0; i < img_list[cls].img.length; i+= 1){

            //items lists
            var tag_name = img_list[cls].tag[i];
            item = document.createElement('div');
            item.className = 'item';
            item.setAttribute('id', `${tag_name}`);
            var c_div1 = document.createElement('div');

            item.appendChild(c_div1);
            cls_page.appendChild(item);

            var num = String(idx);
            while(num.length < 3){
                num = '0'+num;
            }

            c_div1.setAttribute('id', 'img'+num);
            document.getElementById('img'+num).style.backgroundImage = `url(${img_list[cls].img[i]})`;
            c_div1.className = 'img';


            item.onclick = function() { item_click(this) };
            item._data = tag_name;


            //items descriptions
            var description = document.getElementById('description');
            var pic = document.createElement('div');
            pic.style.backgroundImage = `url(${img_list[cls].img[i]})`;
            pic.className = 'item_bpic';
            var content = document.createElement('div');
            content.setAttribute('id', `des_${tag_name}`);
            content.appendChild(pic);

            var h = document.createElement('H1')
            h.appendChild(document.createTextNode(`${tag_name}`))
            content.appendChild(h);
            var pre = document.createElement('PRE')
            pre.appendChild(document.createTextNode(`${img_list[cls].description[i]}`));
            content.appendChild(pre);
            h.className = 'wordsInDescription';
            pre.className = 'wordsInDescription';

            content.className = 'description';
            description.appendChild(content);
            item.onmouseover = function(){
                var id = this.getAttribute('id');
                document.getElementById(`des_${id}`).style.display = 'block';
            }
            item.onmouseout = function(){
                var id = this.getAttribute('id');
                document.getElementById(`des_${id}`).style.display = 'none';
            }



            idx += 1;
        }

        //class name part
        var class_btn = document.createElement('div');
        class_btn.className = 'classes btn btn_img';
        class_btn.setAttribute('id', `${cls}`);
        document.getElementById('items_list').appendChild(class_btn);
        class_btn.onclick = function(){ class_click(this); }

        var s = document.createElement('span');
        class_btn.appendChild(s.appendChild(document.createTextNode(`${cls}`)));

    }

    var classLists = document.querySelectorAll('div.class_list')
    for (let i = 0; i < classLists.length; ++i) {
        classLists[i].style.top = `-${i}00%`
    }

    class_click(document.getElementsByClassName('classes')[0]);
}

var total = 0
var count_list = [0, 0, 0, 0]
function count_num(mode, digits, total){
    let count = 1;
    if(mode == 'down'){
        count = -1;
    }

    var result = total;
    count_list[digits] += count;
    if(count_list[digits] < 0){
        count_list[digits] = 0;
    }
    else if(count_list[digits] > 9){
        count_list[digits] = 9;
    }
    else{
        //todo
        //
        //
        //
        //whether exceeding the limit
        //
        result = total + count * Math.pow(10, digits);
    }

    document.querySelector('#total_number > span').innerHTML = result;
    document.querySelector(`#number_${digits} > span:nth-child(2)`).innerHTML = count_list[digits];

    return result;
}
for(let i = 0; i < 4; i++){
    document.getElementById(`minus_${i}`).onclick = function(){
        total = count_num('down', i, total);
    }
    document.getElementById(`plus_${i}`).onclick = function(){
        total = count_num('up', i, total);
    }
}

function moveModeSelect(node) {
    let mode = node.innerHTML.toLowerCase()
    window.moveMiniMap.moveType = mode;
}

document.querySelector('#left > div.buttonList > div:nth-child(1)').onclick = function() { moveModeSelect(this); }
document.querySelector('#left > div.buttonList > div:nth-child(2)').onclick = function() { moveModeSelect(this); }


document.body.appendChild(document.getElementById('build_items'))
load_items(img_list);
document.body.appendChild(document.getElementById('move_block'))

document.querySelector('#menu_list > div:first-child').onclick = function(){ build_click() };
document.querySelector('#menu_list > div:nth-child(2)').onclick = function(){ move_click() };
document.querySelector('#menu_list > div:last-child').onclick = function(){ home_click() };
document.querySelector('#building_block_exit').onclick = function(){ building_block_exit() };
document.querySelector('#move_window_exit').onclick = function(){ move_window_exit() };
document.querySelector('#move_submit').onclick = function(){ move_submit(); move_window_exit() };
