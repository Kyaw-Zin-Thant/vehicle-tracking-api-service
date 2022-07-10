const express = require("express");
const {
  acceptLocationFromVehicleController,
  getVehicleLocationController,
} = require("../controllers/location.controller");

const router = express.Router();
const baseURL = "/api/v1";

/**
 * route accept sending location data from vehicle
 */
router.route(`${baseURL}/location`).post(acceptLocationFromVehicleController);

/*
vehicle location 
 */
router
  .route(`${baseURL}/location/:vehicleId`)
  .get(getVehicleLocationController);

exports.default = (app) => {
  app.use("/", router);
};
