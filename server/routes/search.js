var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

/* GET search query and perform web scrape */
router.get('/', async function (req, res, next) {
  //const result = await axios.get("http://example.com");
  const result = await axios.get(`https://www.indeed.com/jobs?q=Software+Engineer&l=`);
  const $ = await cheerio.load(result.data);

  // let ans = "";
  // $(".jobsearch-SerpJobCard").each((i, elem) => {
  //   ans += $(elem).find(".title").text() + "<br>" + $(elem).find(".summary").text() + "<br>";
  // })
  // res.send(ans);

  let scrapeData = [];

  $(".jobsearch-SerpJobCard").each((i, elem) => {
    scrapeData.push({
      title: $(elem).find(".title").text(),
      company: $(elem).find(".company").text(),
      location: $(elem).find(".location").text(),
      summary: $(elem).find(".summary").text()
    });
  })

  res.send(scrapeData);
});

module.exports = router;
