// this line will check that the doc is loaded than will execute the query in the call back function
// this line is necessary when you have written script tag in head section

$("document").ready(function () {
  $("h1").addClass("big margin_50");
  $("button").css("background-color", "yellow");
  console.log($("h1").css("font-size"));
  console.log($("h1").hasClass("margin_50"));
});
// normal jquery syntax if script added at bottom
$("button").text("click me");
$("button").html("<em>Don't Click Me</em>");
console.log($("img").attr("src"));
$("a").attr("href", "https://www.yahoo.com");
console.log("This is log statement " + $("h2").attr("class"));
// add event listener to single element
$("h1").click(function () {
  $("h1").css("color", "purple");
});
// add event listener to every button
$("button").click(function () {
  $("h2").css("color", "green");
  console.log(this + "I got Clicked");
});
// input key pressed
$("input").keydown(function (event) {
  console.log(event.key);
});
$(document).keydown(function (event) {
  $("h1").text(event.key);
});
// another way for adding event listener
$("h1").on("click", function () {
  $("h1").css("color", "purple");
});
// adding element with jquery
// we can use after prepend append remove also
$("h1").before("<button>New Button jQuery Btn</button>");
// adding animations
// we can use hide show or toggle fadeIn fadetoggle slideup and all
$("button").on("click", function () {
  $("h3").toggle();
  $("h2").fadeOut();
  $("h1").animate({ opacity: 0.5 });
});
// chaining animations
$("#btn").on("click", function () {
  $("h1").slideUp().slideDown().animate({ opacity: 0.5 });
});
