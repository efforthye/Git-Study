'use strict';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';

// const config = require(__dirname + '/../config/config.json')[env];
import Config from '../config/config.json' assert { type: 'json' };
const config = (__dirname+Config)[env];

// database table
const db = {};

// database 연결
let sequelize = new Sequelize(config.database, config.username, config.password, config);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// module.exports = db;
export default db;



// database table 추가 : https://alencion.tistory.com/48 참고
// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define('user', {
//       useremail: {
//       /* column 속성들 */
//           type: DataTypes.STRING(20),
//           allowNull: false,
//           unique: true,
//       /*   여기까지    */
//       },
//       password: {
//           type: DataTypes.STRING(100),
//           allowNull: false,
//       },
//       name: {
//           type: DataTypes.STRING(10),
//           allowNull: false,
//       },
//   },{
//       timestamps:false,
//   });
// }