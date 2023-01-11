const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// to parse the post data from client to server
app.use(bodyParser.urlencoded({ extended: true })); // for form data

// Route to root folder
app.get("/", function (req, res) {
  // we are using dir name because it needs full directory path
  //   console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});
// handle post request to the / route
app.post("/", function (req, res) {
  console.log(req.body); // return json data
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);
  var result = num1 + num2;
  res.send("The result of addition is " + result);
});

// bmi calculator route
app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});
// post route for the above
app.post("/bmicalculator", function (req, res) {
  var h = parseFloat(req.body.h);
  var w = parseFloat(req.body.w);
  var bmi = Math.round(w / (h * h));
  res.send("Your BMI is " + bmi);
});
// server listening on port 3000
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
