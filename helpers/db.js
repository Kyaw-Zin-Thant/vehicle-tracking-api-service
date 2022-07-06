const { config } = require("../config/config");
const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
const glob = require("glob");

const db = {};

const { username, password, database } = config.db;
// connect to db
const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
});

// init models and add them to the exported db object
//   const models = glob.sync("./models/*.js");
//   routes.forEach((route) => {
//     require("../users/user.model")(sequelize);
//   });
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Vehicle = require("../models/vehicle.model")(sequelize);
db.Location = require("../models/vehicle.location.model")(sequelize);
module.exports = db;
