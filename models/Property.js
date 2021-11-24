"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Amenity }) {
      // define association here
      // this.belongsToMany(Amenity, {
      //   through: "properties_amenities",
      //   foreignKey: "amenityId",
      // });
    }
  }
  Property.init(
    {
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
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
