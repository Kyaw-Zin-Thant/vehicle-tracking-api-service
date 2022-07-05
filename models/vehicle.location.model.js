const { DataTypes } = require("sequelize");

const Location = sequelize.define("Location", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  latitude: {
    type: DataTypes.STRING,
  },
  longitude: {
    type: DataTypes.STRING,
  },
});
Location.associate = (models) => {
  Location.belongsTo(models.Vehicle, {
    foreignKey: "vehicleId",
  });
};
module.exports = Location;
