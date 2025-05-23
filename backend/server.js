import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import forexRoutes from "./routes/forexRouter.js";
import nationalProdRoutes from "./routes/nationalProdRouter.js";
import miniChartRoutes from "./routes/miniChartRoutes.js";
import regionalProdRoutes from "./routes/regionalProdRouter.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 5001;

connectDB();

const app = express();

const allowedOrigin = process.env.ORIGIN_URL;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// Middleware for parsing incoming requests with json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/forex-forecast", forexRoutes);
app.use("/api/national-prod", nationalProdRoutes);
app.use("/api/regional-prod", regionalProdRoutes);
app.use("/api/mini-charts", miniChartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
