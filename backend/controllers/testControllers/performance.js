const { Builder } = require("selenium-webdriver");

async function measurePerformanceMetrics(req, res) {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the website
    const url = "https://www.w3schools.com/" || req.query.url;
    await driver.get(url);

    // Wait for page load to complete
    await driver.wait(async () => {
      return (
        (await driver.executeScript("return document.readyState")) ===
        "complete"
      );
    }, 10000); // Adjust timeout as needed

    // Extract User Timing
    let userTiming = await driver.executeScript(
      'return window.performance.getEntriesByType("measure")'
    );
    console.log("User Timing:", userTiming);

    // Extract Resource Timing
    let resourceTiming = await driver.executeScript(
      'return window.performance.getEntriesByType("resource")'
    );
    console.log("Resource Timing:", resourceTiming);

    // Extract Navigation Timing
    let navigationTiming = await driver.executeScript(
      "return window.performance.timing"
    );
    console.log("Navigation Timing:", navigationTiming);

    // Calculate overall load time
    let loadTime =
      navigationTiming.loadEventEnd - navigationTiming.navigationStart;
    console.log("Overall Load Time:", loadTime, "ms");

    // Send the performance metrics in the response
    res.status(200).json({
      userTiming,
      resourceTiming,
      navigationTiming,
      loadTime,
    });
  } catch (error) {
    console.error("Error measuring performance metrics:", error);
    res.status(500).send("Error measuring performance metrics");
  } finally {
    // Quit the driver
    await driver.quit();
  }
}

module.exports = {
  measurePerformanceMetrics,
};
