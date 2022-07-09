const db = require("../helpers/db");
const Sequelize = require("sequelize");
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
