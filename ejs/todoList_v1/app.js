const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const port = 3000;
// list of items to render
const items = ["Buy Food", "Cook Food", "Eat Food"]; // we can push items to const array but cannot change the array indexes
const workItems = [];
// using ejs template engine
app.set("view engine", "ejs");
// using body-parser for getting post data
app.use(bodyParser.urlencoded({ extended: true }));
// use public static folder
app.use(express.static("public"));
// root get request
app.get("/", function (req, res) {
  // this will render the ejs file inside the views folder
  let day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});
// root post request
app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
// for work route
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});
app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

// for about page route
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
