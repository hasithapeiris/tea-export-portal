import mongoose from "mongoose";

const nationalProdSchema = new mongoose.Schema({
  month: String,
  nationalProduction: Number,
});

const NationalProd = mongoose.model("NationalProd", nationalProdSchema);

export default NationalProd;
