//Local Dependencies
var authServices = require('./../services/auth-services.js');
var userServices = require('./../services/user-services.js');

function routRequests(app) {
  // Health Check API
  app.get('/health_check', function(req, res) {
    res.send('Server Running');
  });
  // Authentication API Block
  authServices.router(app);
  // User API Block
  userServices.router(app);

  //
  // app.post('/file_upload', function(req, res) {
  //   console.log(req.files[0].originalname);
  //   console.log(req.files[0].path);
  //   console.log(req.files[0].mimetype);
  //   var file = __dirname + "/" + req.files[0].destination + "/" + req.files[0].originalname;
  //
  //   fs.readFile(req.files[0].destination, function(err, data) {
  //     fs.writeFile(file, data, function(err) {
  //       if (err) {
  //         console.log(err);
  //         response = {
  //           message: 'File uploaded error',
  //           filename: req.files[0].originalname
  //         };
  //       } else {
  //         response = {
  //           message: 'File uploaded successfully',
  //           filename: req.files[0].originalname
  //         };
  //       }
  //       console.log(response);
  //       res.end(JSON.stringify(response));
  //     });
  //   });
  // });
}

module.exports = {
  routRequests: routRequests
};
