const express = require("express");
const port = 3000;
const app = express();
// routes to different locations
app.get("/", function (req, res) {
  //   console.log(req);
  res.send("<h1>Hello this is response</h1>");
});
app.get("/contact", function (req, res) {
  res.send("<h1>Contact Me Page</h1>");
});
app.get("/about", function (req, res) {
  res.send("<h1>About Page</h1>");
});
app.get("/hobbies", function (req, res) {
  res.send("<ul><li>Swimming</li><li>Reading</li><li>Coding</li></ul>");
});

// server listening on port 3000
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
