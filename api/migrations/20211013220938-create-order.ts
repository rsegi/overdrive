"use strict";
module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      postalcode: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable("Orders");
  },
};
