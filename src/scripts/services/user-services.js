
var response = {
  status: 404,
  message: 'Not Found',
  data: null
};

module.exports = {
  router: router
};

function router(req, res) {
  console.log(req.url);
  switch (req.url) {
    case '/user/':
      response = getUserInfo(req, res);
      break;
    case '/user/update/':
      response = updateUserInfo(req, res);
      break;
  }
  res.send(JSON.stringify(response));
}

function getUserInfo(req, res) {
  return {
    status: 200,
    message: 'Invalid User',
    data: null
  };
};

function updateUserInfo(req, res) {
  return {
    status: 200,
    message: 'Invalid User',
    data: null
  };
};
