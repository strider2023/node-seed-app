//Local Dependencies
var sqlite = require('./sqlite');

// Database functions
function getUserInfo(userId, callback) {
  var success = false;
  var data;
  if (sqlite.getDatabaseInstance()) {
    var query = `SELECT * FROM user WHERE id = '${userId}' and status = 1`;
    sqlite.getDatabaseInstance().all(query, function(err, rows) {
      if (rows.length > 0) {
        success = true;
        rows.forEach(function(row) {
          data = {firstName: row.firstName, middleName: row.middleName, lastName: row.lastName};
        });
      }
      callback(success, data);
    });
  } else
    callback(success);
}

function updateUserInfo(userId, data, callback) {
  var success = false;
  if (sqlite.getDatabaseInstance()) {
    var query = `UPDATE user SET firstName = '${data.firstName}'` +
      ((data.middleName) ? ` ,middleName = '${data.middleName}'` : ``) +
      ((data.lastName) ? ` ,lastName = '${data.lastName}'` : ``) +
      ` WHERE id = '${userId}' and status = 1`;
      console.log(query);
    sqlite.getDatabaseInstance().run(query, function(err) {
      if (!err) {
        success = true;
      }
      callback(success);
    });
  } else
    callback(success);
}

module.exports = {
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo
};
