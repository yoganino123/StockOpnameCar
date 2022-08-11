const carRoutes = require("express").Router();
const { CarController } = require("../controllers");

carRoutes.get("/", CarController.getCar);
carRoutes.get("/add", CarController.createPage);
carRoutes.post("/add", CarController.create);
carRoutes.get("/delete/:id", CarController.delete);
carRoutes.get("/update/:id", CarController.updatePage);
carRoutes.post("/update/:id", CarController.update);

module.exports = carRoutes;
