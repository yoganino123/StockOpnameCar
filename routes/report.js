const reportRoutes = require("express").Router();
const { ReportController } = require("../controllers");

reportRoutes.get("/", ReportController.getReport);
// reportRoutes.get("/add", ReportController.createPage);
// reportRoutes.post("/add", ReportController.create);
// reportRoutes.get("/delete/:id", ReportController.delete);
// reportRoutes.get("/update/:id", ReportController.updatePage);
// reportRoutes.post("/update/:id", ReportController.update);

module.exports = reportRoutes;
