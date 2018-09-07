//Local Dependencies
var sqlite = require('./../db/sqlite');

var response;

function router(req, res) {
  console.log(req.url);
  response = {
    status: 404,
    message: 'Not found',
    data: null
  };
  switch (req.url) {
    case '/auth/login':
      response = login(req, res);
      break;
    case '/auth/forgot_password':
      response = forgotPassword(req, res);
      break;
  }
}

function login(req, res) {
  if (req.body.email && req.body.password) {
    validateLogin(req.body.email, req.body.password, function(success) {
      if (success) {
        response = {
          status: 200,
          message: 'Success',
          data: {
            token: 123456,
            expires: Date.now()
          }
        };
      } else {
        response = {
          status: 200,
          message: 'Invalid User. Unable to login.',
          data: null
        };
      }
      res.send(JSON.stringify(response));
    });
  } else {
    res.send(JSON.stringify(response));
  }
};

function forgotPassword(req, res) {
  if (req.body.email) {
    validateEmail(req.body.email, function(success) {
      if (success) {
        response = {
          status: 200,
          message: 'Reset link sent to email address.',
          data: null
        };
      } else {
        response = {
          status: 200,
          message: 'Invalid email address.',
          data: null
        };
      }
      res.send(JSON.stringify(response));
    });
  } else {
    res.send(JSON.stringify(response));
  }
};

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
  router: router
};
