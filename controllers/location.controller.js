const {
  acceptLocationFromVehicleService,
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
