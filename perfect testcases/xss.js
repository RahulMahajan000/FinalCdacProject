const puppeteer = require("puppeteer");
const xss = require("xss");

async function checkXSS(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Extract the HTML content of the page
  const htmlContent = await page.evaluate(
    () => document.documentElement.outerHTML
  );

  // Check for XSS vulnerabilities
  const cleanHTML = xss(htmlContent);
  const isVulnerable = cleanHTML !== htmlContent;

  const result = {
    url: url,
    isVulnerable: isVulnerable,
  };

  console.log(JSON.stringify(result, null, 2));

  await browser.close();
}

// Use the function
checkXSS("https://www.w3schools.com/");
