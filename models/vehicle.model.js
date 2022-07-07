const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Vehicle = sequelize.define("Vehicle", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vehiclename: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    imei: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Vehicle;
};
