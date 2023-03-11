require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose").default;
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const DB_LINK = process.env.DB_LINK;

const app = express();

const listsRouter = require("./src/routers/lists");
const cardRouter = require("./src/routers/card");

mongoose.set("strictQuery", false);
mongoose.connect(DB_LINK);

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://clovertest.vercel.app",
      "https://clovertest.onrender.com",
    ],
  })
);

app.use("/lists", listsRouter);
app.use("/card", cardRouter);

const start = async function () {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started successfully on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Server has not been started because of error: ${err}`);
  }
};

start();

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).send({
    message: "Fail",
    error: err.message,
  });
}
