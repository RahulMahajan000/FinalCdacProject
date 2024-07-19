const puppeteer = require("puppeteer");

async function checkResponsiveness(url) {
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
    await page.goto(url);

    // Perform any checks here...

    results.push({
      device: device.name,
      viewport: device.viewport,
      // Add any other results here...
    });

    await browser.close();
  }

  console.log(JSON.stringify(results, null, 2));
}

// Use the function
checkResponsiveness("https://www.w3schools.com/");
