// loadTimeController.js

const axios = require("axios");

async function checkLoadTime(req, res) {
  const url = req.body.url || "https://www.w3schools.com/";

  const startTime = Date.now();

  try {
    await axios.get(url);
  } catch (error) {
    return res.json({
      message: "Error fetching webpage",
      error: error.message,
    });
  }

  const loadTime = Date.now() - startTime;

  res.json({
    message: "Load time fetched successfully.",
    url: url,
    loadTime: loadTime,
  });
}

module.exports = { checkLoadTime };
