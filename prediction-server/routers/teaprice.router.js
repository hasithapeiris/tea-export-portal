const express = require('express');
const teapriceController = require("../controllers/teaprice.controller");
const router = express.Router();

// Get tea price details
router.post('/getTeaPrice', teapriceController.getTeaPriceDetails);

// Fetching the first 10 records
router.get('/getFirstTenRecords', teapriceController.getFirstTenRecords);

module.exports = router;
