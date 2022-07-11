const express = require("express");
const {
  getVehicleController,
  createVehicleController,
  detailVehicleController,
  updateVehicleController,
  deleteVehicleController,
} = require("../controllers/vehicle.controller");
const { checkApiKey } = require("../middlewares/middleware.controller");

const router = express.Router();
const baseURL = "/api/v1";

/**
 * vehicle get & register
 */
router
  .route(`${baseURL}/vehicle`)
  .get(checkApiKey, getVehicleController)
  .post(checkApiKey, createVehicleController);
/**
 * vehicle detail,update,delete
 */
router
  .route(`${baseURL}/vehicle/:vehicleId`)
  .get(checkApiKey, detailVehicleController)
  .put(checkApiKey, updateVehicleController)
  .delete(checkApiKey, deleteVehicleController);
exports.default = (app) => {
  app.use("/", router);
};
