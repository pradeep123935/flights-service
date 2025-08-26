const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = airportRepository.create(data);
    return airport;
  } catch (err) {
    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      err.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot create a new Airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airport = airportRepository.getAll();
    return airport;
  } catch (err) {
    throw new AppError(
      "Failed to get the airport data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = airportRepository.get(id);
    return airport;
  } catch (err) {
    if (err.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        `No airport exists with id ${id}`,
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Failed to get airport data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    const airport = airportRepository.destroy(id);
    return airport;
  } catch (err) {
    if (err.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        `Failed to delete no airport exists with id ${id}`,
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Failed to delete airport data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
};
