const route = require("express").Router();

route.get("/", (req, res) => {
  // res.json({
  //   message: "Home Page",
  // });
  res.render("index.ejs");
});

const carRoutes = require("./car");
const categoryRoutes = require("./category");
const inputRoutes = require("./input");
const outputRoutes = require("./output");
const reportRoutes = require("./report");

route.use("/car", carRoutes);
route.use("/category", categoryRoutes);
route.use("/input", inputRoutes);
route.use("/output", outputRoutes);
route.use("/report", reportRoutes);

module.exports = route;
