const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
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
  return Location;
};
