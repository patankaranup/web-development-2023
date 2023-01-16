const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

const apikey = process.env.API_KEY_MAILCHIMP;
const server = "us10";

app.use(bodyParser.urlencoded({ extended: true }));
// to serve static images and css sheets from folder
app.use(express.static("public"));
const port = process.env.PORT || 3000; // will change dynamically on the server and will run on port 3000  on local system

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.fn;
  const lastName = req.body.ln;
  const email = req.body.email;

  // alternatively we can use https.request after strigifying json data
  const client = require("@mailchimp/mailchimp_marketing");
  // cinfiguration
  client.setConfig({
    apiKey: apikey,
    server: server,
  });
  // new function
  const run = async () => {
    listId = "e579f2d235";
    const response = await client.lists.batchListMembers(listId, {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        },
      ],
    });

    if (response.new_members) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});

app.post("/failure", function (req, res) {
  // this will redirect us to the home/ root route
  res.redirect("/");
});
app.post("/success", function (req, res) {
  // this will redirect us to the home/ root route
  res.redirect("/");
});
app.listen(port, function () {
  console.log("Server running on port " + port);
});
