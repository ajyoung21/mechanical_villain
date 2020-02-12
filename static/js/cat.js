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

