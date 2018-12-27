import chatCSS from './style.css' 

//var name = window.playerData.Username;
var name = "admin";

/** 
 * @class msgObj
 * @type {Object}
 * 
 * @property {string} name - the name who send the message
 * @property {string} message - the message which user type
 * @property {string} type - the message type (client or server msg)
 */
function msgObj(name, msg, type) {
    return {
        name: name,
        message : msg,
        type : type
    };
}


/**
 * write the message data get from Server (call by Server)
 * @function
 * @param {object} msgObj - the message object
 */
function writeMsg(msgObj){    

    var sender = msgObj.name;
    var msg = msgObj.message;
    var type = msgObj.type;

    msg = msg.replace(/</g,"&lt");
    msg = msg.replace(/>/g,"&gt");

    $("#message #show").append(" \
        <div class='"+type+"'>" +
            "["+sender+"] : " + msg +
        "</div>");
    $("#message #show").scrollTop($("#message #show")[0].scrollHeight);
}


/**
 * the Enter key event listener
 * @listens
 */
const msgInput = document.querySelector("#content");
document.addEventListener("keypress", function(e){
    if(e.keyCode == 13){
		if(msgInput.value != "")
            sendMsg();
		else
			showChatRoom();
    }
});
/**
 * Send the msg to the server (Call to Server)
 * 
 * @function
 * 
 * @returns {msgObj} - the data of the message
 */
function sendMsg(){
    var msg = msgInput.value;
    msgInput.value = "";		
    return new msgObj(name, msg, "client");
}
/**
 * show/hide the msg block
 * @function
 */
var RoomShow = true;
function showChatRoom(){
    document.getElementsByClassName("chatRoom")[0].style.display = (RoomShow)?"none":"block";
    document.getElementsByClassName("ChatRoom")[0].style.height = (RoomShow)? "2.3rem":"30rem";
    RoomShow = !RoomShow; 
}