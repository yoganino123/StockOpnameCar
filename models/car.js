"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car.belongsTo(models.category);
      car.hasMany(models.input);
      car.hasMany(models.output);
      car.hasMany(models.report);
    }
  }
  car.init(
    {
      name: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      cc: DataTypes.INTEGER,
      transmisi: DataTypes.STRING,
      year: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "car",
    }
  );
  return car;
};
