const puppeteer = require("puppeteer");

async function checkCSRF(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Get the cookies
  const cookies = await page.cookies();

  // Check if any cookies are not marked as HttpOnly
  const insecureCookies = cookies.filter((cookie) => !cookie.httpOnly);

  const result = {
    url: url,
    hasInsecureCookies: insecureCookies.length > 0,
    insecureCookies: insecureCookies,
  };

  console.log(JSON.stringify(result, null, 2));

  await browser.close();
}

// Use the function

checkCSRF("https://www.w3schools.com/");
