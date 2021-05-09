const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const interpreterRoutes = require("./routes/interpreter");
const feedbackRoutes = require("./routes/feedback");
const authRoutes = require("./routes/auth");

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
app.use("/auth", authRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.2f4m6.mongodb.net/${process.env.MONGO_DATABASE}`
  )
  .then((result) => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.info(`listening to ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    res
      .status(404)
      .json({ error: true, message: "error in connecting to database" });
  });
