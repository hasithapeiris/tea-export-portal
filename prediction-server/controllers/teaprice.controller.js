const TeaPrice = require("../models/teaprice.model");

// Get the tea price details
exports.getTeaPriceDetails = async (req, res) => {
  const { TeaRegion, SubDistrict, startDate, endDate } = req.body;

  try {
    const query = { TeaRegion, SubDistrict };

    if (startDate && endDate) {
      query.Year = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query.Year = { $gte: startDate };
    } else if (endDate) {
      query.Year = { $lte: endDate };
    }
    const teaData = await TeaPrice.find(query).sort({ Year: -1 });

    if (!teaData || teaData.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json(teaData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get the first 10 tea price records
exports.getFirstTenRecords = async (req, res) => {
  try {
    // Fetch the first 10 records from the database
    const teaData = await TeaPrice.find().limit(10);

    if (!teaData || teaData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the details of the first 10 records
    res.json(teaData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
