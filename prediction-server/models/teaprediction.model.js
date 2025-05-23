const mongoose = require("mongoose");

const TeaPredictionSchema = new mongoose.Schema(
  {
    periods: { type: Number, required: true },
    data: [
      {
        region: {
          type: String,
          required: true,
        },
        data: [
          {
            date: {
              type: String,
              required: true,
            },
            predicted_price: {
              type: Number,
              required: true,
            },
            lower_bound: {
              type: Number,
              required: true,
            },
            upper_bound: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeaPrediction", TeaPredictionSchema);
