const express = require("express");
const cors = require("cors");
const stockRoutes = require("./routes/stockRoutes");
const mistralRoutes = require("./routes/mistralRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));
app.use(express.json());

// Routes
app.use("/api/stock", stockRoutes);
app.use("/api/mistral", mistralRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
