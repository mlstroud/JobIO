var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

/* GET search query and perform web scrape */
router.get('/job/:jobQuery/location/:locationQuery', async function (req, res, next) {

  const jobQuery = req.params.jobQuery;
  const locationQuery = req.params.locationQuery;

  const result = await axios.get(`https://www.indeed.com/jobs?q=${jobQuery}&l=${locationQuery}`);
  const $ = await cheerio.load(result.data);

  let scrapeData = [];

  $(".jobsearch-SerpJobCard").each((i, elem) => {
    scrapeData.push({
      title: $(elem).find(".title").text(),
      url: "https://www.indeed.com" + $(elem).find(".title").find("a").attr("href"),
      company: $(elem).find(".company").text(),
      location: $(elem).find(".location").text(),
      summary: $(elem).find(".summary").text()
    });
  })

  res.send(scrapeData);
});

module.exports = router;
