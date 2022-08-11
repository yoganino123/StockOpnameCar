"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class input extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      input.belongsTo(models.car, { foreignKey: "carId" });
      input.belongsTo(models.category, { foreignKey: "carId" });
      input.belongsToMany(models.output, { through: models.report });
    }
  }
  input.init(
    {
      carId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "input",
    }
  );
  return input;
};
