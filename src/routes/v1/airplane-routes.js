const express = require("express");
const { AirplaneController } = require("../../controllers");

const router = express.Router();

router.post("/", AirplaneController.createAirplane);

router.get("/", AirplaneController.getAirplanes);

router.get("/:id", AirplaneController.getAirplane);

router.delete("/:id", AirplaneController.destryAirplane);

module.exports = router;
