var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

/* GET users listing. */
router.get("/scrape", function(req, res, next) {
  request("https://www.indeed.com/jobs?q=web+developer&l=Raleigh%2C+NC/", function(error, response, html) {
  	var $ = cheerio.load(html);

  	$("div.clickcard").each(function(i, element) {
  		var result = {};
  		result.title = $(element).children("a").text();
  		result.link = $(element).children("a").attr("href");

  		if(result.title && result.link) {
  			result.company = $(element).children("span.company").text();
  			result.location = $(element).children("span.location").text();
  			result.summary = $(element).children("span.summary").text();
  		}

  		db.Posting.create(result).then(function(dbArticle) {
				console.log(dbArticle);
			}).catch(function(err) {
				return res.json(err);
			});

  	});

  	res.send("Postings scraped");

  });
});

router.get("/postings", function(req, res, next) {
	db.Posting.find({}).then(function(dbPosting) {
		res.json(dbPosting);
	}).catch(function(err) {
		res.json(err);
	});
});

module.exports = router;
