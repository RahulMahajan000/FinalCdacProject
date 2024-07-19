const { Builder, Capabilities } = require("selenium-webdriver");

async function checkSSLCertificate(req, res) {
  let caps = Capabilities.chrome();
  caps.set("acceptInsecureCerts", true); // Accept insecure certificates (including self-signed)

  let driver = await new Builder()
    .withCapabilities(caps)
    .forBrowser("chrome")
    .build();

  let isSSLValid; // Declare here

  try {
    // Navigate to a secure webpage (HTTP
    const url = "https://www.w3schools.com/" || req.query.url;
    await driver.get(url);

    // Retrieve the current URL
    let currentUrl = await driver.getCurrentUrl();

    // Check if the URL starts with "https" to verify SSL
    isSSLValid = currentUrl.startsWith("https"); // Assign value here

    // Print result on the console
    if (isSSLValid) {
      console.log("SSL certificate is valid.");
      console.log(isSSLValid);
    } else {
      console.log("SSL certificate is not valid.");
    }
  } finally {
    await driver.quit();
  }
  res.json({ message: "SSL certificate checked", "SSL Valid": isSSLValid });
}

module.exports = {
  checkSSLCertificate,
};
