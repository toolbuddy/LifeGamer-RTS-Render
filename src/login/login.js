$(document).ready(function() {
  run();
});
function run() {
  $("p").css({"top": $("#story_div").height()});
  $("p").animate({"top": -$("p").height()}, 50000, "linear", run);
}
