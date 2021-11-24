"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init(
    {
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
    },
    {
      sequelize,
      modelName: "Contact",
    }
  );
  return Contact;
};
