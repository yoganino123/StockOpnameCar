const { category } = require("../models");

class CategoryController {
  static async getCategory(req, res) {
    try {
      let categories = await category.findAll();

      res.json(categories);
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
      const { name } = req.body;
      let resultCategory = await category.create({
        name,
      });

      res.json(resultCategory);
      //   res.redirect("/fruits");
    } catch (err) {
      res.json(err);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await category.destroy({ where: { id } });
      if (result !== 0) {
        res.json({ message: `Category with id ${id} has been deleted` });
      } else {
        res.json({ message: `Category can't be deleted` });
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
      const result = await category.update(req.body, { where: { id } });
      if (result[0] !== 0) {
        // res.redirect('/fruits');
        res.json({ message: `Category with id ${id} has been updated` });
      } else {
        res.json({
          message: `Category can't be updated`,
        });
      }
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = CategoryController;
