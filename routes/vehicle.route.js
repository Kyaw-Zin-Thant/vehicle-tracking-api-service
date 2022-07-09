const express = require("express");
const {
  getVehicleController,
  createVehicleController,
  detailVehicleController,
  updateVehicleController,
  deleteVehicleController,
} = require("../controllers/vehicle.controller");

const router = express.Router();
const baseURL = "/api/v1";

/**
 * vehicle get & register
 */
router
  .route(`${baseURL}/vehicle`)
  .get(getVehicleController)
  .post(createVehicleController);
/**
 * vehicle detail,update,delete
 */
router
  .route(`${baseURL}/vehicle/:vehicleId`)
  .get(detailVehicleController)
  .put(updateVehicleController)
  .delete(deleteVehicleController);
exports.default = (app) => {
  app.use("/", router);
};
