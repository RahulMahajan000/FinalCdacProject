const { Builder, By, until } = require("selenium-webdriver");

async function signUp(req, res) {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to GitHub signup page
    await driver.get("https://github.com/join");

    // Fill in signup form fields
    await driver.findElement(By.id("user_login")).sendKeys("testusername-top");
    await driver
      .findElement(By.id("user_email"))
      .sendKeys("testbhattop@example.com");
    await driver.findElement(By.id("user_password")).sendKeys("tspsstrgd@123");

    // Scroll signup button into view (if needed)
    await driver.executeScript(
      "arguments[0].scrollIntoView()",
      driver.findElement(By.css(".btn-primary"))
    );

    // Wait for signup button to be clickable
    await driver.wait(until.elementLocated(By.css(".btn-primary")), 10000);
    await driver.wait(
      until.elementIsEnabled(driver.findElement(By.css(".btn-primary"))),
      10000
    );

    // Submit signup form
    await driver.findElement(By.css(".btn-primary")).click();

    // Wait for signup process to complete (e.g., redirect to home page)
    await driver.wait(until.urlIs("https://github.com/"), 10000);

    // Verify successful signup by checking the current URL
    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl === "https://github.com/") {
      res.status(200).send("Signup successful!");
    } else {
      res.status(400).send("Signup failed!");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Error during signup");
  } finally {
    // Quit the driver
    await driver.quit();
  }
}

module.exports = { signUp };
