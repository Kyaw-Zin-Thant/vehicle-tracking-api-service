const {
  getVehicleService,
  createVehicleService,
  detailVehicleService,
  updateVehicleService,
  deleteVehicleService,
} = require("../services/vehicle.service");

//get all registered vehicles
exports.getVehicleController = async (req, res, next) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      sortDirection = "desc",
      sortColumn = "createdAt",
    } = req.query;
    const response = await getVehicleService({
      search,
      page,
      limit,
      sortDirection,
      sortColumn,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

//register vehicle
exports.createVehicleController = async (req, res, next) => {
  try {
    const { vehiclename, imei } = req.body;
    const response = await createVehicleService({ vehiclename, imei });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

//detail vehicle
exports.detailVehicleController = async (req, res, next) => {
  try {
    const { vehicleId } = req.params;
    const response = await detailVehicleService({ vehicleId });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

//update vehicle
exports.updateVehicleController = async (req, res, next) => {
  try {
    const { vehicleId, vehiclename, imei } = { ...req.params, ...req.body };
    const response = await updateVehicleService({
      vehicleId,
      vehiclename,
      imei,
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

//delete vehicle
exports.deleteVehicleController = async (req, res, next) => {
  try {
    const { vehicleId } = req.params;
    const response = await deleteVehicleService({ vehicleId });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
