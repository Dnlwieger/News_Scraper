// Require our npm packages.
//======================================================
// Parses the HTML and helps us find elements in the sites code.
var cheerio = require("cheerio");
// Makes HTTP request for HTML page.
var request = require("request");
var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//======================================================

// Init express
var app = express();

// Require all models
var db = require("./models");

// Setup database

var PORT = 8080;

// Connect to Mongo Database
//============================
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/news', {
    // useMongoClient: true
});


// Scrape CBR news and save to results variable.
app.get("/", function(req, res) {
    request("https://www.cbr.com/category/movies/news-movies/", function(error, response, html) {

        // // Load the body of the HTML into cheerio as variable '$' for shorthand use
        var $ = cheerio.load(html);

        // empty array to push scrape to
        var results = [];
        
        $("div.info-wrapper").each(function(i, element) {
            var headline = $(element).children().text();
            var link = $(element).children().find("a").attr("href");
            var summary = $(element).children().find("div").text();
            results.push({
                headline: headline,
                link: link,
                summary: summary
            });
        });
        console.log(results);
        
        // Save scrape to the database
        db.cbr.insert({
            headline: headline,
            link: link,
            summary: summary
        });
       
    });
});    
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});



