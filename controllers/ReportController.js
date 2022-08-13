const { report, input, output, car, category } = require("../models");

class ReportController {
  static async getReport(req, res) {
    try {
      let getDataReport = await report.findAll({
        include: [car, input, output],
        attributes: ["id", "carId", "inputId", "outputId", "updatedAt"],
      });
      // console.log(getDataReport);
      // res.json(getDataReport);
      res.render("report/report.ejs", { getDataReport });
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = ReportController;
