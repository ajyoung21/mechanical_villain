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


// Dragging Stuff

dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}