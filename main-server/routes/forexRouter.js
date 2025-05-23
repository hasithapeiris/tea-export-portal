import express from "express";
import { fetchForexForecast } from "../controllers/forecastController.js";

const router = express.Router();

router.get("/", fetchForexForecast);

export default router;
