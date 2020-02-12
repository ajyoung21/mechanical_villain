// Cat Stuff

var numpitch = 1
var audio = $(`#mySoundClip${numpitch}`)[0];



$("#cat").mouseenter(function() {
  audio.play();

}).on('click', function() {
  if (numpitch < 5) {
  audio.pause();
  audio.currentTime = 0;
  numpitch = numpitch + 1
}
 
  audio = $(`#mySoundClip${numpitch}`)[0];
  audio.play();
  console.log(`#mySoundClip${numpitch}`);

}).dblclick(function() {
  audio.pause();
  audio.currentTime = 0;
  numpitch = 1
  audio = $(`#mySoundClip${numpitch}`)[0];
  audio.play();
  console.log(`#mySoundClip${numpitch}`);


}).mouseleave(function() {
  audio.pause();
  audio.currentTime = 0;
  console.log('Stopped Music')
});

$('#minion').click(function() {
  $("#cat").addClass('animated');
  setTimeout(function() {
    $("#cat").removeClass('animated');
  }, 3000);
});
$('#minion').click(function() {
  $("#tablelaser").addClass('animated2');
  setTimeout(function() {
    $("#tablelaser").removeClass('animated2');
  }, 3000);
});
$('#minion').click(function() {
  $("#minion").addClass('animated3');
  setTimeout(function() {
    $("#minion").removeClass('animated3');
  }, 3000);
});

