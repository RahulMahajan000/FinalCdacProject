// performanceController.js
const axios = require("axios");

let lighthouse;
let chromeLauncher;

import("lighthouse").then((module) => {
  lighthouse = module;
});

import("chrome-launcher").then((module) => {
  chromeLauncher = module;
});

async function checkPerformance(req, res) {
  const url = "https://www.w3schools.com/" || req.query.url;

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
    message: "Performance check complete.",
    url: url,
    loadTime: loadTime,
  });
}

module.exports = { checkPerformance };
