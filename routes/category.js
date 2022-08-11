const categoryRoutes = require("express").Router();
const { CategoryController } = require("../controllers");

categoryRoutes.get("/", CategoryController.getCategory);
categoryRoutes.get("/add", CategoryController.createPage);
categoryRoutes.post("/add", CategoryController.create);
categoryRoutes.get("/delete/:id", CategoryController.delete);
categoryRoutes.get("/update/:id", CategoryController.updatePage);
categoryRoutes.post("/update/:id", CategoryController.update);

module.exports = categoryRoutes;
