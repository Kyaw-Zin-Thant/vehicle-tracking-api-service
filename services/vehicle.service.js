const db = require("../helpers/db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//get all registered vehicles
exports.getVehicleService = async ({
  search,
  page,
  limit,
  sortDirection,
  sortColumn,
}) => {
  try {
    const skip = (page - 1) * limit;
    sortDirection = sortDirection.toUpperCase();
    // query param
    let queryData = search
      ? {
          offset: skip,
          limit,
          order: [[sortColumn, sortDirection]],
          where: {
            vehiclename: {
              [Op.eq]: search,
            },
          },
        }
      : {
          offset: skip,
          limit,
          order: [[sortColumn, sortDirection]],
        };
    const vehicles = await db.Vehicle.findAll(queryData);
    return { vehicles };
  } catch (error) {
    throw error;
  }
};

//register vehicle
exports.createVehicleService = async ({ vehiclename, imei }) => {
  try {
    //check duplicate and return error message
    if (await db.Vehicle.findOne({ where: { imei } })) {
      const err = new Error();
      err.message = 'IMEI  "' + imei + '" is already registered';
      err.status = 400;
      throw err;
    }
    //save data
    const vehicle = new db.Vehicle({ vehiclename, imei });
    await vehicle.save();
    return { message: "Successfully Registered", vehicleId: vehicle.id };
  } catch (error) {
    throw error;
  }
};

//detail vehicle
exports.detailVehicleService = async ({ vehicleId }) => {
  try {
    const vehicle = await db.Vehicle.findOne({
      where: { id: vehicleId },
      include: [{ model: db.Location, as: "locations" }],
    });
    return { vehicle };
  } catch (error) {
    throw error;
  }
};

//update vehicle
exports.updateVehicleService = async ({ vehicleId, vehiclename, imei }) => {
  try {
    await db.Vehicle.update(
      { vehiclename, imei },
      {
        where: { id: vehicleId },
      }
    );
    return { message: "Successfully Updated" };
  } catch (error) {
    throw error;
  }
};

//delete vehicle
exports.deleteVehicleService = async ({ vehicleId }) => {
  try {
    await db.Vehicle.destroy({
      where: { id: vehicleId },
    });
    return { message: "Successfully Deleted" };
  } catch (error) {
    throw error;
  }
};
