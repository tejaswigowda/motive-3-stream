var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(8080);

app.post("/sendValue", function (req, res) {
  console.log(req.body); // the posted data
});
