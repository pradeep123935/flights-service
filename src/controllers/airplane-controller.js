const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (err) {
    ErrorResponse.error = err;
    return res.status(err.statusCode).json(ErrorResponse);
  }
}

async function getAirplanes(req, res) {
  try {
    const airplane = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    ErrorResponse.error = err;
    return res.status(err.statusCode).json(ErrorResponse);
  }
}

async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    ErrorResponse.error = err;
    return res.status(err.statusCode).json(ErrorResponse);
  }
}

async function destryAirplane(req, res) {
  try {
    const airplane = await AirplaneService.destroyAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    ErrorResponse.error = err;
    return res.status(err.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplane,
  getAirplanes,
  destryAirplane,
};
