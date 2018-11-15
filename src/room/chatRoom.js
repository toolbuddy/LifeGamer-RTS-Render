import chatCSS from './style.css' 

document.getElementById("Chat").style.display = "block";  //init
document.getElementById("chatTab").className += " active";//init


document.querySelector("#chatTab").addEventListener("click",function(e){
    TabClick(e,"Chat");
});
document.querySelector("#serverTab").addEventListener("click",function(e){
    TabClick(e,"ServerMsg");
});
function TabClick(evt, type) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"; 
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(type).style.display = "block";
    evt.currentTarget.className += " active";

    $("#Chat #show").scrollTop($("#Chat #show")[0].scrollHeight);
    $("#ServerMsg #show").scrollTop($("#ServerMsg #show")[0].scrollHeight);
}


/*write msg from client*/
document.querySelector("#btn").onclick = write;
const msgInput = document.querySelector("#content");
msgInput.addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        write();
    }
});
function write(){  
    var msg = msgInput.value;
    msg = msg.replace(/</g,"&lt");
    msg = msg.replace(/>/g,"&gt");

    if(msg!=""){
        var time = get_TIME();
        $("#Chat #show").append("\
            <div class='user'>\
                <span title='" + time + "'>" + msg + "</span> \
            </div>");
        $("#Chat #show").scrollTop($("#Chat #show")[0].scrollHeight);
        console.log("Message "+ msg);
        msgInput.value = "";

        send_ChatMsg();
    }
}

/*send the msg to the server*/
function send_ChatMsg(){
    console.log("send");
}



/*write msg from server*/
function write_ChatMsg(url,sender,time,msg){    
    var tit = sender+"  "+time
    $("#Chat #show").append(" \
        <div> \
            <img src='" + url + "' title='" + tit + "'>\
            <span>" + msg + "</span> \
        </div>");
    $("#Chat #show").scrollTop($("#Chat #show")[0].scrollHeight);
}
function write_ServerMsg(time,msg){
    $("#ServerMsg #show").append(" \
        <div title='" + time + "'>" + msg + "</div>");
    $("#ServerMsg #show").scrollTop($("#ServerMsg #show")[0].scrollHeight);
}


/*get the msg from the server*/ 
function get_Msg(){

}
/*decode the msg from the server*/ 
function decode_Msg(){

}



function get_TIME(){
    var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth()<10)? '0'+date.getMonth() : date.getMonth();
    var D = (date.getDate()<10)? '0'+date.getDate() : date.getDate();
    var h = (date.getHours()<10)? '0'+date.getHours() : date.getHours();
    var m = (date.getMinutes()<10)? '0'+date.getMinutes() : date.getMinutes();
    var s = (date.getSeconds()<10)? '0'+date.getSeconds() : date.getSeconds();
     
    return Y + "/" + M + "/" + D + " " + h + ':' + m + ':' + s;
}



write_ChatMsg('https://imgur.com/MTBIqnn.png','123',get_TIME(),"111");
write_ChatMsg('https://imgur.com/MTBIqnn.png','123',get_TIME(),"111");
write_ChatMsg('https://imgur.com/MTBIqnn.png','456',get_TIME(),"22222222211111111111111112");
write_ChatMsg('https://imgur.com/MTBIqnn.png','789',get_TIME(),"1111111111111111111111111111111111111111111111111111111111");

write_ServerMsg(get_TIME(),"11111111111111111111111111111111");
write_ServerMsg(get_TIME(),"11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");