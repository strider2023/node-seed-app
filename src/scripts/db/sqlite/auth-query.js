// Node Module Dependencies
var uuid = require('uuid/v4');
var jwt = require('jsonwebtoken');
var session = require('express-session');

//Local Dependencies
var sqlite = require('./sqlite');

// Database functions
function validateLogin(email, password, res, callback) {
  var success = false;
  var data;
  if (sqlite.getDatabaseInstance()) {
    var query = `SELECT * FROM credentials WHERE email = '${email}' and password = '${password}' and status = 1`;
    sqlite.getDatabaseInstance().all(query, function(err, rows) {
      if (rows.length > 0) {
        success = true;
        rows.forEach(function(row) {
          if (row.email == email && row.password == password) {
            // const uniqueId = uuid();
            // storage.setValue(uniqueId, row.userId, function(err, result) {
            //     //Error handling here
            //     console.log(err);
            //     console.log(result);
            // });
            // Using SECRET_TOKEN, create a token string that contains the user's _id from the database.
            var token = jwt.sign({
              id: row.id
            }, 'secret');
            data = {
              userId: row.userId,
              token: token,
              expiresOn: Date.now()
            };
            saveSessionInfo(res, token);
          }
        });
      }
      callback(success, data);
    });
  } else
    callback(success, data);
}

function validateEmail(email, callback) {
  var success = false;
  if (sqlite.getDatabaseInstance()) {
    var query = `SELECT * FROM credentials WHERE email = '${email}' and status = 1`;
    sqlite.getDatabaseInstance().all(query, function(err, rows) {
      if (rows.length > 0) {
        rows.forEach(function(row) {
          if (row.email == email) {
            success = true;
          }
        });
      }
      callback(success);
    });
  } else
    callback(success);
}

function saveSessionInfo(res, token, sessionToken) {
  var tokens = res.session.tokens;
  if (tokens.length > 0)
    res.session.tokens = [token];
  else {
    if (tokens.indexOf(token) == -1) {
      tokens.push(token)
      res.session.tokens = tokens;
    } else {
      console.log("Token present");
    }
  }
  console.log(tokens);
}

module.exports = {
  validateLogin: validateLogin,
  validateEmail: validateEmail
};
