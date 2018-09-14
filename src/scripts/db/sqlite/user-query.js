//Local Dependencies
var sqlite = require('./sqlite');

// Database functions
function getUserInfo(userId, callback) {
  var success = false;
  var data;
  if (sqlite.getDatabaseInstance()) {
    var query = `SELECT user.firstName, user.middleName, user.lastName, address.addressLine1, address.addressLine2, `+
    ` address.locality, address.state, address.country, address.pincode` +
    ` FROM user JOIN address ON user.id = address.userId WHERE user.id = '${userId}' and user.status = 1 and address.status = 1`
    sqlite.getDatabaseInstance().all(query, function(err, rows) {
      if (rows.length > 0) {
        success = true;
        rows.forEach(function(row) {
          data = row;
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
    sqlite.getDatabaseInstance().run(query, function(err) {
      if(data.address) {
        updateUserAddress(userId, data.address, callback);
      } else {
        if (!err)
          success = true;
        callback(success);
      }
    });
  } else
    callback(success);
}

function updateUserAddress(userId, data, callback) {
  var success = false;
  if (sqlite.getDatabaseInstance()) {
    var query = `UPDATE address SET addressLine1 = '${data.addressLine1}'` +
      ((data.addressLine2) ? ` ,addressLine2 = '${data.addressLine2}'` : ``) +
      ((data.locality) ? ` ,locality = '${data.locality}'` : ``) +
      ((data.state) ? ` ,state = '${data.state}'` : ``) +
      ((data.country) ? ` ,country = '${data.country}'` : ``) +
      ((data.pincode) ? ` ,pincode = '${data.pincode}'` : ``) +
      ` WHERE userId = '${userId}' and status = 1`;
    sqlite.getDatabaseInstance().run(query, function(err) {
      if (!err)
        success = true;
      callback(success);
    });
  } else
    callback(success);
}

module.exports = {
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo
};
