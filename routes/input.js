const inputRoutes = require("express").Router();
const { InputController } = require("../controllers");

inputRoutes.get("/", InputController.getInput);
inputRoutes.get("/add", InputController.createPageStock);
inputRoutes.post("/addStock", InputController.createStock);
inputRoutes.get("/delete/:id", InputController.delete);

module.exports = inputRoutes;
