const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = cityRepository.create(data);
    return city;
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
      "cannot create a new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(id) {
  try {
    const city = cityRepository.destroy(id);
    return city;
  } catch (err) {
    if (err.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        `Failed to delete no city exists with id ${id}`,
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Failed to delete city data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  destroyCity,
};
