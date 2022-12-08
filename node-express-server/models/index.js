'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// database test
const TestInfo = require("./test");
const Table1Info = require("./table1");
// database
const UserInfo = require("./user");
const BoardInfo = require("./board");
const CommentInfo = require("./comment");
const db = {TestInfo, Table1Info, UserInfo, BoardInfo, CommentInfo};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

// database test
TestInfo.init(sequelize);
Table1Info.init(sequelize);
// database
UserInfo.init(sequelize);
BoardInfo.init(sequelize);
CommentInfo.init(sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;