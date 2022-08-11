"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      report.belongsTo(models.car, { foreignKey: "carId" });
      report.belongsTo(models.input);
      report.belongsTo(models.output);
    }
  }
  report.init(
    {
      inputId: DataTypes.INTEGER,
      outputId: DataTypes.INTEGER,
      carId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "report",
    }
  );
  return report;
};
