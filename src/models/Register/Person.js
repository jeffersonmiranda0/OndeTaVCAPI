const mongoose = require("mongoose");

const Person = new mongoose.Schema({
  name: String,
  dateAge: Date,
  email: String,
  password: String
});

module.exports = mongoose.model("Person", Person);
