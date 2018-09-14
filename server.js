// Node Module Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

//Local Dependencies
var appConfig = require('./src/config/app-config');
var router = require('./src/scripts/router/router');
var sqlite = require('./src/scripts/db/sqlite/sqlite');

var app = express();
app.use('/public', express.static('public')); // remote sever public access location
//app.use(multer({ dest: '/uploads/' }).any()); // remote sever upload location
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.routRequests(app);

// Init Server
var server = app.listen(appConfig.server.port, function() {
  var host = server.address().address;
  var port = server.address().port;
  sqlite.openDatabase();
  console.log("Node Seed app listening at http://%s:%s", host, port);
});
