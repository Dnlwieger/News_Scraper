// require our npm packages
//======================================================
// Parses the HTML and helps us find elements in the sites code
var cheerio = require("cheerio");
// makes HTTP request for HTML page
var request = require("request");

// log to console what we are doing:
console.log("cheerio grabbing results....");


request("https://www.cbr.com/category/movies/news-movies/", function(error, response, html) {

    // // Load the body of the HTML into cheerio as variable '$' for shorthand use
    var $ = cheerio.load(html);

    // two arrays, one for the first story and one for the rest
    var results = [];
    var firstStory = [];

    // All of our headlines use the same element, but our other info does not,
    // so we do this first.
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

    // Now we have cheerio fetch the link for the first story
    // $("h3.header-title").each(function(i, element) {
    //     var link = $(element).children().attr("href");
    //     firstStory.push({
    //         link: link
    //     });
    // });

    // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        // var link = $(element).children().attr("href");
        // var summary = $(element).siblings().find("div").find("p").text();
        // push what cheerio grabs into the results array and print out our variables values
    console.log(results);
    // console.log(firstStory);
});