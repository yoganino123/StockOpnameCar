const { car, category } = require("../models");

class CarController {
  static async getCar(req, res) {
    try {
      let cars = await car.findAll({
        include: [category],
        // order: [["id", "asc"]],
      });

      res.json(cars);
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

  static async create(req, res) {
    try {
      const {
        name,
        categoryId,
        cc,
        transmisi,
        year,
        price,
        stock,
        categoryName,
      } = req.body;
      let resultCar = await car.create({
        name,
        categoryId,
        cc,
        transmisi,
        year,
        price,
        stock,
      });
      const [create, created] = await category.findOrCreate({
        where: { id: categoryId },
        defaults: {
          name: categoryName,
        },
      });

      res.json(resultCar);
      //   res.redirect("/fruits");
    } catch (err) {
      res.json(err);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await car.destroy({ where: { id } });
      if (result !== 0) {
        res.json({ message: `Car with id ${id} has been deleted` });
        // res.redirect("/fruits");
      } else {
        res.json({ message: `Car can't be deleted` });
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
      const { id } = req.params;
      const result = await car.update(req.body, { where: { id } });
      if (result[0] !== 0) {
        // res.redirect('/fruits');
        res.json({ message: `Car with id ${id} has been updated` });
      } else {
        res.json({
          message: `Car can't be updated`,
        });
      }
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = CarController;
