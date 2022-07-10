const db = require("../helpers/db");
const Sequelize = require("sequelize");
const moment = require("moment");
const Op = Sequelize.Op;
exports.acceptLocationFromVehicleService = async ({
  latitude,
  longitude,
  imei,
}) => {
  try {
    const vehicle = await db.Vehicle.findOne({ where: { imei } });
    if (vehicle) {
      const location = new db.Location({
        latitude,
        longitude,
        vehicleId: vehicle.id,
      });
      //save new location and update in vehicle for latest location
      await Promise.all([
        location.save(),
        db.Vehicle.update(
          { latitude, longitude },
          {
            where: { id: vehicle.id },
          }
        ),
      ]);
      return { message: "Successfully Created" };
    } else {
      const err = new Error();
      err.message = "Your device doesn't exit in the system ";
      err.status = 404;
      throw err;
    }
  } catch (error) {
    throw error;
  }
};
exports.getVehicleLocationService = async ({
  latest,
  today,
  start,
  end,
  vehicleId,
}) => {
  try {
    let vehicleLocations;
    let todayDate = new Date();

    let queryData = {
      attributes: [
        "id",
        "latitude",
        "longitude",
        "vehicle.vehiclename",
        "createdAt",
      ],
      where: { vehicleId },
      include: [{ model: db.Vehicle, as: "vehicle" }],
    };
    if (today) {
      let startTime = todayDate.setHours(0, 0, 0, 0);
      let endTime = todayDate.setHours(23, 59, 59, 59);
      queryData.where.createdAt = {
        [Op.gt]: moment(startTime).format("YYYY-MM-DD HH:mm:ss"),
        [Op.lt]: moment(endTime).format("YYYY-MM-DD HH:mm:ss"),
      };
    } else if (latest) {
      queryData.limit = 1;
      queryData.order = [["createdAt", "asc"]];
    } else if (start && end) {
      queryData.where.createdAt = {
        [Op.gt]: moment(start).format("YYYY-MM-DD HH:mm:ss"),
        [Op.lt]: moment(end).format("YYYY-MM-DD HH:mm:ss"),
      };
    }
    vehicleLocations = await db.Location.findAll(queryData);
    return vehicleLocations;
  } catch (error) {
    throw error;
  }
};
