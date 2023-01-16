const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  // to perform get request to another server or api
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  // get response for external server
  https.get(url, function (response) {
    // console.log(response.statusCode);
    response.on("data", function (data) {
      // data is in hexadecimal form convert it to json object
      weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // console.log(temp, description);
      // send response to the client from our server
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celsius </h1>"
      );
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<img src='" + imageUrl + "'/>");
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
