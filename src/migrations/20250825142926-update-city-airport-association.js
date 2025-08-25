"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Airports", {
      type: "FOREIGN KEY",
      name: "airports_fkey_constrant",
      fields: ["cityId"],
      references: {
        table: "Cities",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDELETE: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
