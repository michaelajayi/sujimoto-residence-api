"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Contacts", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        isEmail: true,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      availability: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false,
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
    await queryInterface.dropTable("Contacts");
  },
};
