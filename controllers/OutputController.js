const { output, car, category } = require("../models");

class OutputController {
  static async getOutput(req, res) {
    try {
      let outputs = await output.findAll({
        include: [
          {
            model: car,
            include: [{ model: category }],
          },
        ],
      });

      res.json(outputs);
      //   res.render("fruits/fruits.ejs", { fruits });
    } catch (err) {
      res.json(err);
    }
  }

  static async createPage(req, res) {
    try {
    } catch (err) {
      res.json(err);
    }
  }

  static async createOutputStock(req, res) {
    try {
      const { carId, total } = req.body;
      let resultInput = await output.create({
        carId: carId,

        total: total,
      });

      let findOneCar = await car.findByPk(carId);
      let oldStockCar = findOneCar.dataValues.stock;

      // console.log(findOneCar.dataValues);
      // console.log(oldStockCar);

      let updateStockCar = await car.update(
        {
          stock: Number(oldStockCar) - Number(total),
        },
        { where: { id: carId } }
      );

      res.json(resultInput);
    } catch (err) {
      res.json(err);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const getOutputStock = await output.findByPk(id);
      let getStock = getOutputStock.dataValues.total;
      let carId = getOutputStock.dataValues.carId;
      let getCar = await car.findByPk(carId);
      let stockCar = getCar.dataValues.stock;
      // console.log(getCar);

      let updateStockCar = await car.update(
        {
          stock: Number(stockCar) + Number(getStock),
        },
        { where: { id: carId } }
      );

      let deleteData = await output.destroy({ where: { id } });

      if (deleteData !== 0) {
        res.json({
          message: `Input with id ${id} has been deleted and stock ${getStock} has been deleted`,
        });
      }
    } catch (err) {
      res.json(err);
    }
  }

  static async updatePage(req, res) {
    try {
    } catch (err) {
      res.json(err);
    }
  }

  static async update(req, res) {
    try {
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = OutputController;
