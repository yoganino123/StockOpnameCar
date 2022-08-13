const { car, category, input, output, report } = require("../models");

class CarController {
  static async getCar(req, res) {
    try {
      let cars = await car.findAll({
        include: [category],
        order: [["id", "asc"]],
      });
      // let categorys = await category.findAll();
      // let cat = categorys.dataValues;
      // console.log(cat);

      // res.json(cars);
      res.render("car/carInven.ejs", { cars });
    } catch (err) {
      res.json(err);
    }
  }

  static async createPage(req, res) {
    try {
      const categories = await category.findAll();
      // console.log(categories);
      res.render("car/addNewCar.ejs", { categories });
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

      // If New Category
      if (categoryId === "new") {
        // Create Category
        const newCategoryName = await category.create({
          name: categoryName,
        });
        // create Car
        let resultCar = await car.create({
          name,
          categoryId: newCategoryName.id,
          cc,
          transmisi,
          year,
          price,
          stock,
        });
        // Create Input

        let carId = resultCar.id;
        // console.log(carId);
        let total = stock;

        let createInputId = await input.create({
          carId,
          total,
        });
        // Create Report
        let inputId = createInputId.id;
        let outputId = null;

        let createReport = await report.create({
          inputId,
          outputId,
          carId,
        });

        // res.json(resultInput);
        res.redirect("/car");
      } else {
        // Else ( ada id category nya)
        // Create Car
        let resultCar = await car.create({
          name,
          categoryId,
          cc,
          transmisi,
          year,
          price,
          stock,
        });
        // Create Input
        let carId = resultCar.id;
        let total = stock;

        let createInputId = await input.create({
          carId,
          total,
        });
        // Create Report
        let inputId = createInputId.id;
        let outputId = null;

        let createReport = await report.create({
          inputId,
          outputId,
          carId,
        });
        res.redirect("/car");
      }
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
      const { id } = req.params;
      const cars = await car.findByPk(id, {
        include: [category],
      });
      const categories = await category.findAll();

      // console.log(cars);

      // res.json(cars);
      // console.log(cars);
      res.render("car/carUpdate.ejs", { cars, categories });
    } catch (err) {
      res.json(err);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, categoryId, transmisi, year, price, stock } = req.body;
      // let [createCate, createdCate] = await category.findOrCreate({
      //   where: {
      //     name: categoryName,
      //   },
      // });
      // let categoryId = createCate.dataValues.id;
      // console.log(categoryId);

      const result = await car.update(
        {
          name: name,
          categoryId: categoryId,
          transmisi: transmisi,
          year: year,
          price: price,
          stock: stock,
        },
        {
          where: { id },
        }
      );
      res.redirect("/car");

      // if (result[0] !== 0) {
      //   res.redirect("/car");
      //   // res.json({ message: `Car with id ${id} has been updated` });
      // } else {
      //   res.json({
      //     message: `Car can't be updated`,
      //   });
      // }
    } catch (err) {
      res.json(err);
    }
  }

  static async getAllReports(req, res) {
    try {
      const { id } = req.params;
      let getCar = await report.findAll({
        where: {
          carId: id,
        },
        include: [car],
      });

      let reports = await report.findAll({
        where: {
          carId: id,
        },
        include: [input, output],
      });
      let result = {
        ...getCar[0].car.dataVelues,
        reports,
      };
      // console.log(get);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = CarController;
