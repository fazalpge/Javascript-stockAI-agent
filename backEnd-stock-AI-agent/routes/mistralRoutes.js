const express = require("express");
const { askMistral } = require("../utils/mistralService");

const router = express.Router();

// Route to ask Mistral AI
router.post("/ask", async (req, res) => {
  const { query, symbol, interval } = req.body;

  if (!query || !symbol || !interval) {
    return res.status(400).json({ error: "Query, symbol, and interval are required." });
  }

  try {
    const response = await askMistral(query, { symbol, interval });
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
