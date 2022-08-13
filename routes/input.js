const inputRoutes = require("express").Router();
const { InputController } = require("../controllers");

inputRoutes.get("/", InputController.getInput);
inputRoutes.get("/addStock/:id", InputController.createPageStock);
inputRoutes.post("/addStock/:id", InputController.createStock);
inputRoutes.get("/delete/:id", InputController.delete);

module.exports = inputRoutes;
