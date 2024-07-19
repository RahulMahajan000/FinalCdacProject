const puppeteer = require("puppeteer");
const readabilityScores = require("readability-scores");

async function checkReadability(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Extract the text content of the page
  const textContent = await page.evaluate(() => document.body.innerText);

  // Calculate readability scores
  const scores = readabilityScores(textContent);

  console.log(JSON.stringify(scores, null, 2));

  await browser.close();
}

// Use the function
checkReadability("https://www.w3schools.com/");
