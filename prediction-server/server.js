const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// Import routes
const teapredictionRoute = require("./routers/teaprediction.router");
const teapriceRoute = require("./routers/teaprice.router");
const teahistoryRoute = require("./routers/teahistory.router");

// App Config
const app = express();
const PORT = process.env.PORT;

// MongoDB Config
const URI = process.env.MONGODB;
mongoose
  .connect(URI, { dbName: "mydatabase" })
  .then(() => console.log("✅ Database is connected"))
  .catch((err) => console.error("❌ Database connection error:", err));

const allowedOrigin = process.env.ORIGIN_URL;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/tea", teapredictionRoute);
app.use("/api/teaprice", teapriceRoute);
app.use("/api/teahistory", teahistoryRoute);

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
