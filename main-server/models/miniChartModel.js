import mongoose from "mongoose";

const miniChartSchema = new mongoose.Schema({
  title: String,
  description: String,
  label: String,
  data: [],
});

const MiniChart = mongoose.model("MiniChart", miniChartSchema);

export default MiniChart;
