import menu from './style.css'

function get_data(url, cFunction){
	var xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			cFunction(this);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send(); 
}

function post_json(url, content, cFunction) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
			cFunction(json);
		}
	};
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(content));
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


function item_click(){
	build_click();
    post_json('/construct', {
        r:99, 
        c:99,
    },function(res){
        if(res.status)
            alert('there are something at the position');
        else
            alert('success');
    });
}



function destroy_click(){

}
function move_click(){

}
function home_click(){
	get_data('/home_pos', function(res){ 
    
    var obj = JSON.parse(res.responseText);
    console.log(obj.r, obj.c); 
    
    });

}

function load_items(tag_name){

	var item;

	var build_items = document.getElementById('build_items');
	for(var i =0; i<tag_name.length; i+=1){
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
		document.getElementById('img'+num).style.backgroundImage = `url('./src/${num}.jpg')`;
		c_div1.className = 'img';

		c_div2.setAttribute('id', 'tag'+num);
		document.getElementById('tag'+num).innerHTML = `${tag_name[i]}`;
		c_div2.className = 'tag';

		item.onclick = function(){item_click()};

	}
}




var tag = ['001', '002', '003', '004', '005', '006'];
load_items(tag);

document.querySelector('#menu > div:first-child').onclick = function(){ build_click() };
document.querySelector('#menu > div:last-child').onclick = function(){ home_click() };
