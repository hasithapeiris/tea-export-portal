const express = require('express');
const router = express.Router();
const controller = require('../controllers/teahistory.controller');

// Create a new region
router.post('/', controller.createRegion);

// Get all regions
router.get('/', controller.getAllRegions);

// Get a single region by ID
router.get('/:id', controller.getRegionById);

// Delete a region by ID
router.delete('/:id', controller.deleteRegion);

module.exports = router;
