var path = require('path');

exports.server = {
  port: '8081'
};

exports.dbPath = path.resolve(__dirname, '../databases/seed-app.db')
