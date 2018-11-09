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


const msgInput = document.querySelector("#content");
document.querySelector("#content").addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        write();
    }
});

document.querySelector("#btn").onclick = write();
function write(){
    var msg = msgInput.value;

    msg = msg.replace(/</g,"&lt");
    msg = msg.replace(/>/g,"&gt");

    if(msg!=""){
        $("#Chat #show").append("<div class='user'><span>"+msg+"</span></div>");
        $("#Chat #show").scrollTop($("#Chat #show")[0].scrollHeight);
        console.log("Message "+ msg);
        msgInput.value = "";
    }
}

function write_ChatMsg(msg){
    $("#Chat #show").append("<div><span>"+msg+"</span></div>");
    $("#Chat #show").scrollTop($("#Chat #show")[0].scrollHeight);
}

function write_ServerMsg(msg){
    $("#ServerMsg #show").append("<div>"+msg+"</div>");
    $("#ServerMsg #show").scrollTop($("#ServerMsg #show")[0].scrollHeight);
}

write_ChatMsg("1111111111");

/*
write_ChatMsg("1111111111111111111111111111111111111111111111");
write_ChatMsg("1111111111");
write_ChatMsg("1111111111");
write_ChatMsg("1111111111111111111111111111111111111111111111");
write_ChatMsg("1111111111111111111111111111111111111111111111");
write_ChatMsg("1111111111111111111111111111111111111111111111");
write_ChatMsg("1111111111111111111111111111111111111111111111");

write_ServerMsg("1111111111111111111111111111111111111111111111");
write_ServerMsg("1111111111");
write_ServerMsg("1111111111");
write_ServerMsg("1111111111111111111111111111111111111111111111");
write_ServerMsg("1111111111111111111111111111111111111111111111");
write_ServerMsg("1111111111111111111111111111111111111111111111");
write_ServerMsg("1111111111111111111111111111111111111111111111");
*/
