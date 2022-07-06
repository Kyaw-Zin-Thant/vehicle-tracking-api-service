const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const glob = require("glob");
// const { checkToken } = require("./controllers/middleware.controller");
const { config } = require("./config/config");
const { errorHandler } = require("./services/error.handler.service");
const db = require("./helpers/db");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "AUTHORIZATION, Origin, X-Requested-With, Content-Type, Accept, USERNAME, PASSWORD, APIKEY, SECRETKEY, API_KEY, SECRET_KEY, OWNERID, BookID, File,USERACCESSTOKEN"
  );
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0");
  next();
});

//miidleware
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(checkToken);

app.use("/public", express.static("public"));
// error handling

const routes = glob.sync("./routes/*.js");

routes.forEach((route) => {
  require(route).default(app);
});
app.use(errorHandler);
app.set("trust proxy", true);
db.sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`A NOde js API is listening in port:${config.port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect db: " + err.message);
  });
