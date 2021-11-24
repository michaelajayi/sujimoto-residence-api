'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Please include a valid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password is required",
          }
        }
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
    await queryInterface.dropTable('Users');
  }
};