const express = require("express");
const router = express.Router();
const teaController = require("../controllers/teaprediction.controller");

// Fetch, save, and return tea predictions
router.post("/predict", teaController.getTeaPredictions);

// Get all stored predictions
router.get("/predictions", teaController.getStoredPredictions);

// Get specific prediction by ID
router.get("/predictions/:id", teaController.getTeaPredictionById);

// Delete prediction by ID
router.delete("/predictions/:id", teaController.deleteTeaPrediction);

module.exports = router;
