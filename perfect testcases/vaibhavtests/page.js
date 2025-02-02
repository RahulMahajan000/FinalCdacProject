const { Builder, By, until, Capabilities } = require('selenium-webdriver');

async function checkPageLoad() {
    let caps = Capabilities.chrome();
    caps.set('acceptInsecureCerts', true); // Accept insecure certificates (including self-signed)
    
    let driver = await new Builder().withCapabilities(caps).forBrowser('chrome').build();
    try {
        // Navigate to a webpage
        await driver.get('https://github.com/login');

        // Wait for a specific element on the page to be present (indicating full page load)
        await driver.wait(until.elementLocated(By.css('body')), 10000); // Adjust timeout as needed

        // Page has loaded completely if the element is found
        console.log('Page loaded completely.');
    } catch (error) {
        // If the page is not loaded within the specified timeout, catch the error and print the message
        console.log('Page not loaded within the specified time.');
    } finally {
        await driver.quit();
    }
}

checkPageLoad();
