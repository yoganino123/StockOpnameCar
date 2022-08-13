require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const routes = require("./routes");
app.use(routes);

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
