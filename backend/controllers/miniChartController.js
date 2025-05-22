import MiniChart from "../models/miniChartModel.js";

// Create a new chart
export const createChart = async (req, res) => {
  try {
    const { title, description, label, label2, label3, data } = req.body;
    const newChart = new MiniChart({
      title,
      description,
      label,
      data,
    });
    await newChart.save();
    res
      .status(201)
      .json({ message: "Chart created successfully", chart: newChart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating chart", error: error.message });
  }
};

// Fetch charts (filtered by label if provided)
export const getCharts = async (req, res) => {
  try {
    const { label } = req.query;
    const query = label ? { label } : {};
    const charts = await MiniChart.find(query);
    res.status(200).json(charts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching charts", error: error.message });
  }
};
