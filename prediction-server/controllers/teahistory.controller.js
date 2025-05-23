const Region = require("../models/teahistory.model");

// Create a new region
exports.createRegion = async (req, res) => {
  try {
    const { regionCategory, region, subregion, startDate, endDate } = req.body;
    const newRegion = new Region({
      regionCategory,
      region,
      subregion,
      startDate,
      endDate,
    });
    const saved = await newRegion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all regions
exports.getAllRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single region by ID
exports.getRegionById = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (!region) return res.status(404).json({ message: "Region not found" });
    res.json(region);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a region by ID
exports.deleteRegion = async (req, res) => {
  try {
    const deleted = await Region.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Region not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
