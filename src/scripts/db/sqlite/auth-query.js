//Local Dependencies
var sqlite = require('./sqlite');

// Database functions
function validateLogin(email, password, callback) {
  var success = false;
  var data;
  if (sqlite.getDatabaseInstance()) {
    var query = `SELECT * FROM credentials WHERE email = '${email}' and password = '${password}' and status = 1`;
    sqlite.getDatabaseInstance().all(query, function(err, rows) {
      if (rows.length > 0) {
        success = true;
        rows.forEach(function(row) {
          if (row.email == email && row.password == password) {
            data = {userId: row.userId, token : 123456, expiresOn: Date.now()}
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

module.exports = {
  validateLogin: validateLogin,
  validateEmail: validateEmail
};
