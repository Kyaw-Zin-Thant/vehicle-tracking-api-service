const {
  acceptLocationFromVehicleService,
  getVehicleLocationService,
} = require("../services/location.service");

exports.acceptLocationFromVehicleController = async (req, res, next) => {
  try {
    const { latitude, longitude, imei } = req.body; //imei device unique id
    const response = await acceptLocationFromVehicleService({
      latitude,
      longitude,
      imei,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
exports.getVehicleLocationController = async (req, res, next) => {
  try {
    const {
      latest = false,
      today = false,
      start,
      end,
      vehicleId,
    } = { ...req.params, ...req.query }; //vehicle location filters
    const response = await getVehicleLocationService({
      latest,
      today,
      start,
      end,
      vehicleId,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
