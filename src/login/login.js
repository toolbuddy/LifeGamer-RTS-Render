$(document).ready(function() {
  $( "#button" ).click(function() {
    $("#cover_div").css({"visibility": "visible"});
    $("#cover_div").animate({"background-color": "black"}, 500);
  });
  $("p").css({"visibility": "hidden"});
  $("#story_div").css({"width": "0%"});
  $("#cover_div").animate({"background-color": "rgba(0, 0, 0, 0)"}, 3000, function() {
    $("#cover_div").css({"visibility": "hidden"});
    showText();
  });

});

function showText() {
  $("h1").animate({"color": "white"}, 1500);
  $("#story_div").animate({"width": "60%"}, 1000, "easeInOutQuart", function() {
    showButton();
    run();
  });
}
function showButton() {
  setTimeout(function() {
    $("#button").css({"bottom": "50px"});
    $("#button").animate({"bottom": "70px", "opacity": "1"}, 500, "easeOutCubic");
  }, 700);
}
function run() {
  $("p").css({"visibility": "visible"});
  $("p").css({"top": $("#story_div").height()});
  $("p").animate({"top": -$("p").height()}, 50000, "linear", run);
}
