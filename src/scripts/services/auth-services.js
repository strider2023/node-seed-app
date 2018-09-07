//Local Dependencies
var authQuery = require('./../db/sqlite/auth-query.js');

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
    authQuery.validateLogin(req.body.email, req.body.password, function(success) {
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
    authQuery.validateEmail(req.body.email, function(success) {
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
