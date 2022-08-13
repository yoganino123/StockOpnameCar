const { output, car, category, report } = require("../models");

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

      // res.json(outputs);
      res.render("output/output.ejs", { outputs });
    } catch (err) {
      res.json(err);
    }
  }

  static async createPageOutput(req, res) {
    try {
      const { id } = req.params;
      const cars = await car.findByPk(id, {
        include: [category],
      });
      const categories = await category.findAll();

      // console.log(cars);

      // res.json(cars);
      // console.log(cars);
      res.render("output/outputStock.ejs", { cars, categories });
    } catch (err) {
      res.json(err);
    }
  }

  static async createOutputStock(req, res) {
    try {
      const { id } = req.params;
      const { total } = req.body;
      // create output
      let resultOutput = await output.create({
        carId: id,
        total,
      });
      // create report
      let outputId = resultOutput.id;
      // console.log(outputId);
      let inputId = null;

      let createReport = await report.create({
        inputId,
        outputId,
        carId: id,
      });
      // console.log(createReport);

      // Menambah stock di inven car
      // get old stock
      let findOneCar = await car.findByPk(id);
      let oldStockCar = findOneCar.dataValues.stock;

      // console.log(findOneCar.dataValues);
      // console.log(oldStockCar);

      let updateStockCar = await car.update(
        {
          stock: Number(oldStockCar) - Number(total),
        },
        { where: { id: id } }
      );

      // res.json(resultInput);
      res.redirect("/car/");
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
      let deleteReport = await report.destroy({ where: { outputId: id } });

      if (deleteData !== 0 && deleteReport !== 0) {
        // res.json({
        //   message: `Input with id ${id} has been deleted!, stock ${getStock} has been deleted! and Report has been deleted`,
        // });
        res.redirect("/output");
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
