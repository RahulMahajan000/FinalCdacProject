const puppeteer = require("puppeteer");
const readabilityScores = require("readability-scores");

async function checkReadability(req, res) {
  try {
    const url = req.query.url || "https://www.w3schools.com/";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { timeout: 60000 });

    // Extract the text content of the page
    const textContent = await page.evaluate(() => document.body.innerText);

    // Calculate readability scores
    const scores = readabilityScores(textContent);

    await browser.close();

    res.json(scores);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while checking readability." });
  }
}

// Use the function
module.exports = { checkReadability };
