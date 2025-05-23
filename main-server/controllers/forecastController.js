import Forex from "../models/forexModel.js";
import NationalProd from "../models/nationalProdModel.js";
import RegionalProd from "../models/regionalProdModel.js";

// Fetch all forecasted forex data
export const fetchForexForecast = async (req, res) => {
  try {
    const forecasts = await Forex.find().sort({ month: 1 });
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all forecasted national production data
export const fetchNationalProdForecast = async (req, res) => {
  try {
    const forecasts = await NationalProd.find().sort({ month: 1 });
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all forecasted regional production data
export const fetchRegionalProdForecast = async (req, res) => {
  try {
    const forecasts = await RegionalProd.find().sort({ month: 1 });
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
