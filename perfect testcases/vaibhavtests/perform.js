const { Builder, By } = require('selenium-webdriver');

async function measurePerformanceMetrics() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the website
        await driver.get('https://github.com/login');

        // Wait for page load to complete
        await driver.wait(async () => {
            return await driver.executeScript('return document.readyState') === 'complete';
        }, 10000); // Adjust timeout as needed

        // Extract User Timing
        let userTiming = await driver.executeScript('return window.performance.getEntriesByType("measure")');
        console.log('User Timing:', userTiming);

        // Extract Resource Timing
        let resourceTiming = await driver.executeScript('return window.performance.getEntriesByType("resource")');
        console.log('Resource Timing:', resourceTiming);

        // Extract Navigation Timing
        let navigationTiming = await driver.executeScript('return window.performance.timing');
        console.log('Navigation Timing:', navigationTiming);

        // Calculate overall load time
        let loadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
        console.log('Overall Load Time:', loadTime, 'ms');

    } finally {
        await driver.quit();
    }
}

measurePerformanceMetrics();
