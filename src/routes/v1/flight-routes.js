const express = require("express");
const { FlightController } = require("../../controllers");

const router = express.Router();

router.post("/", FlightController.createFlight);

router.get("/", FlightController.getAllFlights);

module.exports = router;
