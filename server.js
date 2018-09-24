// Node Module Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var jwt = require('express-jwt')
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser')

// var uuid = require('uuid/v4')
// var session = require('express-session')
// var FileStore = require('session-file-store')(session);

//Local Dependencies
var appConfig = require('./src/config/app-config');
var router = require('./src/scripts/router/router');
var sqlite = require('./src/scripts/db/sqlite/sqlite');

var app = express();
// add & configure middleware
app.use(cookieParser());
//app.use('/public', express.static('public')); // remote sever public access location
//app.use(multer({ dest: '/uploads/' }).any()); // remote sever upload location
// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// For each request, provide wildcard Access-Control-* headers via OPTIONS call
app.use(cors());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
router.routRequests(app, session);

// Init Server
var server = app.listen(process.env.PORT || appConfig.server.port, function() {
  var host = server.address().address;
  var port = server.address().port;
  sqlite.openDatabase();
  console.log("Node Seed app listening at http://%s:%s", host, port);
});
