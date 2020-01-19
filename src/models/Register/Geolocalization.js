const mongoose = require("mongoose");

const PointSchema = require("./../utils/PointSchema");

const Geolocalization = new mongoose.Schema({
  idUser: String,
  location: {
    type: PointSchema,
    index: "2dsphere"
  }
});

module.exports = mongoose.model("Geolocalization", Geolocalization);
