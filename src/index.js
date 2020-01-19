const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const middleware = require("./middleware");

const app = express();

mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
// app.use(middleware);
app.use(routes);

app.listen(3333);
