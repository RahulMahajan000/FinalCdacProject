const puppeteer = require("puppeteer");

class CSRFController {
  static async checkCSRF(req, res) {
    let browser;
    try {
      const url = req.body.url || "https://www.w3schools.com/";
      browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { timeout: 60000 });

      // Get the cookies
      const cookies = await page.cookies();

      // Check if any cookies are not marked as HttpOnly
      const insecureCookies = cookies.filter((cookie) => !cookie.httpOnly);

      const result = {
        url: url,
        hasInsecureCookies: insecureCookies.length > 0,
        insecureCookies: insecureCookies,
      };

      res.json({ result: result, message: "CSRF check result" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while checking for CSRF." });
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}

module.exports = CSRFController;
