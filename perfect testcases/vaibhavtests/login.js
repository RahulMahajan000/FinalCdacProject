const { Builder, By, Key, until } = require("selenium-webdriver");

async function generateLoginTest(username, password) {
  // Initialize WebDriver
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the login page
    await driver.get("https://profile.w3schools.com/");

    // Locate username and password fields, and submit button
    let usernameField = await driver.findElement(By.id("modalusername"));
    let passwordField = await driver.findElement(By.id("current-password"));
    let submitButton = await driver.find_element_by_css_selector(
      "#root > div > div > div:nth-child(4) > div.LoginModal_modal__1Yybs.LoginModal_show__F6L8A.LoginModal_full_page__PoJE0 > div > div.LoginModal_cta_bottom_box__wU1AF > div.LoginModal_cta_bottom_box_button_login__5Fbwv > button"
    );

    // Fill in the username and password fields
    await usernameField.sendKeys(username);
    await passwordField.sendKeys(password);

    // Click the submit button
    await submitButton.click();

    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl === "https://pathfinder.w3schools.com/") {
      console.log("login successful!");
    } else {
      console.log("login failed!");
    }
  } finally {
    setInterval(function () {
      driver.quit();
    }, 10000);
  }
}

// Generate a login test scenario
generateLoginTest("yashmega00@gmail.com", "2596475y@Yl");
