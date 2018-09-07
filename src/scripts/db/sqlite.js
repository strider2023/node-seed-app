// Node Module Dependencies
var sqlite3 = require('sqlite3').verbose();
var path = require('path');

//Local Dependencies
var appConfig = require('./../../config/app-config.js');

//Local Variables
var db;

function openDatabase() {
  if (!db) {
    try {
      db = new sqlite3.Database(appConfig.dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Connected to the database.');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

function closeDatabase() {
  if (db) {
    db.close();
  }
}

function getDatabaseInstance() {
  return db;
}

module.exports = {
  openDatabase: openDatabase,
  closeDatabase: closeDatabase,
  getDatabaseInstance: getDatabaseInstance
};
