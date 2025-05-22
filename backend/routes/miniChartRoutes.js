import express from "express";
import { createChart, getCharts } from "../controllers/miniChartController.js";

const router = express.Router();

router.route("/").post(createChart).get(getCharts);

export default router;
