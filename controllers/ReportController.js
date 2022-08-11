const { report, input, output } = require("../models");

class ReportController {
  static async getReport(req, res) {
    try {
      let getDatReport = await report.findAll({
        include: [input, output],
      });
      res.json(getDatReport);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = ReportController;
