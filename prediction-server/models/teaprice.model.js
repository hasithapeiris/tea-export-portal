const mongoose = require("mongoose");

const TeaPriceSchema = new mongoose.Schema({
  Year: {
    type: String,
    required: true,
  },
  TeaRegion: {
    type: String,
    required: true,
  },
  SubDistrict: {
    type: String,
    required: true,
  },
  MonthPrice: {
    type: Number,
    required: true,
  },
  CumulativePrice: {
    type: Number,
    required: true,
  },
});

const TeaPrice = mongoose.model("TeaPrice", TeaPriceSchema);

module.exports = TeaPrice;
