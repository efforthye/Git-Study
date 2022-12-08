'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// database
const TestInfo = require("./test");
const Table1Info = require("./table1");
const db = {TestInfo, Table1Info};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

// database
TestInfo.init(sequelize);
Table1Info.init(sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;