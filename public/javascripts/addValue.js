var bpModal = document.getElementById("bpModal");
var bsModal = document.getElementById("bsModal");

// Get the button that opens the modal

var btnBP = document.getElementById("bpButton");
var btnBS = document.getElementById("bsButton");

// Get the <span> element that closes the modal
var spanBP = document.getElementsByClassName("close")[0];
var spanBS = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btnBP.onclick = function() {
  bpModal.style.display = "block";
}

btnBS.onclick = function() {
  bsModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanBP.onclick = function() {
  bpModal.style.display = "none";
}

spanBS.onclick = function() {
  bsModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == bpModal) {
    bpModal.style.display = "none";
  }
  if (event.target == bsModal) {
    bsModal.style.display = "none";
  }
}