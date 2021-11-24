"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Properties", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      description: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Properties");
  },
};
