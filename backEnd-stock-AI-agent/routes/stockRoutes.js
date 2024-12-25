const express = require("express");
const { fetchMultipleStockData } = require("../controllers/stockController");

const router = express.Router();

// Route to fetch multiple stock data for comparison
router.get("/compare", fetchMultipleStockData);

module.exports = router;
