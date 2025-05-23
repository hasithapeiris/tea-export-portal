const axios = require("axios");
const TeaPrediction = require("../models/teaprediction.model");

// Fetch and save tea predictions
exports.getTeaPredictions = async (req, res) => {
  try {
    const { periods } = req.body;

    if (!periods) {
      return res.status(400).json({ message: "Periods field is required" });
    }

    // Fetch predictions from external API
    const response = await axios.post(
      `${process.env.FLASH_BACKEND}/tea-project/predict`,
      { periods }
    );

    const teaData = response.data;
    console.log("Received teaData:", teaData);

    if (!teaData || typeof teaData !== "object") {
      return res.status(500).json({
        message: "Invalid response from API",
        error: teaData,
      });
    }

    // Transform API response into a savable format
    const formattedData = Object.entries(teaData).map(([region, data]) => ({
      region,
      data,
    }));

    // Create a new record in the database
    const newRecord = await TeaPrediction.create({
      periods,
      data: formattedData,
    });

    res.status(200).json({
      message: "Data saved successfully",
      data: newRecord, // Send full record
    });
  } catch (error) {
    console.error("Error fetching or saving data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Retrieve all stored predictions
exports.getStoredPredictions = async (req, res) => {
  try {
    const predictions = await TeaPrediction.find().select("_id periods createdAt");

    if (!predictions || predictions.length === 0) {
      return res.status(200).json([]); 
    }

    res.status(200).json(predictions);
  } catch (error) {
    console.error("Error fetching stored data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get tea prediction by ID
exports.getTeaPredictionById = async (req, res) => {
  try {
    const { id } = req.params;
    const prediction = await TeaPrediction.findById(id);

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    res.status(200).json(prediction);
  } catch (error) {
    console.error("Error fetching data by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete tea prediction by ID
exports.deleteTeaPrediction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPrediction = await TeaPrediction.findByIdAndDelete(id);

    if (!deletedPrediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    res
      .status(200)
      .json({ message: "Prediction deleted successfully", deletedPrediction });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
