const outputRoutes = require("express").Router();
const { OutputController } = require("../controllers");

outputRoutes.get("/", OutputController.getOutput);
outputRoutes.get("/add", OutputController.createPage);
outputRoutes.post("/addOutput", OutputController.createOutputStock);
outputRoutes.get("/delete/:id", OutputController.delete);
outputRoutes.get("/update/:id", OutputController.updatePage);
outputRoutes.post("/update/:id", OutputController.update);

module.exports = outputRoutes;
