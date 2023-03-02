"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the data type of the "description" column to LONGTEXT
    await queryInterface.changeColumn("Books", "description", {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the change to the "description" column
    await queryInterface.changeColumn("Books", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
};
