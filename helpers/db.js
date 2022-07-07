const { config } = require("../config/config");
const { Sequelize } = require("sequelize");

const db = {};

const { username, password, database } = config.db;
// connect to db
const sequelize = new Sequelize(database, username, password, {
  dialect: "mysql",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Vehicle = require("../models/vehicle.model")(sequelize);
db.Location = require("../models/vehicle.location.model")(sequelize);
db.Vehicle.hasMany(db.Location, { foreignKey: "vehicleId", as: "locations" });
db.Location.belongsTo(db.Vehicle, {
  foreignKey: "vehicleId",
  as: "vehicle",
});
module.exports = db;
