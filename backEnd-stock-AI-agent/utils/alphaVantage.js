const axios = require("axios");

const getStockData = async (symbol, interval) => {
    const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
    const BASE_URL = "https://www.alphavantage.co/query";

    console.log(`Fetching data for symbol: ${symbol}, interval: ${interval}`); // Debug log

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: "TIME_SERIES_INTRADAY",
                symbol,
                interval,
                apikey: API_KEY,
            },
        });

        const data = response.data;

        if (data["Error Message"]) {
            console.error("API returned an error:", data["Error Message"]); // Debug log
            throw new Error("Invalid stock symbol or API error.");
        }

        console.log("API data fetched successfully."); // Debug log
        return data;
    } catch (error) {
        console.error("Error fetching stock data:", error.message); // Debug log
        throw new Error("Failed to fetch stock data. " + error.message);
    }
};

module.exports = { getStockData };
