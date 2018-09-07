//Local Dependencies
var sqlite = require('./sqlite');

// Database functions
function validateLogin(email, password, callback) {
  var success = false;
  if (sqlite.getDatabaseInstance()) {
    var query = `SELECT * FROM credentials WHERE email = '${email}' and password = '${password}'`;
    sqlite.getDatabaseInstance().all(query, function(err, rows) {
      if (rows.length > 0) {
        rows.forEach(function(row) {
          if (row.email == email && row.password == password) {
            success = true;
          }
        });
      }
      callback(success);
    });
  } else
    callback(success);
}

function validateEmail(email, callback) {
  var success = false;
  if (sqlite.getDatabaseInstance()) {
    var query = `SELECT * FROM credentials WHERE email = '${email}'`;
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
