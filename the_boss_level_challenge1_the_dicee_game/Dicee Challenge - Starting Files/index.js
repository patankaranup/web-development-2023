var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

// console.log(randomNumber1);

var x = document.getElementsByClassName("img1").src;
var y = document.getElementsByClassName("img2").src;
// console.log(x);
x = "./images/dice" + randomNumber1 + ".png";
y = "./images/dice" + randomNumber2 + ".png";

image1 = document.querySelector(".img1");
image1.setAttribute("src", x);
image2 = document.querySelector(".img2");
image2.setAttribute("src", y);

heading1 = document.querySelector("h1");
if (randomNumber1 > randomNumber2) {
  heading1.innerText = "Player 1 Wins 🚩";
} else if (randomNumber1 < randomNumber2) {
  heading1.innerText = "Player 2 Wins 🚩";
} else {
  heading1.innerText = "Match Draw!";
}
