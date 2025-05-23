import mongoose from "mongoose";

const regionalProdSchema = new mongoose.Schema({
  month: String,
  lowGrownProduction: Number,
  midGrownProduction: Number,
  highGrownProduction: Number,
});

const RegionalProd = mongoose.model("RegionalProd", regionalProdSchema);

export default RegionalProd;
