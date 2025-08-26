const CrudRepository = require("./crud-repository");
const { Flight } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sortFields) {
    const response = await this.model.findAll({
      where: filter,
      order: sortFields,
    });
    return response;
  }
}

module.exports = FlightRepository;
