"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Visitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Visitor.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        required: true,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Visitor",
    }
  );
  return Visitor;
};
