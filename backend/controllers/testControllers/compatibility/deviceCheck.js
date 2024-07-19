const puppeteer = require("puppeteer");

async function checkResponsiveness(req, res) {
  const url = req.query.url || "https://www.w3schools.com/";

  // List of devices to simulate
  const devices = [
    { name: "Desktop", viewport: { width: 1920, height: 1080 } },
    { name: "Tablet", viewport: { width: 768, height: 1024 } },
    { name: "Mobile", viewport: { width: 375, height: 667 } },
  ];

  let results = [];

  for (let device of devices) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport(device.viewport);

    try {
      await page.goto(url, { timeout: 60000 }); // Increase timeout to 60 seconds
    } catch (error) {
      console.error(`Failed to navigate to ${url} on ${device.name}`);
      console.error(error);
      continue; // Skip this device and continue with the next one
    }

    // Perform any checks here...

    results.push({
      device: device.name,
      viewport: device.viewport,
      // Add any other results here...
    });

    await browser.close();
  }

  res.json(results);
}

module.exports = { checkResponsiveness };
