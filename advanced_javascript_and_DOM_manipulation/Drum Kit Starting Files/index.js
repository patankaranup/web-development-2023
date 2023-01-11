// var btn = document.querySelector("button");
// btn.addEventListener("click", handleClick);
function btnAnimation(currentKey) {
  var ck = document.querySelector("." + currentKey);
  ck.classList.add("pressed");
  setTimeout(() => {
    ck.classList.remove("pressed");
  }, 120);
}

function makeSound(key) {
  switch (key) {
    case "w":
      var audio = new Audio("sounds/tom-1.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("sounds/tom-2.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("sounds/tom-3.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("sounds/tom-4.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("sounds/snare.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("sounds/crash.mp3");
      audio.play();
      break;
    case "l":
      var audio = new Audio("sounds/kick-bass.mp3");
      audio.play();
      break;

    default:
      break;
  }
}

var btn_s = document.querySelectorAll(".drum");
for (let i = 0; i < btn_s.length; i++) {
  btn_s[i].addEventListener("click", handleClick);
}
// detect mouse click

function handleClick() {
  var btnInnerHTML = this.innerHTML;
  makeSound(btnInnerHTML);
  btnAnimation(btnInnerHTML);
}
// detect keydown
function handleKeyDown(event) {
  var btn = event.key;
  makeSound(btn);
  btnAnimation(btn);
}

// add event listener to entire document cause we cannot add it to keyboard so it entire doc will listen to key press
document.addEventListener("keydown", handleKeyDown);
