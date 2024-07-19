// const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");

async function checkImg(req, res) {
  const url = req.query.url || "https://www.w3schools.com/";

  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    return res.json({ message: "Error fetching webpage" });
  }

  const $ = cheerio.load(response.data);
  const imgElements = $("img");

  let loadedImages = 0;
  let failedImages = 0;

  for (let i = 0; i < imgElements.length; i++) {
    const imgSrc = imgElements[i].attribs.src;
    const imgURL = new URL(imgSrc, url).href;

    request.get(imgURL).on("response", function (response) {
      if (response.statusCode === 200) {
        loadedImages++;
        console.log(`Image loaded: ${imgURL}`);
      } else {
        failedImages++;
        console.log(`Image failed to load: ${imgURL}`);
      }

      if (loadedImages + failedImages === imgElements.length) {
        res.json({
          message: "Test complete.",
          loadedImages: loadedImages,
          failedImages: failedImages,
        });
      }
    });
  }
}

module.exports = { checkImg };
