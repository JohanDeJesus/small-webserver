// index.js - Small Webserver
// Made By Johan De Jesus

var settings = require("./settings.json");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

if(typeof settings["fileServerRoute"] == "undefined"
|| typeof settings["serverPort"] == "undefined") {
  console.log("Setting file is wrong. Verify your settings and try again.");
} else {
  app.get('/', function(req, res) {
    res.sendStatus(200);
  })

  // Web server like behavior
  app.get(settings["fileServerRoute"], function(req, res) {
    var specifiedPath = req.params[0];
    console.log(specifiedPath);
    try {
      var sendFileObj;
      if(typeof settings["fileServerLocalFolder"] == "undefined" || settings["fileServerLocalFolder"] == "") {
        // Default folder: (nodejspath)/html/
        sendFileObj = { "root": __dirname + "/html/", "dotfiles":"deny"};
      } else {
        sendFileObj = { "root": settings["fileServerLocalFolder"], "dotfiles":"deny"};
      }
      res.sendFile(specifiedPath,sendFileObj);
    } catch(err) {
      console.log("File error: "+err);
      res.sendStatus(500);
    }
  });


  // Make webapp listen
  app.listen(settings["serverPort"], (err) => {
    if(err) { console.log('error:' + err); }
    else {
      console.log("server listening on: "+settings["serverHost"]+":"+settings["serverPort"]);
    }
  });
}
