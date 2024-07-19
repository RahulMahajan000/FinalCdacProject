const { Builder, By } = require("selenium-webdriver");

async function generateLoginTest(req, res) {
  let { username, password } = req.body; // Assuming you're passing username and password in the request body

  if (!username || !password) {
    // return res.status(400).send("Username and password are required!");
    username = "vaibhavbhatkare9989@gmail.com";
    password = "Bhatkare@123";
  }
  // Initialize WebDriver
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the login page
    await driver.get(
      "https://profile.w3schools.com/log-in?redirect_url=https%3A%2F%2Fmy-learning.w3schools.com"
    );

    // Locate username and password fields, and submit button
    let usernameField = await driver.findElement(By.id("login_field"));
    let passwordField = await driver.findElement(By.id("password"));
    let submitButton = await driver.findElement(By.name("commit"));

    // Fill in the username and password fields
    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    // Click the submit button
    await submitButton.click();

    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl === "https://github.com/") {
      console.log("login successful!");
      res.status(200).send("Login successful!");
    } else {
      console.log("login failed!");
      res.status(401).send("Login failed!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  } finally {
    // Quit the driver
    await driver.quit();
  }
}

module.exports = {
  generateLoginTest,
};
