const axios = require("axios");

const askMistral = async (query, stockData) => {
  try {
    const apiKey = process.env.MISTRAL_API_KEY;
    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-large-latest",
        messages: [
          {
            role: "user",
            content: `Based on the following stock data: ${JSON.stringify(
              stockData
            )}, answer this: ${query}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error with Mistral AI:", error.message);
    throw new Error("Mistral AI request failed.");
  }
};

module.exports = { askMistral };
