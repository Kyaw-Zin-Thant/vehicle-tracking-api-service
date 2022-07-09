const express = require("express");
const {
  acceptLocationFromVehicleController,
} = require("../controllers/location.controller");

const router = express.Router();
const baseURL = "/api/v1";

/**
 * route accept sending location data from vehicle
 */
router.route(`${baseURL}/location`).post(acceptLocationFromVehicleController);

exports.default = (app) => {
  app.use("/", router);
};
