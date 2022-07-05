const config = require("../config/config");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const glob = require("glob");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.db;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  // init models and add them to the exported db object
  //   const models = glob.sync("./models/*.js");
  //   routes.forEach((route) => {
  //     require("../users/user.model")(sequelize);
  //   });
  db.Vehicle = require("../models/vehicle.model")(sequelize);
  db.Location = require("../models/vehicle.location.model")(sequelize);
  // sync all models with database
  await sequelize.sync({ alter: true });
}
