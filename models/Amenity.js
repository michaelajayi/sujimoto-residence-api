"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Amenity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Property }) {
      // define association here
    }
  }
  Amenity.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      type: {
        type: DataTypes.ENUM("free", "paid"),
        defaultValue: "free",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Amenity",
    }
  );
  return Amenity;
};
