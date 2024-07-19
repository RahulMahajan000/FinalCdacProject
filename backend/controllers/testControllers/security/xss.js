const puppeteer = require("puppeteer");
const xss = require("xss");

class XSSController {
  static async checkXSS(req, res) {
    let browser;
    try {
      const url = req.body.url || "https://www.w3schools.com/";
      browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { timeout: 60000 }); // waits up to 60 seconds.

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

      res.json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while checking for XSS." });
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}

module.exports = XSSController;
