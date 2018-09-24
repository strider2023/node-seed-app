// Node Module Dependencies
var jwt = require('jsonwebtoken');

//Local Dependencies
var userQuery = require('./../db/sqlite/user-query.js');

var response;

function router(app) {
  response = {
    status: 500,
    message: 'Invalid Token',
    data: null
  };
  app.get('*/user/:userId', function(req, res) {
    jwt.verify(req.headers.token, 'secret', function(err, decoded) {
      if(err || !decoded) {
        res.send(JSON.stringify(response));
      } else {
        console.log(decoded.id + ' ' + req.params.userId);
        if(decoded.id == req.params.userId)
          getUserInfo(req, res);
        else
          res.send(JSON.stringify(response));
      }
    });
  });
  app.put('*/user/update/:userId', function(req, res) {
    updateUserInfo(req, res);
  });
}

function getUserInfo(req, res) {
  if (req.params.userId) {
    userQuery.getUserInfo(req.params.userId, function(success, data) {
      if (success) {
        response = {
          status: 200,
          message: 'Success',
          data: data
        };
      } else {
        response = {
          status: 400,
          message: 'Invalid User.',
          data: null
        };
      }
      res.send(JSON.stringify(response));
    });
  } else {
    res.send(JSON.stringify(response));
  }
};

function updateUserInfo(req, res) {
  if (req.body.firstName && req.params.userId) {
    userQuery.updateUserInfo(req.params.userId, req.body, function(success, data) {
      if (success) {
        response = {
          status: 200,
          message: 'Data updated successfully.',
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

module.exports = {
  router: router
};
