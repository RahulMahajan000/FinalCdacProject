const axios = require("axios");
const cheerio = require("cheerio");

async function checkLinks(req, res) {
  try {
    const url = "https://www.w3schools.com/" || req.query.url;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = [];

    $("a").each((index, element) => {
      const link = $(element).attr("href");
      if (link.startsWith("https://")) {
        links.push(link);
      }
    });

    const results = await Promise.all(
      links.map((link) => {
        return axios
          .get(link)
          .then(() => ({ link, status: "OK" }))
          .catch(() => ({ link, status: "FAILED" }));
      })
    );

    res.json(results);
  } catch (error) {
    res.status(500).send("An error occurred while testing the links.");
  }
}
module.exports = { checkLinks };
