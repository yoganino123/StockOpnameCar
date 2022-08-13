const { input, category, car, report } = require("../models");

class InputController {
  static async getInput(req, res) {
    try {
      let inputs = await input.findAll({
        include: [
          {
            model: car,
            include: [{ model: category }],
          },
        ],
      });
      // res.json(inputs);
      res.render("input/input.ejs", { inputs });
    } catch (err) {
      res.json(err);
    }
  }

  static async createPageStock(req, res) {
    try {
      const { id } = req.params;
      const cars = await car.findByPk(id, {
        include: [category],
      });
      const categories = await category.findAll();

      // console.log(cars);

      // res.json(cars);
      // console.log(cars);
      res.render("input/inputStock.ejs", { cars, categories });
    } catch (err) {
      res.json(err);
    }
  }

  static async createStock(req, res) {
    try {
      const { id } = req.params;
      const { total } = req.body;
      // create input
      let resultInput = await input.create({
        carId: id,
        total,
      });
      // create report
      let inputId = resultInput.id;
      // console.log(inputId);
      let outputId = null;

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
          stock: Number(oldStockCar) + Number(total),
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
      const getInputStock = await input.findByPk(id);
      let getStock = getInputStock.dataValues.total;
      let carId = getInputStock.dataValues.carId;
      let getCar = await car.findByPk(carId);
      let stockCar = getCar.dataValues.stock;
      // console.log(getStock);

      let updateStockCar = await car.update(
        {
          stock: Number(stockCar) - Number(getStock),
        },
        { where: { id: carId } }
      );

      let deleteData = await input.destroy({ where: { id } });
      let deleteReport = await report.destroy({ where: { inputId: id } });

      if (deleteData !== 0 && deleteReport !== 0) {
        // res.json({
        //   message: `Input with id ${id} has been deleted!, stock ${getStock} has been deleted, Report has been deleted `,
        // });
        res.redirect("/input");
      } else {
        res.json({ message: `Input can't be deleted` });
      }
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = InputController;
