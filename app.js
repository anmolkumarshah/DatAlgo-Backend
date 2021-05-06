const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const interpreterRoutes = require("./routes/interpreter");
const feedbackRoutes = require("./routes/feedback");

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/interprete", interpreterRoutes);
app.use("/feedback", feedbackRoutes);

mongoose
  .connect("mongodb+srv://anmol:datalgo@cluster0.2f4m6.mongodb.net/dalalgo")
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
