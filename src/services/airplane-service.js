const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = airplaneRepository.create(data);
    return airplane;
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      let explanation = [];
      err.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot create a new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = airplaneRepository.getAll();
    return airplanes;
  } catch (err) {
    throw new AppError(
      "Failed to get the airplanes data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = airplaneRepository.get(id);
    return airplane;
  } catch (err) {
    if (err.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        `No airplane exists with id ${id}`,
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Failed to get airplane data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    const airplane = airplaneRepository.destroy(id);
    return airplane;
  } catch (err) {
    if (err.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        `Failed to delete no airplane exists with id ${id}`,
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Failed to delete airplane data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
};
