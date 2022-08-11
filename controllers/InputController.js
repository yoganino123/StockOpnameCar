const { input, category, car } = require("../models");

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

      res.json(inputs);
      //   res.render("fruits/fruits.ejs", { fruits });
    } catch (err) {
      res.json(err);
    }
  }

  static async createPageStock(req, res) {
    try {
    } catch (err) {
      res.json(err);
    }
  }

  static async createStock(req, res) {
    try {
      const { carId, categoryId, total } = req.body;
      let resultInput = await input.create({
        carId: carId,
        categoryId: categoryId,
        total: total,
      });

      let findOneCar = await car.findByPk(carId);
      let oldStockCar = findOneCar.dataValues.stock;

      // console.log(findOneCar.dataValues);
      // console.log(oldStockCar);

      let updateStockCar = await car.update(
        {
          stock: Number(oldStockCar) + Number(total),
        },
        { where: { id: carId } }
      );

      res.json(resultInput);
      //   res.redirect("/fruits");
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

      if (deleteData !== 0) {
        res.json({
          message: `Input with id ${id} has been deleted and stock ${getStock} has been deleted`,
        });
        // res.redirect("/fruits");
      } else {
        res.json({ message: `Input can't be deleted` });
      }
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = InputController;
