var express = require('express');
var router = express.Router();

/* GET search query and perform web scrape */
router.get('/', function (req, res, next) {
  res.send("test");
});

module.exports = router;
