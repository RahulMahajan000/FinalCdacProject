const puppeteer = require("puppeteer");

async function checkCompatibility(req, res) {
  try {
    const url = req.query.url || "https://www.w3schools.com/";

    // List of user agents for different browsers
    const userAgents = [
      {
        name: "Chrome",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
      },
      {
        name: "Firefox",
        userAgent:
          "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0",
      },
      {
        name: "Safari",
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14",
      },
    ];

    let results = [];

    for (let browser of userAgents) {
      const browserInstance = await puppeteer.launch();
      const page = await browserInstance.newPage();
      await page.setUserAgent(browser.userAgent);

      try {
        await page.goto(url, { timeout: 60000 }); // Increase timeout to 60 seconds
      } catch (error) {
        if (error instanceof puppeteer.errors.TimeoutError) {
          // Handle timeout error here...
          console.error(`Navigation timeout for ${browser.name}`);
          results.push({
            browser: browser.name,
            userAgent: browser.userAgent,
            error: "Navigation timeout",
          });
          await browserInstance.close();
          continue; // Continue with the next iteration
        } else {
          throw error; // Rethrow if error is not a TimeoutError
        }
      }

      // Perform any checks here...

      results.push({
        browser: browser.name,
        userAgent: browser.userAgent,
        // Add any other results here...
      });

      await browserInstance.close();
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while checking compatibility." });
  }
}

module.exports = { checkCompatibility };
