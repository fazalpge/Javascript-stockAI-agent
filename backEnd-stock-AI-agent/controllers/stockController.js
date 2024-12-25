const { getStockData } = require("../utils/alphaVantage");

// Fetch multiple stock data for comparison
const fetchMultipleStockData = async (req, res) => {
  const { symbols, interval } = req.query;

  if (!symbols || !interval) {
    return res.status(400).json({ error: "Stock symbols and interval are required." });
  }

  try {
    const symbolsArray = symbols.split(",");
    const promises = symbolsArray.map((symbol) => getStockData(symbol, interval));
    const results = await Promise.all(promises);

    const formattedData = symbolsArray.reduce((acc, symbol, index) => {
      acc[symbol] = results[index];
      return acc;
    }, {});

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchMultipleStockData };
