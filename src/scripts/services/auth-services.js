//Local Dependencies
var authQuery = require('./../db/sqlite/auth-query.js');

var response;

function router(app) {
  response = {
    status: 404,
    message: 'Not Found',
    data: null
  };
  app.post('*/auth/login', function(req, res) {
    login(req, res);
  });
  app.post('*/auth/forgot_password', function(req, res) {
    forgotPassword(req, res);
  });
}

function login(req, res) {
  if (req.body.email && req.body.password) {
    authQuery.validateLogin(req.body.email, req.body.password, function(success, data) {
      if (success) {
        response = {
          status: 200,
          message: 'Success',
          data: data
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
    authQuery.validateEmail(req.body.email, function(success, data) {
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

module.exports = {
  router: router
};
