import express from "express";
import { fetchRegionalProdForecast } from "../controllers/forecastController.js";

const router = express.Router();

router.get("/", fetchRegionalProdForecast);

export default router;
