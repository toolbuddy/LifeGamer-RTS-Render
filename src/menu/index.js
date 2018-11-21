import menu from './style.css'
import img000 from './src/000.jpg'
import img001 from './src/001.jpg'
import img002 from './src/002.jpg'
import img003 from './src/003.jpg'
import img004 from './src/004.jpg'
import img005 from './src/005.jpg'

var img_list = {
    img:[img000, img001, img002, img003, img004, img005], 
    tag:['img1', 'img2', 'img3', 'img4', 'img5', 'img6'], 
}


function build_click(){

	var build = document.getElementById('build');
	var selection = document.getElementById('build_items');
	if(build.className.match('active') == 'active') {
		selection.style.display = 'none';
		build.className = build.className.replace('active', '');
	}
	else {
		build.className += ' active';
		selection.style.display = 'flex';
	}

}


function item_click(item){
	build_click();
    console.log(item);
    
}



function destroy_click(){
    console.log('destroy');
    
}
function move_click(){
    console.log('move');
}
function home_click(){
    console.log('home');
}

function load_items(img_list){

	var item;

	var build_items = document.getElementById('build_items');
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

		item.onclick = function(){item_click(this)};

	}
}


load_items(img_list);

document.querySelector('#menu_list > div:first-child').onclick = function(){ build_click() };
document.querySelector('#menu_list > div:nth-child(2)').onclick = function(){ destroy_click() };
document.querySelector('#menu_list > div:nth-child(3)').onclick = function(){ move_click() };
document.querySelector('#menu_list > div:last-child').onclick = function(){ home_click() };

