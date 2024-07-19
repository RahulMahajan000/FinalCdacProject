const { Builder, Capabilities } = require('selenium-webdriver');

async function checkSSLCertificate() {
    let caps = Capabilities.chrome();
    caps.set('acceptInsecureCerts', true); // Accept insecure certificates (including self-signed)
    
    let driver = await new Builder().withCapabilities(caps).forBrowser('chrome').build();
    try {
        // Navigate to a secure webpage (HTTPS)
        await driver.get('https://github.com/login');

        // Retrieve the current URL
        let currentUrl = await driver.getCurrentUrl();

        // Check if the URL starts with "https" to verify SSL
        let isSSLValid = currentUrl.startsWith('https');
        
        // Print result on the console
        if (isSSLValid) {
            console.log('SSL certificate is valid.');
        } else {
            console.log('SSL certificate is not valid.');
        }
    } finally {
        await driver.quit();
    }
}

checkSSLCertificate();
