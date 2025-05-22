import mongoose from "mongoose";

const forexSchema = new mongoose.Schema({
  month: String,
  forecastedFee: Number,
});

const Forex = mongoose.model("Forex", forexSchema);

export default Forex;
