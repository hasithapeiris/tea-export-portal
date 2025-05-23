import express from "express";
import { fetchNationalProdForecast } from "../controllers/forecastController.js";

const router = express.Router();

router.get("/", fetchNationalProdForecast);

export default router;
