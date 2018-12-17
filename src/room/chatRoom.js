import chatCSS from './style.css' 

/** 
 * @class Msg_Obj
 * @type {Object}
 * 
 * @property {string} url - the picture of the sender
 * @property {string} name - the name who send the message
 * @property {string} time - the time when the message send
 * @property {string} message - the message which user type
 * @property {string} type - the message type (client or server msg)
 */
function Msg_Obj(url, name, time, msg, type) {
    return {
        url: url,
        name: name,
        time: time,
        message : msg,
        type : type
    };
}

/**
 * Send the msg to the server (Call to Server)
 *  - the "url" parm in line42 should change to get the right data
 *  - the "name" parm in line43 should change to get the right data
 * 
 * @function
 * 
 * @returns {Msg_Obj} - the data of the message
 */
document.querySelector("#btn").onclick = send_ChatMsg;
const msgInput = document.querySelector("#content");
msgInput.addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        send_ChatMsg();
    }
});
function send_ChatMsg(){
    console.log("Send");

    var url = 'https://imgur.com/MTBIqnn.png';                  // should change
    var name = "123";                                           // should change

    var msg = msgInput.value;
    msg = msg.replace(/</g,"&lt");
    msg = msg.replace(/>/g,"&gt");

    if(msg!=""){
        var time = get_TIME();
        msgInput.value = "";

        //console.log("Name : " + name + "\nTime : " + time + "\nMsg : " + msg);
        //Show_msg(new Msg_Obj(url, name, time, msg, "client"));
        return new Msg_Obj(url, name, time, msg, "client");
    }
}


/**
 * Show the message data get from Server (call by Server)
 *  - the "name" parm in line79 should change to get the right condition judgement
 * 
 * @function
 * 
 * @param {object} msg_obj - the message object
 */
function Show_msg(msg_obj){

    var url = msg_obj.url;
    var name = msg_obj.name;
    var time = msg_obj.time;
    var msg = msg_obj.message;

    console.log("Name : " + name + 
                "\nTime : " + time + 
                "\nMsg : " + msg);

    if (msg_obj.type == "client"){
        if(name == "123"){                          // should change
            write_ChatMsg_self(time, msg);
        }else{
            write_ChatMsg_other(url, name, time, msg);
        }
    } else if (msg_obj.type == "server"){
        write_ServerMsg(time, msg);
    }
}

/*------------------- The following are not used for the server--------------------------*/



/**
 * write msg to webpage
 * 
 * @function write_ChatMsg_self - the message show in client room (right blue side)
 * @function write_ChatMsg_other - the message show in client room (left gray side)
 * @function write_ServerMsg - the message show in server room
 */
function write_ChatMsg_self(time, msg){    
    $("#Chat #show").append("\
        <div class='user'>\
            <span title='" + time + "'>" + msg + "</span> \
        </div>");
    $("#Chat #show").scrollTop($("#Chat #show")[0].scrollHeight);
}
function write_ChatMsg_other(url,sender,time,msg){    
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

/**
 * Show the message room which user select 
 */
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

/**
 * Get the time when the message is send
 * 
 * @returns {string} - the time when the message is send
 */
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

document.getElementById("Chat").style.display = "block";  //init
document.getElementById("chatTab").className += " active";//init


/*
// The test for render
var test = Msg_Obj('https://imgur.com/MTBIqnn.png', "1234", get_TIME() , "哈哈哈", "client");
var test2 = Msg_Obj('https://imgur.com/MTBIqnn.png', "123", get_TIME() , "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", "client");
var test3 = Msg_Obj('https://imgur.com/MTBIqnn.png', "123", get_TIME() , "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", "server");
var test4 = Msg_Obj('https://imgur.com/MTBIqnn.png', "1243", get_TIME() , "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", "client");
Show_msg(test);
Show_msg(test2);
Show_msg(test3);
Show_msg(test4);
*/
