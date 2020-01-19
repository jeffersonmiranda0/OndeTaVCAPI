const mongoose = require("mongoose");

const Token = new mongoose.Schema({
  idUser: String,
  value: String,
  expire: Date
});

module.exports = mongoose.model("Token", Token);
